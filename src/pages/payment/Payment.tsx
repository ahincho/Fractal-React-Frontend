import React, { useContext } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../../contexts/StoreContext";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { OrderCreateRequest } from "../../types/orders/OrderCreateRequest";
import useCreateData from "../../hooks/UseCreateData";
import orderService from "../../services/OrderService";
import "./Payment.css";

const Payment: React.FC = () => {
  const storeContext = useContext(StoreContext);
  const authContext = useContext(AuthenticationContext);
  if (!storeContext || !authContext) {
    toast.error("Context is not available");
    return <strong>Context is not available</strong>;
  }
  const { getTotalCartAmount, setCartItems, cartItems } = storeContext;
  const { user } = authContext;
  const { createData, loading } = useCreateData(orderService.createOneProduct);
  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("User not authenticated.");
      return;
    }
    if (Object.keys(cartItems).length === 0) {
      toast.error("Cart is empty. Add products before proceeding.");
      return;
    }
    const orderRequest: OrderCreateRequest = {
      username: user.username,
      details: Object.entries(cartItems).map(([productId, quantity]) => ({
        productId: Number(productId),
        quantity,
      })),
    };
    try {
      await createData(orderRequest);
      setCartItems({});
      toast.success("Order placed successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order. Try again!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  return (
    <form className="payment">
      <div className="payment-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="Firstname" value={user?.firstname || ""} readOnly />
          <input type="text" placeholder="Lastname" value={user?.lastname || ""} readOnly />
        </div>
      </div>
      <div className="payment-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)}</b>
            </div>
            <button onClick={handleProceed} disabled={loading}>
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Payment;
