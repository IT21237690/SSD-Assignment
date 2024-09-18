import React from 'react';
import BannerImage from "../Assets/home-banner-image.png";
import { useNavigate,NavLink } from 'react-router-dom';

import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className='home-container'>
     
      <div className='home-banner-container'>
        <div className='home-bannerImage-container'></div>
        <div className="home-text-section" style={{ marginLeft: '10rem' }}>
          <h1 className="primary-heading-wishwains">Wishwa Institute</h1>
          <p className="primary-text">
          Empowering Minds, Shaping Futures. Education from Grade 6 to Advanced Level!
          </p>

          <button className="secondary-button" >
           <NavLink to="/register" style={{ color: 'blue', textDecoration: 'none' }}>Register<FiArrowRight />{""}</NavLink>
          </button>

     
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
