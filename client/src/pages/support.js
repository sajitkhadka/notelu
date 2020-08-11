import React, { Component } from "react";
import support from "../img/dashboard-page/support.svg";
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
  background: url(${support}) no-repeat right center/cover;
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

class Support extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Pagecontainer>
          <Image />
          <InputContainer>
            <Form>
              <h1> Help and Support</h1>
              <div>
                <a>
                  {" "}
                  For any issues and concern you can directly reach out to us by
                  calling at our office +1(437)294 5235 or you can email us at
                  <strong> www.notelu.com</strong>.{" "}
                </a>
              </div>
              <div>
                <a>
                  We are located at 69 Heines Crescent, Mississauga L4T2RT,
                  Ontario, Canada.
                </a>
              </div>
            </Form>
          </InputContainer>
        </Pagecontainer>
      </React.Fragment>
    );
  }
}
export default Support;
