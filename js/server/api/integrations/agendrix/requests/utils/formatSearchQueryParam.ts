import { Query } from "express-serve-static-core";

export default (search: Query) => {
  let query = "";

  Object.entries(search).forEach(
    ([key, value]) => (query += `&search[${key}]=${value}`)
  );

  return query;
};
