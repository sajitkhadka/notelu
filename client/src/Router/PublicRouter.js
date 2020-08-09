import React, { Suspense } from "react";
import Spinner from "../components/spinner";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../layout/navbar";

const RouteConfig = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <React.Fragment>
          <Suspense fallback={<Spinner />}>
            <Component {...props} />
          </Suspense>
        </React.Fragment>
      );
    }}
  />
);
// const RouteConfig = ({ component: Component, isAuthenticated, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) => {
//       return (
//         <React.Fragment>
//           <Suspense fallback={<Spinner />}>
//             <Component {...props} />
//           </Suspense>
//         </React.Fragment>
//       );
//     }}
//   />
// );

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    isAuthenticated: state.auth.login.isAuthenticated,
  };
};

const PublicRoute = connect(mapStateToProps)(RouteConfig);

export default PublicRoute;
