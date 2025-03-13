import React from "react";
import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            ducimus facilis laborum vero distinctio id cumque tenetur iure in
            aut possimus dolorem officia natus quaerat aliquam, totam provident?
            Deleniti, velit?
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebookIcon} alt="facebook" />
            <img src={assets.twitterIcon} alt="twitter" />
            <img src={assets.linkedinIcon} alt="linkedin" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+51 987654321</li>
            <li>contact@fractal.com.pe</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 fractal.com.pe - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
