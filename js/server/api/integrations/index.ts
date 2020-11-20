import { Router } from "express";

import agendrix from "./agendrix";

const routes = Router();
routes.use("/agendrix", agendrix);

export default routes;
