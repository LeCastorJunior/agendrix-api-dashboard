import { Router } from "express";

import myUser from "./myUser";
import myOrganizationPositions from "./myOrganizationPositions";
import oauth from "./oauth";

const routes = Router();
routes.get("/my-user", myUser);
routes.get("/my-organization-positions", myOrganizationPositions);

routes.use("/oauth", oauth);

export default routes;
