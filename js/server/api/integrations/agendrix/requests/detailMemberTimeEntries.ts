import { Query } from "express-serve-static-core";
import { AxiosRequestConfig } from "axios";

import { agendrixAPI } from "../../../../../shared/uris";
import { formatSearchQueryParam } from "./utils";

export default (token: string, queryParams: Query): AxiosRequestConfig => {
  const { search } = queryParams;
//console.log(search)
  return {
    method: "get",
    url: `${agendrixAPI}/time_entries?${search ? formatSearchQueryParam(search as Query) : ""}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};
