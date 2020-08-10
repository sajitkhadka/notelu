import React, { useState } from "react";
import styled from "styled-components/macro";
import { Link as Lin } from "react-scroll";
import Container from "../../layout/components/container";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";

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

var LogoButton = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid orange;
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

var Logo = styled.div`
  img {
    margin-top: 10px;
    width: 60px;
  }
`;

function DashboardNavbar() {
  //   const [state, setState] = useState();
  //   state = {
  //     isOpen: false,
  //   };

  //   handleClick = () => {
  //     setState({
  //       isOpen: !state.isOpen,
  //     });
  //   };

  return (
    <Nav>
      <Container>
        <Row>
          <LogoButton>
            <Logo>
              <Link to="/">
                <img src={logo} alt="notelu_logo"></img>
              </Link>
            </Logo>

            {/* onClick={this.handleClick} */}

            <NavButton>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </NavButton>
          </LogoButton>
          <NavList>
            <li>
              <Lin
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Home
              </Lin>
            </li>
            <li>
              <Lin
                activeClass="active"
                to="calender"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Calender
              </Lin>
            </li>
            <li>
              <Lin
                activeClass="active"
                to="schedule"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Schedule
              </Lin>
            </li>

            <li>
              <Link to="/Signout">Sign out</Link>
            </li>
          </NavList>
        </Row>
      </Container>
    </Nav>
  );
}

export default DashboardNavbar;
