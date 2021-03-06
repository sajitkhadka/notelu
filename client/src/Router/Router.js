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
const ProfileSettings = lazy(() => import("../pages/Profile/profileSettings"));

const Calendar = lazy(() => import("../pages/calendar/Calendar.js"));
const ResetPassword = lazy(() => import("../pages/resetpassword.js"));
const Support = lazy(() => import("../pages/support"));
const Error404 = lazy(() => import("../pages/error404"));
const PrivacyPolicy = lazy(() => import("../pages/privacypolicy"));

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <PublicRouter path="/login/:success" exact component={Login} />

          <PublicRouter path="/login" exact component={Login} />
          <PublicRouter path="/signup" exact component={Signup} />
          {/* <PublicRouter
            path="/changepassword"
            exact
            component={ChangePassword}
          /> */}
          <PublicRouter
            path="/forgotpassword"
            exact
            component={ForgotPassword}
          />

          {/* <PublicRouter path="/profile" exact component={Profile} /> */}
          <PrivateRouter path="/calendar" exact component={Calendar} />
          {/* <PublicRouter
            path="/changepassword"
            exact
            component={ChangePassword}
          /> */}
          {/* <PublicRouter
            path="/profilesetting"
            exact
            component={ProfileSettings}
          />
          */}
          <PublicRouter
            path="/resetpassword/:key"
            exact
            component={ResetPassword}
          />
          {/* 
          <PublicRouter path="/resetpassword" exact component={ResetPassword} /> */}

          <Route path="/support" exact component={Support} />
          <Route path="/privacypolicy" exact component={PrivacyPolicy} />

          <Route component={Error404} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
