module Services
  module Integrations
    module Agendrix
      class APIProvider < Base
        protected

        def initialize_connection(**args)
          options = {
            headers: {
              "Content-Type" => "application/json",
              "Authorization": "Bearer #{args[:access_token]}",
            },
            url: "#{URIS.agendrix_api}",
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
