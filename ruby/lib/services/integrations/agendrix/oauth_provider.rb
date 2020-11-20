module Services
  module Integrations
    module Agendrix
      class OAuthProvider < Base
        protected

        def initialize_connection
          options = {
            headers: {
              "Content-Type" => "application/json",
            },
            url: "#{URIS.oauth_provider}",
          }

          @connection = Faraday.new(options) do |faraday|
            faraday.request :json
            faraday.response :json
            faraday.adapter :typhoeus
          end
        end
      end
    end
  end
end
