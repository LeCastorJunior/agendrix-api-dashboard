module ApplicationHelper
  def authorization_request_url
    "#{URIS.oauth_provider}/authorize?redirect_uri=#{URIS.redirect_uri}&client_id=#{Credentials.client_id}&scope=#{Credentials.scopes}&response_type=code"
  end
end
