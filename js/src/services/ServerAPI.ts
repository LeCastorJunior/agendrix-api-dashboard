import HTTPService from "./HTTPService";

import { serverAPI } from "../../shared/uris";

class ServerAPI extends HTTPService {
  protected baseURI: string = serverAPI;

  protected buildOptions(method: string, params?: object): object {
    return {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: params ? JSON.stringify(params) : null,
    };
  }
}

export default new ServerAPI();
