module App
  module Integrations
    module Agendrix
      class OAuthController < BaseController
        def redirect
          code = params[:code]

          response = oauth_provider.post("token", {
             client_id: Credentials.client_id,
             client_secret: Credentials.client_secret,
             redirect_uri: URIS.redirect_uri,
             grant_type: "authorization_code",
             code: code,
          })

          body = response.body
          if response.success?
            store_oauth_data(body)
          end

          redirect_to app_root_url, notice: response.success? ? "Success" : "Error: #{body[:error_description]}"
        rescue => exception
          redirect_to app_root_url, notice: "Error #{exception}"
        end
      end
    end
  end
end
