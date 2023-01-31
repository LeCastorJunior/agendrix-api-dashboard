import { Request, Response } from "express";
import axios, { AxiosRequestConfig } from "axios";

import refreshToken from "../oauth/requests/refreshToken";
import { findExpiredTokenError } from "./utils";
import { updateRequestAccessToken } from "./utils";

export default async (
  req: Request,
  res: Response,
  apiRequest: AxiosRequestConfig
) => {
  try {
    const response = await axios(apiRequest);
    const data = await response.data;
    
    res.status(200).json(data);
  } catch (e) {
    if (!findExpiredTokenError(e.response.data.errors)) {
      couldNotCompleteRequest(res, e);
      return;
    }

    await tryRefreshAndRequest(req, res, apiRequest);
  }
};

const tryRefreshAndRequest = async (
  req: Request,
  res: Response,
  apiRequest: AxiosRequestConfig
) => {
  const { refresh_token } = req.signedCookies.oauthData;
  const refreshTokenRequest = refreshToken(refresh_token);

  try {
    const response = await axios(refreshTokenRequest);
    const data = await response.data;

    res.cookie("oauthData", data, {
      httpOnly: true,
      signed: true,
    });

    await requestWithNewToken(
      res,
      updateRequestAccessToken(apiRequest, data.access_token)
    );
  } catch (e) {
    couldNotRefreshToken(res, e);
  }
};

const requestWithNewToken = async (
  res: Response,
  apiRequest: AxiosRequestConfig
) => {
  try {
    const response = await axios(apiRequest);
    const data = await response.data;

    res.status(200).json(data);
  } catch (e) {
    couldNotCompleteRequest(res, e);
  }
};

// HANDLE ERRORS
const couldNotCompleteRequest = (res: Response, error: any) => {
  const { data, status } = error.response;
  const hasAPIErrors = !!data.errors;

  if (hasAPIErrors) {
    res.status(status).json(data);
    return;
  }

  unknownServerError(res, error);
};

const couldNotRefreshToken = (res: Response, error: any) => {
  const { data, status } = error.response;

  if (data) {
    res.status(status).json({ error: data.error_description });
    return;
  }

  unknownServerError(res, error);
};

const unknownServerError = (res: Response, error: any) => {
  res.status(500).json({ error: error.message });
};
