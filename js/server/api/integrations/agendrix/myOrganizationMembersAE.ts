import { Request, Response } from "express";

import myOrganizationMembersAE from "./requests/myOrganizationMembersAE";
import exec from "./requests/exec";
import { fetchTokenFirst } from "./requests/utils";

export default async (req: Request, res: Response) => {
  if (fetchTokenFirst(req, res)) return;

  const { access_token } = req.signedCookies.oauthData;
  const request = myOrganizationMembersAE(access_token, req.query);
  
  await exec(req, res, request);
};
