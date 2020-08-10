import { history } from "../../../history";
import axios from "axios";
import { server } from "../../../config";

export const submitLogin = (email, password) => {
  return (dispatch) => {
    axios
      .post(`${server}/api/users/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.isAuthenticated) {
          dispatch({
            type: "LOGGED_IN",
            payload: response.data,
          });
          //test by nelle
          //history.push("/profile");
          //end
        } else {
          dispatch({
            type: "AUTH_ERROR",
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          dispatch({
            type: "AUTH_ERROR",
            payload: {
              message: err.response.data.message,
            },
          });
        } else {
          dispatch({
            type: "AUTH_ERROR",
            payload: {
              message:
                "Your username or password didn't match. Please try again.",
            },
          });
        }
      });
  };
};

/*nelle*/
// export const googleLogin = (response) => {
//   //alert(JSON.stringify(response))
//   localStorage.setItem("token", response.data.token);
//   localStorage.setItem("user", response.data.user._id);
//   history.push("/profile");
// };
//end of nelle
export const checkAuthentication = () => {
  return (dispatch) => {
    axios
      .get(`${server}/api/users/auth`)
      .then((response) => {
        if (response.data.isAuthenticated) {
          dispatch({
            type: "LOGGED_IN",
            payload: { ...response.data, token: localStorage.token },
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: "LOGGED_OUT",
    });
    history.push("/login");
  };
};

export const logoutWithFirebase = (user) => {
  return (dispatch) => {
    dispatch({ type: "LOGOUT_WITH_FIREBASE", payload: {} });
    history.push("/login");
  };
};

export const changeRole = (role) => {
  return (dispatch) => dispatch({ type: "CHANGE_ROLE", userRole: role });
};
