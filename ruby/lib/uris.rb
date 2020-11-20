class URIS
  class << self
    def agendrix_api
      "https://api.agendrix.com"
    end

    def oauth_provider
      "https://app.agendrix.com/oauth"
    end

    def redirect_uri
      "https://localhost:3000/integrations/agendrix/oauth/redirect"
    end
  end
end
