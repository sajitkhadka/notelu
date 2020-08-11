import React from "react";
import { Link } from "react-router-dom";
import welcomeImage from "../../img/dashboard-page/welcome.svg";
import mainImage from "../../img/landing-page/time.svg";
import timekeeper from "../../img/landing-page/timekeeper.svg";
import createNoteImage from "../../img/landing-page/create-note.png";
import printOutImage from "../../img/landing-page/printout.png";
import access24Image from "../../img/landing-page/24-hour-access.png";
import createScheduleImage from "../../img/landing-page/create-schedule.png";

export default function LoggedOutHome(props) {
  return (
    <div>
      <section className="home-banner-area" id="home" ref={props.homeRef}>
        <div className="container">
          <div className="row  text-md-left fullscreen">
            <div className="home-banner left col align-items-center">
              <div>
                <h1>Be More Productive than ever!</h1>
                <p className="mx-auto mb-40">
                  Notelu is a web application that can keep track of your daily
                  schedule. It is essential to manage time to increase our
                  productivity in our day to day life.
                </p>
                <Link to="/calendar">
                  <button className="primary-btn">Calendar</button>
                </Link>
              </div>
            </div>
            <div className="home-banner right fullscreen">
              <img className="img-fluid" src={mainImage} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="timekeeper-banner-area" id="about">
        <div className="container">
          <div className="row  text-md-left fullscreen">
            <div className="border">
              <div className="home-banner left">
                <img className="img-fluid" src={timekeeper} alt="" />
              </div>
              <div className="home-banner right col align-items-center">
                <div>
                  <h1>We will be your daily timekeeper</h1>
                  <p className="mx-auto mb-40">
                    Notelu makes your schedule management one step further. Got
                    a meeting next week? Don't have time to study for your
                    exams? Just set your next task with the help of friendly
                    user interface.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="container">
          <div
            className="row mb-5 text-center aos-init aos-animate"
            data-aos="fade-up"
          >
            <div className="text-center">
              <h2 className="section-title">Our Features</h2>
            </div>
          </div>

          <div className="row row-features">
            <div className="each-feature feature-2">
              <div className="absolute-image">
                <img className="img-fluid" src={createScheduleImage} alt="" />
              </div>
              <div>
                <div className="wrap-feature">
                  <h3>Create Schedule</h3>
                  <p className="mx-auto mb-40">
                    Don’t worry if your data is very large, the Data Warehoue
                    provides a search engine, which is useful for making it
                    easier to find data effectively saving time.
                  </p>
                </div>
              </div>
            </div>
            <div className="each-feature feature-3">
              <div className="absolute-image">
                <img className="img-fluid" src={access24Image} alt="" />
              </div>
              <div>
                <div className="wrap-feature">
                  <h3>24 Hours Access</h3>
                  <p className="mx-auto mb-40">
                    Access is given 24 hours a full morning to night and meet
                    again in the morning, giving you comfort when you need data
                    when urgent.
                  </p>
                </div>
              </div>
            </div>
            <div className="each-feature feature-4">
              <div className="absolute-image">
                <img className="img-fluid" src={printOutImage} alt="" />
              </div>
              <div>
                <div className="wrap-feature">
                  <h3>Print Out</h3>
                  <p className="mx-auto mb-40">
                    Print out service gives you convenience if someday you need
                    printed data, just edit it all and just print it.
                  </p>
                </div>
              </div>
            </div>
            <div className="each-feature feature-1">
              <div className="absolute-image">
                <img className="img-fluid" src={createNoteImage} alt="" />
              </div>
              <div className="wrap-feature">
                <h3>Secure and fast access</h3>
                <p className="mx-auto mb-40">
                  Data Security is one of our best facilities. Only you will be
                  app.enable to view your schedules. We are also utilizing
                  latest technologies to ensure that you get your schedules
                  instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
