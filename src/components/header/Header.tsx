import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header-content">
        <h2>Order your favorite product</h2>
        <p>Choose from a diverse menu featuring a delectable array of products</p>
        <a href="#explore" className="header-button">
          <button>View Menu</button>
        </a>
      </div>
    </div>
  );
};

export default Header;
