import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import logo from "../img/logo.png";
import { addSubscriber } from "../api/subscriber";

const Footer = function () {
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [isSubscribed, setSubscribed] = useState("");
  return (
    <footer id="main-footer" className="py-2">
      <Row>
        <Col lg="4" md="3" sm="12">
          <div>
            <p>
              <img src={logo} alt="Notelu" width="30px" />
              Notelu.com
            </p>
            <div className="contact-us">
              <h4>Contact Us</h4>
              <p>69 Heines Crescent</p>
              <p>Mississauga , l5a2v2</p>
              <p>Ontario, Canada</p>
              <p>+1 (437) 294 5235</p>
            </div>
          </div>
        </Col>
        <Col lg="4" md="3" sm="12">
          <div>
            <h3>Email Newsletter</h3>
            <p>Enter your email if you want to get updates and promotions.</p>
            <form>
              {isSubscribed ? (
                <p style={{ color: "green" }}>
                  Successfully subscribed for email.
                </p>
              ) : isSubscribed === false ? (
                <p style={{ color: "red" }}>
                  Error! Couldn't add to subscribers list
                </p>
              ) : (
                ""
              )}
              <input
                type="email"
                placeholder="Enter Email..."
                value={subscribeEmail}
                onChange={(event) => {
                  setSubscribeEmail(event.target.value);
                }}
                style={{ marginRight: "15px", padding: "10px" }}
              />
              <input
                type="submit"
                value="Subscribe"
                className="btn btn-primary"
                onClick={(event) => {
                  event.preventDefault();
                  addSubscriber(subscribeEmail, (isSubscribed) => {
                    setSubscribed(isSubscribed);
                  });
                }}
              />
            </form>
          </div>
        </Col>

        <Col lg="4" md="3" sm="12">
          <div>
            <h3>Site Links</h3>
            <ul className="list">
              <li>
                <a href="/support">Help & Support</a>
              </li>
              <li>
                <a href="/privacypolicy">Privacy Policy</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/Signup">Sign Up</a>
              </li>
            </ul>
          </div>
          <div>
            <p>Copyright &copy; 2019, All Rights Reserved</p>
          </div>
        </Col>
      </Row>
    </footer>
  );
};
export default Footer;
