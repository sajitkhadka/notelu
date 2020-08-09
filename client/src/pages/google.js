import React from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";

const Google = ({ informParent = (f) => f }) => {
  const responseGoogle = (response) => {
    console.log(response.tokenId);
    axios({
      method: "POST",
      //url:`${process.env.REACT_APP_API}/google-login`,
      url: `https://note-lu.herokuapp.com/api/users/google-login`,
      data: { idToken: response.tokenId },
    })
      .then((response) => {
        console.log("GOOGLE SIGNIN SUCCESS", response);
        //inform parent component
        informParent(response);
        //alert('after parent')
      })
      .catch((err) => {
        console.log("GOOGLE SIGNIN ERROR", err.response);
      });
  };

  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
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
