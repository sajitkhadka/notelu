import React, { useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import Container from "./components/container";
import { Link as Lin } from "react-scroll";
import { connect } from "react-redux";
import { history } from "../history";
import { logout } from "../redux/actions/auth/loginActions";

var Nav = styled.nav`
  z-index: 1;
  ${(props) => {
    return props.sticky
      ? "position:sticky; top: 0; background-color:#fff; box-shadow: 4px 0 20px -10px rgba(0, 0, 0, 0.2);"
      : "position:relative; background-color: transparent";
  }}
`;

var Row = styled.div`
  @media screen and (min-width: 640px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: ${(props) => (props.sticky ? "" : "2px solid orange")};
    padding: 0 20px;
  }

  ul a {
    background: transparent;
    margin-right: 25px;
  }
`;

var LogoButton = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid orange;
`;
var Logo = styled.div`
  img {
    margin-top: 10px;
    width: 60px;
  }
`;
var NavButton = styled.div`
  border: 1px solid black;
  display: inline-block;
  @media screen and (min-width: 640px) {
    display: none;
  }
  .bar {
    width: 30px;
    height: 4px;
    margin: 4px;
    color: rgb(139, 139, 137);
    background: gray;
    cursor: pointer;
  }
`;

var NavList = styled.ul`
  list-style: none;
  height: ${(props) => (props.show ? "auto" : "0px")};
  overflow: hidden;
  transition: all 0.5s ease;

  li a {
    color: black;
    text-decoration: none;
    padding: 10px;
    display: flex;
    transition: all 0.5s ease;
    font-size: 18px;
  }
  li a:hover {
    background-color: blueviolet;
    padding-left: 20px;
  }

  @media screen and (min-width: 640px) {
    display: flex;
    list-style-type: none;
    height: auto;

    li a:hover {
      background-color: blueviolet;
      padding-left: 10px;
    }
  }
`;
const MyButton = styled.button`
  background: transparent;
  line-height: 28px;
  padding-left: 40px;
  margin-right: ${(props) => props.marginRight};
  padding-right: 40px;
  border-radius: 3px;
  border: 1px solid #4ba0f9;
  color: #000000;
  display: inline-block;
  font-weight: 500;
  position: relative;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  text-transform: uppercase;
  position: relative;
`;

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  console.log(props);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav sticky={props.sticky}>
      <Container>
        <Row sticky={props.sticky}>
          <LogoButton>
            <Logo>
              <Link to="/">
                <img src={logo} alt="notelu_logo"></img>
              </Link>
            </Logo>

            <NavButton onClick={handleClick}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </NavButton>
          </LogoButton>

          {props.home ? (
            <NavList style={{ display: "flex" }}>
              <li>
                <Lin
                  activeClass="active"
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  About
                </Lin>
              </li>
              <li>
                <Lin
                  activeClass="active"
                  to="features"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  Features
                </Lin>
              </li>
              <li>
                <Lin
                  activeClass="active"
                  to="main-footer"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  Contact
                </Lin>
              </li>
            </NavList>
          ) : null}

          {!props.isAuthenticated ? (
            <NavList show={isOpen}>
              <li>
                <MyButton
                  onClick={() => {
                    history.push("/login");
                  }}
                  marginRight="20px"
                >
                  Login
                </MyButton>
              </li>
              <li>
                <MyButton
                  onClick={() => {
                    history.push("/signup");
                  }}
                  className="primary-btn"
                  to="/Signup"
                >
                  Sign up
                </MyButton>
              </li>
            </NavList>
          ) : (
            <NavList show={isOpen}>
              <li>
                <MyButton
                  className="primary-btn"
                  onClick={() => props.logout()}
                >
                  Log Out
                </MyButton>
              </li>
            </NavList>
          )}
        </Row>
      </Container>
    </Nav>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    isAuthenticated: state.auth.login.isAuthenticated,
  };
};
export default connect(mapStateToProps, { logout })(Navbar);
