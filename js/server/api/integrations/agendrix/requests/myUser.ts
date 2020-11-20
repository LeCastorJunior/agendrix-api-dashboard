import { AxiosRequestConfig } from "axios";

import { agendrixAPI } from "../../../../../shared/uris";

export default (token: string): AxiosRequestConfig => ({
  method: "get",
  url: `${agendrixAPI}/users/me`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
