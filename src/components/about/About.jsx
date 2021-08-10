import React from "react";

import "./About.scss";

const About = () => {
  return (
    <div className="about">
      <div className="message">
        <span className="project">
          This project is developed by following{" "}
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.udemy.com/course/complete-react-developer-zero-to-mastery/"
          >
            ZTM course from Udemy
          </a>
        </span>
        <div className="content">
          Which contains:
          <ul>
            <li>React</li>
            <li>CSS in JS with styled-components</li>
            <li>Redux, Redux Thunk, Redux Saga</li>
            <li>React Router</li>
            <li>...and other shit that I've skipped</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
