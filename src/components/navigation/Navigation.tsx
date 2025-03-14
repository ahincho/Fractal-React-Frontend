import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavigationProps } from "../../types/views/NavigationProps";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { AuthenticationContextType } from "../../contexts/AuthenticationContextType";
import { StoreContext } from "../../contexts/StoreContext";
import { StoreContextType } from "../../contexts/StoreContextType";
import { assets } from "../../assets/assets";
import "./Navigation.css";

const Navigation: React.FC<NavigationProps> = ({ setShowSignUp }) => {
  const [selectedOption, setSelectedOption] = useState<string>("Home");
  const { user, logout } = useContext(AuthenticationContext) as AuthenticationContextType;
  const { getTotalCartAmount } = useContext(StoreContext) as StoreContextType;
  const navigate = useNavigate();
  const handleAuthenticationNavigation = (route: string) => {
    if (!user || !user.username) {
      toast.error("You must be logged in to view orders.");
      return;
    }
    navigate(route);
  }
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setSelectedOption("Home")} className={selectedOption === "Home" ? "active" : ""}>Home</Link>
        <a href="#explore" onClick={() => setSelectedOption("Menu")} className={selectedOption === "Menu" ? "active" : ""}>Menu</a>
        <a href="#mobile" onClick={() => setSelectedOption("Mobile")} className={selectedOption === "Mobile" ? "active" : ""}>Mobile</a>
        <a href="#footer" onClick={() => setSelectedOption("Contact")} className={selectedOption === "Contact" ? "active" : ""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <img src={assets.searchIcon} alt="orders-icon" onClick={() => handleAuthenticationNavigation("/orders")} />
        </div>
        <div className="navbar-search-icon">
          <img
            src={assets.basketIcon}
            onClick={() => {
              if (getTotalCartAmount() > 0) {
                handleAuthenticationNavigation("/carts");
              } else {
                toast.error("You must have products in the cart before entering");
              }
            }}
            alt="basket-icon"
          />
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {user ? (
          <button onClick={logout}>Sign Out</button>
        ) : (
          <button onClick={() => setShowSignUp(true)}>Sign Up</button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
