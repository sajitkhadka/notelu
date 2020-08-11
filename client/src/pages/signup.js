import React, { Component } from "react";
import signupImage from "../img/signup.svg";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faCalendar } from "@fortawesome/free-solid-svg-icons";

import { submitRegister } from "../redux/actions/auth/registerActions";
import {
  Pagecontainer,
  InputContainer,
  Button,
  Input,
  InputDiv,
} from "./Login/container";
import Navbar from "../layout/navbar";

var Image = styled.div`
  width: 60%;
  background-color: lightcoral;
  background: url(${signupImage}) no-repeat right center/cover;
  flex: 2;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Form = styled.form`
  width: 300px;
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

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: "",
        email: "",
        password: "",
        bdate: "",
      },
      dateType: "text",
      submitResponse: null,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    submitRegister(this.state.user, (success, message) => {
      console.log(success, message);
      if (success) {
        console.log({
          dateType: "text",
          user: {
            name: "",
            email: "",
            password: "",
            bdate: "",
          },
          submitResponse: {
            success: success,
            message: message,
          },
        });
        this.setState({
          dateType: "text",
          user: {
            name: "",
            email: "",
            password: "",
            bdate: "",
          },
          submitResponse: {
            success: success,
            message: message,
          },
        });
      } else {
        this.setState({
          submitResponse: {
            success: success,
            message: message,
          },
        });
      }
    });
  };

  handlechangeall = ({ target: { name, value } }) => {
    this.setState((prevstate) => ({
      user: { ...prevstate.user, [name]: value },
    }));
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Pagecontainer>
          <Image />
          <InputContainer>
            <Form onSubmit={this.handleSubmit}>
              <h1>Let's Sign Up!</h1>
              {this.state.submitResponse ? (
                this.state.submitResponse.success ? (
                  <p className="text-success">
                    Your profile is created and needs to be activated. Please
                    check your email.
                  </p>
                ) : (
                  <p className="text-danger">
                    Sorry account couldn't be created.
                    {this.state.submitResponse.message}
                  </p>
                )
              ) : (
                ""
              )}
              <InputDiv>
                <FontAwesomeIcon icon={faUser} />
                <div>
                  <Input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={this.state.user.name}
                    onChange={this.handlechangeall}
                  ></Input>
                </div>
              </InputDiv>
              <InputDiv>
                <FontAwesomeIcon icon={faCalendar} />
                <div>
                  <Input
                    type="date"
                    placeholder="Date of Birth"
                    name="bdate"
                    value={this.state.user.bdate}
                    onChange={this.handlechangeall}
                  ></Input>
                </div>
              </InputDiv>
              <InputDiv>
                <FontAwesomeIcon icon={faUser} />
                <div>
                  <Input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={this.state.user.email}
                    onChange={this.handlechangeall}
                  ></Input>
                </div>
              </InputDiv>
              <InputDiv>
                <FontAwesomeIcon icon={faLock} />
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.user.password}
                    onChange={this.handlechangeall}
                  ></Input>
                </div>
              </InputDiv>

              <Button type="submit" value="Register"></Button>
            </Form>
          </InputContainer>
        </Pagecontainer>
      </React.Fragment>
    );
  }
}
export default Signup;
