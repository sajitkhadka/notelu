import React from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { server, oauthKey } from "../config";

const Google = (props) => {
  const responseGoogle = (response) => {
    console.log(response.tokenId);
    props.submitLogin(response.tokenId);
  };

  const responseFailure = (response) => {
    console.log(response);
  };

  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={oauthKey}
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
