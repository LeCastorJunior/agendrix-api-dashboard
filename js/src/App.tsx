import React, { ReactNode } from "react";
import { Router, Switch, Redirect, Route } from "react-router-dom";
import qhistory from "qhistory";
import { createBrowserHistory } from "history";
import qs from "qs";

import Home from "./pages/Home";
import MyOrganizationPositions from "./pages/integrations/agendrix/MyOrganizationPositions";
import MyUser from "./pages/integrations/agendrix/MyUser";
import MyTeamMembersAE from "./pages/integrations/agendrix/MyTeamMembersAE";
import DetailsMembersTimeEntries from "./pages/integrations/agendrix/DetailsMembersTimeEntries";

const history = qhistory(createBrowserHistory(), qs.stringify, qs.parse);

const App: React.FC = () => (
  <Router history={history}>
    <Switch>
      <Route
        path="/integrations/agendrix/my-organization-positions"
        exact
        component={MyOrganizationPositions}
      />
      <Route
        path="/integrations/agendrix/my-profile"
        exact
        component={MyUser}
      />
      <Route
        path="/integrations/agendrix/my-team-members-ae"
        exact
        component={MyTeamMembersAE}
      />
      <Route
        path="/integrations/agendrix/detail-member-time-entries"
        exact
        component={DetailsMembersTimeEntries}
      />
      <Route path="/home" exact component={Home} />
      <Route render={(): ReactNode => <Redirect to="/home" />} />
    </Switch>
  </Router>
);

export default App;
