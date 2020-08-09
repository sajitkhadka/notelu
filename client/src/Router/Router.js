import React, { lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "../history";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

// Route-based code splitting
const Login = lazy(() => import("../pages/login"));
const Signup = lazy(() => import("../pages/signup"));
const HomePage = lazy(() => import("../pages/homepage"));

const ForgotPassword = lazy(() => import("../pages/forgotpassword"));
const ChangePassword = lazy(() => import("../pages/changepassword"));
const Profile = lazy(() => import("../pages/Profile/profileSettings"));

const Calendar = lazy(() => import("../pages/calendar/Calendar.js"));
const Error404 = lazy(() => import("../pages/error404"));

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <PublicRouter path="/login" exact component={Login} />
          <PublicRouter path="/signup" exact component={Signup} />
          <PublicRouter
            path="/changepassword"
            exact
            component={ChangePassword}
          />
          <PublicRouter
            path="/forgotpassword"
            exact
            component={ForgotPassword}
          />

          <PublicRouter path="/profile" exact component={Profile} />
          <PrivateRouter path="/calendar" exact component={Calendar} />
          <PublicRouter path="/signup" exact component={Signup} />
          <PublicRouter
            path="/changepassword"
            exact
            component={ChangePassword}
          />
          <PublicRouter
            path="/forgotpassword"
            exact
            component={ForgotPassword}
          />
          <Route component={Error404} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
