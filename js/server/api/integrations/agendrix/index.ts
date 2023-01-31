import { Router } from "express";

import myUser from "./myUser";
import myOrganizationPositions from "./myOrganizationPositions";
import myOrganizationMembersAE from "./myOrganizationMembersAE";
import detailMemberTimeEntries from "./detailsMemberTimeEntries";
import oauth from "./oauth";

const routes = Router();
routes.get("/my-user", myUser);
routes.get("/my-organization-positions", myOrganizationPositions);
routes.get("/my-organization-members-ae", myOrganizationMembersAE);
routes.get("/detail-member-time-entries", detailMemberTimeEntries);

routes.use("/oauth", oauth);

export default routes;
