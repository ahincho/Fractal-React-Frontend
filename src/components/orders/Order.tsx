import React from "react";
import { OrderProps } from "../../types/views/OrderProps";
import "./Order.css";

const Order: React.FC<OrderProps> = ({ order }) => {
  return (
    <tr className="order-row">
      <td>{order.id}</td>
      <td>{order.username}</td>
      <td>{order.number}</td>
      <td>${order.total.toFixed(2)}</td>
      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
      <td>
        <button className="order-details-button">View Details</button>
      </td>
    </tr>
  );
};

export default Order;
