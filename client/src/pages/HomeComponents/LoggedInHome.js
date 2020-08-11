import React from "react";
import { Link } from "react-router-dom";
import welcomeImage from "../../img/dashboard-page/welcome.svg";

export default function LoggedInHome(props) {
  return (
    <div>
      <section className="home-banner-area" id="home" ref={props.homeRef}>
        <div className="container">
          <div className="row  text-md-left fullscreen">
            <div className="home-banner left col align-items-center">
              <div>
                <h1>Welcome {props.name}</h1>
                <p className="mx-auto mb-40">
                  Lets Start this journey by creating your schedule.
                </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Link to="/calendar" style={{ display: "flex" }}>
                    <button className="primary-btn">Calendar</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="home-banner right fullscreen">
              <img
                className="img-fluid"
                src={welcomeImage}
                alt="Welcome Image"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
