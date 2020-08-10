import React, { useRef } from "react";
import Footer from "../../layout/footer";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import welcomeImage from "../../img/dashboard-page/welcome.svg";
import DashboardNavbar from "./dashboardNavbar";

function DashboardLogin() {
  const homeRef = useRef(null);
  return (
    <React.Fragment>
      <DashboardNavbar />
      <section className="home-banner-area" id="home" ref={homeRef}>
        <div className="container">
          <div className="row  text-md-left fullscreen">
            <div className="home-banner left col align-items-center">
              <div>
                <h1>Welcome Prekshya</h1>
                <p className="mx-auto mb-40">
                  Lets Start this journey by creating your first scheduele.
                </p>
                <Link to="/calendar">
                  <button className="primary-btn">Calendar</button>
                </Link>
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

      <Footer />
    </React.Fragment>
  );
}

export default DashboardLogin;
