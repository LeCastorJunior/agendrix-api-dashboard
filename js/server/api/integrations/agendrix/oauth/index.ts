import { Router } from "express";

import tokens from "./tokens";

const routes = Router();
routes.post("/tokens", tokens);

export default routes;
