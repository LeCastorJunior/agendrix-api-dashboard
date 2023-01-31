import { Request, Response } from "express";

import detailMemberTimeEntries from "./requests/detailMemberTimeEntries";
import exec from "./requests/exec";
import { fetchTokenFirst } from "./requests/utils";

export default async (req: Request, res: Response) => {
  if (fetchTokenFirst(req, res)) return;

  const { access_token } = req.signedCookies.oauthData;
  const request = detailMemberTimeEntries(access_token, req.query);
  //console.log(request)
  await exec(req, res, request);
};
