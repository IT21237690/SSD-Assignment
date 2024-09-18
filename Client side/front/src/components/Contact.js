import React from 'react';
import './App.css';

function Contact() {
  return (
    <div className="about-section-container">
      <div className="contact-container">
      <h1 className="primary-heading" style={{ color: 'black' }}>Contact</h1>

        <br />
        <br />
        <ul>
        <li>Email: <a href="mailto:wishwa.edu@gmail.com">wishwa.edu@gmail.com</a></li>
        <br />
        <li>Phone: <a href="tel:011-2223030">011-2223030</a></li>
        <br />
        <li>Facebook: <a href="https://www.facebook.com/WishwaEducation">facebook.com/WishwaEducation</a></li>
        <br />
        <li>Instagram: <a href="https://www.instagram.com/WishwaEducation">instagram.com/WishwaEducation</a></li>
        <br />
      </ul>      
      </div>
      <div className="contact-image-section">
        <img src={require('../Assets/Contact.png')} alt="Contact" className="contact-image" />
      </div>
    </div>
  );
}

export default Contact;
