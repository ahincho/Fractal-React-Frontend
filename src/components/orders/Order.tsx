import React from "react";
import { OrderProps } from "../../types/views/OrderProps";
import "./Order.css";

const Order: React.FC<OrderProps> = ({ order }) => {
  return (
    <tr className="order-row">
      <td>{order.id}</td>
      <td>{order.number}</td>
      <td>{order.status}</td>
      <td>{order.total ? `$${order.total.toFixed(2)}` : 'Not Confirmed'}</td>
      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
      <td>
        <button className="order-details-button">View</button>
        <button className="order-update-button">Update</button>
        <button className="order-delete-button">Delete</button>
      </td>
    </tr>
  );
};

export default Order;
