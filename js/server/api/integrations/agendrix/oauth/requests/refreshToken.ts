import { AxiosRequestConfig } from "axios";

import { oauthProvider, redirectURI } from "../../../../../../shared/uris";
import { clientID, clientSecret } from "../../../../../../shared/credentials";

export default (refresh_token: string): AxiosRequestConfig => ({
  method: "post",
  url: `${oauthProvider}/token`,
  headers: { "Content-Type": "application/json" },
  data: {
    client_id: clientID,
    client_secret: clientSecret,
    redirect_uri: redirectURI,
    grant_type: "refresh_token",
    refresh_token,
  },
});
