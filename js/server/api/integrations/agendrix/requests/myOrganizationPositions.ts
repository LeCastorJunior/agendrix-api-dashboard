import { Query } from "express-serve-static-core";
import { AxiosRequestConfig } from "axios";

import { agendrixAPI } from "../../../../../shared/uris";
import { formatSearchQueryParam } from "./utils";

export default (token: string, queryParams: Query): AxiosRequestConfig => {
  const { page, page_size, limit, sort, search } = queryParams;

  return {
    method: "get",
    url: `${agendrixAPI}/positions?page=${page}&page_size=${page_size}${
      limit ? `&limit=${limit}` : ""
    }${sort ? `&sort[${Object.keys(sort)[0]}]=${Object.values(sort)[0]}` : ""}${
      search ? formatSearchQueryParam(search as Query) : ""
    }`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};
