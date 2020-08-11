import React, { useState, useEffect, useRef } from "react";

import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import { Link } from "react-router-dom";
import LoggedInHome from "./HomeComponents/LoggedInHome";
import LoggedOutHome from "./HomeComponents/LoggedOutHome";
import { connect } from "react-redux";

const HomePage = function (props) {
  const [stickyNav, setStickyNav] = useState(false);
  const homeRef = useRef(null);
  const handleScroll = () => {
    let position = window.pageYOffset;
    if (position > homeRef.current.clientHeight) {
      setStickyNav(true);
    } else {
      setStickyNav(false);
    }
  };

  useEffect(() => {
    //console.log(homeRef.current.clientHeight, scrollPosition);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <Navbar sticky={stickyNav} home={true} />
      {props.isAuthenticated ? (
        <LoggedInHome homeRef={homeRef} />
      ) : (
        <LoggedOutHome homeRef={homeRef} />
      )}
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  //console.log(state.showNavbar.sticky);
  return {
    // sticky: state.showNavbar.sticky,

    isAuthenticated: state.auth.login.isAuthenticated,
  };
};

export default connect(mapStateToProps, {
  // showNavBar,
  // hideNavBar,
})(HomePage);
