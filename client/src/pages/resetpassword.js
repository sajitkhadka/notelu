import React, { useState } from "react";
import { useParams } from "react-router-dom";
import changepassword from "../img/changepassword.svg";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames";
import { connect } from "react-redux";
import {
  Pagecontainer,
  InputContainer,
  Button,
  A,
  Input,
  InputDiv,
} from "./Login/container";
import Navbar from "../layout/navbar";

import { sendForgetPassword } from "../redux/actions/auth/loginActions";
var Image = styled.div`
  width: 60%;
  background-color: lightcoral;
  background: url(${changepassword}) no-repeat right center/cover;
  flex: 2;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Form = styled.form`
  width: 350px;
  h1 {
    font-size: 25px;
    text-transform: uppercase;
    margin-bottom: 100px;
    padding: 10px;
    color: blueviolet;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
`;

function ResetPassword(props) {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [error, setError] = useState("");

  const { key } = useParams();

  const messageClassName = classNames({
    "text-success": !props.login.error && !error,
    "text-danger": props.login.error || error,
  });

  return (
    <React.Fragment>
      <Navbar />
      <Pagecontainer>
        <Image />
        <InputContainer>
          <Form>
            {props.login && (props.login.message || error) ? (
              <p className={messageClassName}>{props.login.message || error}</p>
            ) : (
              ""
            )}
            <h1>Reset your password</h1>

            <InputDiv>
              <FontAwesomeIcon icon={faLock} />
              <div>
                <Input
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder=" New Password"
                ></Input>
              </div>
            </InputDiv>
            <InputDiv>
              <FontAwesomeIcon icon={faLock} />
              <div>
                <Input
                  type="password"
                  placeholder=" Retype your Password"
                  onChange={(event) => setRePassword(event.target.value)}
                ></Input>
              </div>
            </InputDiv>

            <Button
              type="submit"
              onClick={(event) => {
                if (password !== rePassword) {
                  setError("Password doesn't match. Please try again");
                }
                event.preventDefault();
                props.sendForgetPassword(password, key);
              }}
              value="Confirm"
            ></Button>
          </Form>
        </InputContainer>
      </Pagecontainer>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
  };
};

export default connect(mapStateToProps, {
  sendForgetPassword,
})(ResetPassword);
