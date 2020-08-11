import React, { Component } from "react";
import changepassword from "../img/changepassword.svg";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import {
  Pagecontainer,
  InputContainer,
  Button,
  A,
  Input,
  InputDiv,
} from "./Login/container";
import Navbar from "../layout/navbar";

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

class ResetPassword extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Pagecontainer>
          <Image />
          <InputContainer>
            <Form>
              <h1> Reset your password</h1>

              <InputDiv>
                <FontAwesomeIcon icon={faLock} />
                <div>
                  <Input type="password" placeholder=" New Password"></Input>
                </div>
              </InputDiv>
              <InputDiv>
                <FontAwesomeIcon icon={faLock} />
                <div>
                  <Input
                    type="password"
                    placeholder=" Retype your Password"
                  ></Input>
                </div>
              </InputDiv>

              <Button type="submit" value="Confirm"></Button>
            </Form>
          </InputContainer>
        </Pagecontainer>
      </React.Fragment>
    );
  }
}
export default ResetPassword;
