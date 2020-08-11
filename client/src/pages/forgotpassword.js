import React, { Component, useState } from "react";
import forgotpassword from "../img/forgotpassword.svg";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { connect } from "react-redux";
import {
  Pagecontainer,
  InputContainer,
  Button,
  A,
  Input,
  InputDiv,
  P,
} from "./Login/container";
import Navbar from "../layout/navbar";

import { forgotPassword } from "../redux/actions/auth/loginActions";

var Image = styled.div`
  width: 60%;
  background-color: lightcoral;
  background: url(${forgotpassword}) no-repeat right center/cover;
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

export const PP = styled.p`
  margin-bottom: 40px;
`;

function ForgotPassword(props) {
  const [email, setEmail] = useState("");

  const messageClassName = classNames({
    "text-success": !props.login.error,
    "text-danger": props.login.error,
  });
  return (
    <React.Fragment>
      <Navbar />
      <Pagecontainer>
        <Image />
        <InputContainer>
          <Form>
            {props.login && props.login.message ? (
              <p className={messageClassName}>{props.login.message}</p>
            ) : (
              ""
            )}
            <h1>Forgot password?</h1>
            <div>
              <P>Don't worry! We got you.</P>
              <PP>
                Please provide us your email and we will send a link to change
                your password.
              </PP>
            </div>
            <InputDiv>
              <FontAwesomeIcon icon={faUser} />
              <div>
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                ></Input>
              </div>
            </InputDiv>

            <Button
              type="submit"
              value="Submit"
              onClick={(event) => {
                event.preventDefault();
                props.forgotPassword(email);
              }}
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
  forgotPassword,
})(ForgotPassword);
