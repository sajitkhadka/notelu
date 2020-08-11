import React, { Component } from "react";
import privacy from "../img/dashboard-page/privacy.svg";
import styled from "styled-components/macro";

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
  background: url(${privacy}) no-repeat right center/cover;
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

class PrivacyPolicy extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Pagecontainer>
          <Image />
          <InputContainer>
            <Form>
              <h1> Privacy Policy</h1>
              <div>
                <h3>Web Privacy</h3>
                <a>
                  Notellu is committed to respecting the privacy of the its
                  website users and protecting their personal information in
                  accordance with import {} from "legislative requirements under
                  the Freedom of Infromation and Protection of Privacy
                  Act(FIPPA).
                </a>{" "}
              </div>
              <br></br>
              <div>
                <h3>Collection of Personal Information</h3>
                <a>
                  Notelu only obtains specific personal information such as your
                  name, email and date of birth for the registration purposes.
                  Notelu doesnot share personal information that is voluntarily
                  provided through our website.
                </a>
              </div>
              <br></br>
              <div>
                <h3>More Information</h3>
                <a>
                  If you have any question about the Web Privacy Statement, you
                  may contact us at:
                  <div>
                    69 Heines Crescent, Mississauga L4T2RT, Ontario, Canada.
                  </div>
                </a>
              </div>
            </Form>
          </InputContainer>
        </Pagecontainer>
      </React.Fragment>
    );
  }
}
export default PrivacyPolicy;
