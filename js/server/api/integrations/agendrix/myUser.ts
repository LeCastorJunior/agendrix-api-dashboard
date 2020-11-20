import { Request, Response } from "express";

import myUser from "./requests/myUser";
import exec from "./requests/exec";
import { fetchTokenFirst } from "./requests/utils";

export default async (req: Request, res: Response) => {
  if (fetchTokenFirst(req, res)) return;

  const { access_token } = req.signedCookies.oauthData;
  const request = myUser(access_token);

  await exec(req, res, request);
};
