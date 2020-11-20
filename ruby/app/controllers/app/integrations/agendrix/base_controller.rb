module App
  module Integrations
    module Agendrix
      class BaseController < ApplicationController
        protected

        def exec(route_config)
          response = call_api(route_config)

          body = response.body
          if response.success?
            return_result(data: body["data"])
          else
            errors = body["errors"]

            expired_token_error = errors.find do |error|
              error["source"] == "unauthorized" && error["short_message"].include?("Your token is expired")
            end
            raise Agendrix::APIError, "Error: #{errors[0]["short_message"]}" unless expired_token_error.present?

            try_refresh_and_request(route_config)
          end

        rescue => e
          return_result(error: "Error: #{e.message}")
        end

        def oauth_provider
          @oauth_provider ||= Services::Integrations::Agendrix::OAuthProvider.new
        end

        def store_oauth_data(data)
          cookies.signed[:oauth_data] = { value: JSON.generate(data), httponly: true }
        end

        private

        def api_provider(refresh_provider = false)
          if refresh_provider
            @api_provider = Services::Integrations::Agendrix::APIProvider.new({ access_token: retrieve_access_token })
            return @api_provider
          end

          @api_provider ||= Services::Integrations::Agendrix::APIProvider.new({ access_token: retrieve_access_token })
        end

        def call_api(route_config, refresh_provider = false)
          method = route_config[:method]
          url = route_config[:url]
          params = route_config[:params]

          case method
          when :get
            api_provider(refresh_provider).get(url)
          when :put
            api_provider(refresh_provider).put(url, params)
          when :post
            api_provider(refresh_provider).post(url, params)
          when :delete
            api_provider(refresh_provider).delete(url)
          else
            raise InvalidHTTPMethodError, "Invalid HTTP method provided to the API Provider"
          end
        end

        def try_refresh_and_request(route_config)
          # Try to refresh tokens
          response = oauth_provider.post("token", {
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
          store_oauth_data(body)
          response = call_api(route_config, true)
          body = response.body

          # Handle request
          errors = body["errors"]
          raise Agendrix::APIError, "Error: #{errors[0]["short_message"]}" unless response.success?

          return_result(data: body["data"])
        end

        def retrieve_access_token
          oauth_data = JSON.parse(cookies.signed[:oauth_data])
          raise MissingCookieError, "The oauth_data cookie doesn't exist." if oauth_data.blank?

          access_token = oauth_data["access_token"]
          raise InvalidCookieError, "The oauth_data cookie is invalid; it doesn't have the access_token key." if access_token.blank?

          access_token
        end

        def retrieve_refresh_token
          JSON.parse(cookies.signed[:oauth_data])["refresh_token"]
        end

        def return_result(data: nil, error: nil)
          [data, error]
        end
      end
    end
  end
end
