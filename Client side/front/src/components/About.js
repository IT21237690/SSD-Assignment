import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import AboutBackgroundImage from "../Assets/about-background-image.png";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
      {/*<p className="primary-subheading">Institute</p>*/}
        <h1 className="primary-heading">
          About the Institute
        </h1>
        <p className="primary-text">
        Welcome to our renowned educational institute in Polonnaruwa, Sri Lanka, owned by Sunil Perera. We offer comprehensive education from Grade 6 to Advanced Level, focusing on holistic development. Our dedicated team of experienced educators fosters academic excellence, critical thinking, and character growth. Join us to empower students, shaping them into well-rounded leaders prepared for the future.
        </p>
        
      </div>
    </div>
  );
};

export default About;
