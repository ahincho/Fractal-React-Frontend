import React, { useContext } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../contexts/StoreContext";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { StoreContextType } from "../../contexts/StoreContextType";
import { AuthenticationContextType } from "../../contexts/AuthenticationContextType";
import { ProductProps } from "../../types/views/ProductProps";
import "./Product.css";

const Product: React.FC<ProductProps> = ({ id, name, description, price, quantity, category, image }) => {
  const storeContext = useContext(StoreContext) as StoreContextType;
  const authContext = useContext(AuthenticationContext) as AuthenticationContextType;
  const { user } = authContext;
  if (!storeContext) {
    toast.error("StoreContext is not available");
    return <strong>StoreContext is not available</strong>;
  }
  if (!authContext) {
    toast.error("AuthenticationContext is not available");
    return <strong>AuthenticationContext is not available</strong>;
  }
  const { cartItems, addToCart, removeFromCart } = storeContext;
  const handleAddToCart = () => {
    if (!user) {
      toast.error("You must be logged in to add items to the cart.");
    } else {
      addToCart(id);
    }
  };
  const handleRemoveFromCart = () => {
    if (!user) {
      toast.error("You must be logged in to remove items from the cart.");
    } else {
      removeFromCart(id);
    }
  };
  return (
    <div className="product">
      <div className="product-img-container">
        <img className="product-img" src={image} alt="product-img" />
        {!cartItems[id] ? (
          <img
            className="product-add"
            onClick={handleAddToCart}
            src={assets.addIconWhite}
            alt="add"
          />
        ) : (
          <div className="product-counter">
            <img
              onClick={handleRemoveFromCart}
              src={assets.removeIconRed}
              alt="remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={handleAddToCart}
              src={assets.addIconGreen}
              alt="add"
            />
          </div>
        )}
      </div>
      <div key={id} className="product-info">
        <div className="product-name-rating">
          <p>{name}</p>
          <img src={assets.ratingStarts} alt="rating" />
        </div>
        <p className="product-description">{description}</p>
        <p className="product-category"><strong>Category:</strong> {category}</p>
        <p className="product-quantity"><strong>Stock:</strong> {quantity}</p>
        <p className="product-price">${price}</p>
      </div>
    </div>
  );
};

export default Product;
