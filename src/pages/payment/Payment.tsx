import React, { useContext, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { OrderDetailResponse } from "../../types/orders/OrderDetailResponse";
import "./Payment.css";
import { useGetData } from "../../hooks/UseGetData";
import detailService from "../../services/DetailService";

const Payment: React.FC = () => {
  const { orderId } = useParams();
  const authContext = useContext(AuthenticationContext);
  const navigate = useNavigate();
  if (!authContext) {
    toast.error("Authentication context not available.");
    return <strong>Authentication context is not available</strong>;
  }
  const { user } = authContext;
  if (!user) {
    toast.error("User not authenticated. Please log in.");
    return <strong>User not authenticated</strong>;
  }
  const orderIdNumber = orderId ? parseInt(orderId, 10) : NaN;
  if (isNaN(orderIdNumber)) {
    toast.error("Invalid order ID.");
    return <strong>Invalid order ID.</strong>;
  }
  const fetchOrderDetails = useCallback(() => {
    return detailService.findDetails(orderIdNumber);
  }, [orderIdNumber]);
  const { data: order, loading, error } = useGetData<OrderDetailResponse>(fetchOrderDetails);
  useEffect(() => {
    if (error) {
      toast.error("Error fetching order details: " + error.message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }, [error]);
  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
      toast.info("Order details are still loading. Please wait.");
      return;
    }
    if (!order) {
      toast.error("Order not found.");
      return;
    }
    try {
      toast.success("Proceeding to payment...", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/orders");

    } catch (error) {
      toast.error("Error processing payment. Please try again.", {
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
          <h2>Order Details</h2>
          {loading ? (
            <p>Loading order details...</p>
          ) : order ? (
            <div>
              <div className="cart-total-details">
                <p>Order Number</p>
                <p>{order.number}</p>
              </div>
              <div className="cart-total-details">
                <p>Created At</p>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="cart-total-details">
                <p>Updated At</p>
                <p>{new Date(order.updatedAt).toLocaleString()}</p>
              </div>
              <h3>Products</h3>
              {order.details.map((item, index) => (
                <div key={index} className="cart-total-details">
                  <p>{item.product}</p>
                  <p>${item.price.toFixed(2)}</p>
                  <p>*{item.quantity}</p>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${order.total.toFixed(2)}</b>
              </div>
            </div>
          ) : (
            <p>Order details not found.</p>
          )}
          <button onClick={handleProceed} disabled={loading || !order}>
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Payment;
