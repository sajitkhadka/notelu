import React, { Suspense } from "react";
import Spinner from "../components/spinner";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// const RouteConfig = ({ component: Component, isAuthenticated, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) => {
//       //console.log(props);
//       // return isAuthenticated ?
//       return (
//         <Suspense fallback={<Spinner />}>
//           <Component />
//         </Suspense>
//       );
//       //:
//       // (
//       //   <Redirect to="/login" />
//       // );
//     }}
//   />
// );

const RouteConfig = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      //console.log(props);
      return isAuthenticated ? (
        <Suspense fallback={<Spinner />}>
          <Component />
        </Suspense>
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);
const mapStateToProps = (state) => {
  console.log(state);
  return {
    isAuthenticated: state.auth.login.isAuthenticated,
  };
};
const PrivateRoute = connect(mapStateToProps)(RouteConfig);

export default PrivateRoute;
