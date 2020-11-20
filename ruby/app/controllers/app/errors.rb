module App
  module Integrations
    class MissingCookieError < StandardError
    end

    class InvalidCookieError < StandardError
    end

    class RefreshTokenError < StandardError
    end

    class InvalidHTTPMethodError < StandardError
    end
  end
end
