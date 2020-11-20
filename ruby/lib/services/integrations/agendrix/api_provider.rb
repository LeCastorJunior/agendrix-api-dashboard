module Services
  module Integrations
    module Agendrix
      class APIProvider < Base
        def send(request_config)
          configure_connection
          response = make_request(request_config)

          body = response.body
          if response.success?
            result data: body["data"]
          else
            errors = body["errors"]

            expired_token_error = errors.find do |error|
              error["source"] == "unauthorized" && error["short_message"].include?("Your token is expired")
            end
            raise Agendrix::APIError, "Error: #{errors[0]["short_message"]}" unless expired_token_error.present?

            try_refresh_and_send(request_config)
          end

        rescue => e
          result error: "Error: #{e.message}"
        end

        protected

        def initialize_connection(**args)
          @controller ||= args[:controller]
        end

        private

        def connection_config
          options = {
            headers: {
              "Content-Type" => "application/json",
              "Authorization": "Bearer #{retrieve_access_token}",
            },
            url: "#{URIS.agendrix_api}",
          }
        end

        def configure_connection(force_refresh = false)
          if force_refresh
            @connection = Faraday.new(connection_config) do |faraday|
              faraday.request :json
              faraday.response :json
              faraday.adapter :typhoeus
            end

            return
          end

          @connection ||= Faraday.new(connection_config) do |faraday|
            faraday.request :json
            faraday.response :json
            faraday.adapter :typhoeus
          end
        end

        def make_request(request_config)
          method = request_config[:method]
          url = request_config[:url]
          params = request_config[:params]

          case method
          when :get
            @connection.get(url)
          when :put
            @connection.put(url, params)
          when :post
            @connection.post(url, params)
          when :delete
            @connection.delete(url)
          else
            raise InvalidHTTPMethodError, "Invalid HTTP method provided to the API Provider"
          end
        end

        def try_refresh_and_send(request_config)
          # Try to refresh tokens
          response = Services::Integrations::Agendrix::OAuthProvider.new.post("token", {
            client_id: Credentials.client_id,
            client_secret: Credentials.client_secret,
            redirect_uri: URIS.redirect_uri,
            grant_type: "refresh_token",
            refresh_token: retrieve_refresh_token,
          })

          # Raise exception if refresh failed
          body = response.body
          raise RefreshTokenError, "Error: #{body[:error_description]}" unless response.success?

          # Store new oauth data and retry request
          cookies.signed[:oauth_data] = { value: JSON.generate(body), httponly: true }
          configure_connection(true)
          response = make_request(request_config)
          body = response.body

          # Handle request
          errors = body["errors"]
          raise Agendrix::APIError, "Error: #{errors[0]["short_message"]}" unless response.success?

          result data: body["data"]
        end

        def result(data: nil, error: nil)
          [data, error]
        end

        def cookies
          @controller.retrieve_cookies
        end

        def retrieve_access_token
          oauth_data = cookies.signed[:oauth_data]
          raise MissingCookieError, "The oauth_data cookie doesn't exist." if oauth_data.blank?

          access_token = JSON.parse(oauth_data)["access_token"]
          raise InvalidCookieError, "The oauth_data cookie is invalid; it doesn't have the access_token key." if access_token.blank?

          access_token
        end

        def retrieve_refresh_token
          oauth_data = cookies.signed[:oauth_data]
          raise MissingCookieError, "The oauth_data cookie doesn't exist." if oauth_data.blank?

          refresh_token = JSON.parse(oauth_data)["refresh_token"]
          raise InvalidCookieError, "The oauth_data cookie is invalid; it doesn't have the refresh_token key." if refresh_token.blank?

          refresh_token
        end
      end
    end
  end
end
