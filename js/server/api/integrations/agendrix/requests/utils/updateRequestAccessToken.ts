import { AxiosRequestConfig } from "axios";

export default (request: AxiosRequestConfig, newToken: string) => {
  request.headers["Authorization"] = `Bearer ${newToken}`;

  return request;
};
