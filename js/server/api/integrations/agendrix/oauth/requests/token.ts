import { AxiosRequestConfig } from "axios";

import { oauthProvider, redirectURI } from "../../../../../../shared/uris";
import { clientID, clientSecret } from "../../../../../../shared/credentials";

export default (code: string): AxiosRequestConfig => ({
  method: "post",
  url: `${oauthProvider}/token`,
  headers: { "Content-Type": "application/json" },
  data: {
    client_id: clientID,
    client_secret: clientSecret,
    redirect_uri: redirectURI,
    grant_type: "authorization_code",
    code,
  },
});
