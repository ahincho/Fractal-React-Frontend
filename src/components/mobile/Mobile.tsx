import React from "react";
import { assets } from "../../assets/assets";
import "./Mobile.css";

const Mobile: React.FC = () => {
  return (
    <div className="mobile" id="mobile">
      <p>
        For a better experience, download <br /> Fractal App
      </p>
      <div className="mobile-download-platforms">
        <img src={assets.playStore} alt="play-store" />
        <img src={assets.appStore} alt="app-store" />
      </div>
    </div>
  );
};

export default Mobile;
