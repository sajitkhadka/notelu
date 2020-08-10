import React from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { server } from "../config";

const Google = () => {
  const responseGoogle = (response) => {
    console.log(response.tokenId);
    // axios({
    //   method: "POST",
    //   //url:`${process.env.REACT_APP_API}/google-login`,
    //   url: `${server}/api/users/google-login`,
    //   data: { idToken: response.tokenId },
    // })
    //   .then((response) => {
    //     console.log("GOOGLE SIGNIN SUCCESS", response);
    //     //inform parent component
    //     informParent(response);
    //     //alert('after parent')
    //   })
    //   .catch((err) => {
    //     console.log("GOOGLE SIGNIN ERROR", err.response);
    //   });
  };

  const responseFailure = (response) => {
    console.log(response);
  };

  return (
    <div className="pb-3">
      <GoogleLogin
        clientId="707689674235-nisrnmj8klekd8ngqkrk519536ipj3k4.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseFailure}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            style={{ padding: "1rem" }}
            disabled={renderProps.disabled}
            className="btn btn-primary btn-lg btn-block outline"
          >
            <i
              className="fa fa-google"
              style={{ paddingRight: "5px", color: "mintcream" }}
            ></i>
            Login with Google
          </button>
        )}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Google;
