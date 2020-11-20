import { Router } from "express";

import integrations from "./integrations";

const routes = Router();
routes.use("/integrations", integrations);

export default routes;
