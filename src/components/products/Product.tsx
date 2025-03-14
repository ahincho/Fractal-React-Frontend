import React, { useContext } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets"; // Asegúrate de tener el icono de agregar al carrito aquí
import { StoreContext } from "../../contexts/StoreContext";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { StoreContextType } from "../../contexts/StoreContextType";
import { AuthenticationContextType } from "../../contexts/AuthenticationContextType";
import { ProductProps } from "../../types/views/ProductProps";
import Counter from "../counter/Counter";
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
  const itemCount = cartItems[id] || 0;

  const handleAdd = () => {
    if (!user) {
      toast.error("You must be logged in to add items to the cart.");
    } else {
      addToCart(id);
    }
  };

  const handleRemove = () => {
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

        {/* Si la cantidad es mayor a 0, muestra el Counter; si es 0, muestra el botón de agregar */}
        {itemCount > 0 ? (
          <Counter quantity={itemCount} onAdd={handleAdd} onRemove={handleRemove} />
        ) : (
          <img
            className="product-add"
            src={assets.addIconWhite}
            alt="Add to cart"
            onClick={handleAdd}
          />
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
