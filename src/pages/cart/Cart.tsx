import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../contexts/StoreContext";
import "./Cart.css";

const Cart: React.FC = () => {
  const storeContext = useContext(StoreContext);
  const navigate = useNavigate();
  if (!storeContext) {
    return <p>Store Context is not available</p>;
  }
  const { cartItems, products, removeFromCart, getTotalCartAmount } = storeContext;
  const subtotal = getTotalCartAmount().toFixed(2);
  const deliveryFee = parseFloat(subtotal) > 0 ? 2.0 : 0.0;
  const total = (parseFloat(subtotal) + deliveryFee).toFixed(2);
  const handleProceed = () => {
    navigate("/payment");
  };
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {products?.map((item) => {
          if (cartItems[item.id] > 0) {
            return (
              <React.Fragment key={item.id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="product" />
                  <p>{item.name}</p>
                  <p>${item.price.toFixed(2)}</p>
                  <p>{cartItems[item.id]}</p>
                  <p>${(item.price * cartItems[item.id]).toFixed(2)}</p>
                  <p className="cross" onClick={() => removeFromCart(item.id)}>X</p>
                </div>
                <hr />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${total}</b>
            </div>
            <button onClick={handleProceed}>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
