import { Request, Response } from "express";

export default (req: Request, res: Response) => {
  if (!req.signedCookies.oauthData) {
    res
      .status(500)
      .json({ error: "You need to fetch the oauth tokens first." });

    return true;
  }

  return false;
};
