import { Request, Response } from "express";
import axios from "axios";

import token from "./requests/token";

export default async (req: Request, res: Response) => {
  const request = token(req.body.code);

  try {
    const response = await axios(request);
    const data = await response.data;

    res.cookie("oauthData", data, {
      httpOnly: true,
      signed: true,
    });

    res.status(200).json({});
  } catch (e) {
    const { data, status } = e.response;

    if (data) res.status(status).json({ error: data.error_description });
    else res.status(500).json({ error: e.message });
  }
};
