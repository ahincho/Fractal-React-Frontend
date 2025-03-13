import React, { useCallback, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { usePaginatedData } from "../../hooks/UsePaginatedData";
import orderService from "../../services/OrderService";
import Order from "./Order";
import "./Orders.css";

const Orders: React.FC = () => {
  const authenticationContext = useContext(AuthenticationContext);
  const username = authenticationContext?.user?.username || "";
  const fetchOrders = useCallback(
    username
      ? (page: number, size: number) => orderService.findOrders(page, size, username)
      : async () =>
          Promise.resolve({
            items: [],
            totalItems: 0,
            totalPages: 0,
            currentPage: 0,
            pageSize: 10,
            hasNextPage: false,
          }),
    [username]
  );
  const { data: orders, loading, error } = usePaginatedData(fetchOrders, 0, 10);
  useEffect(() => {
    if (!username) {
      toast.error("No username found. Please log in.");
    }
  }, [username]);
  if (!username) {
    return <p className="error-message">You must be logged in to view orders.</p>;
  }
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders.</p>;
  if (!orders || orders.length === 0) {
    return <p className="error-message">No orders available.</p>;
  }
  return (
    <div className="orders-container">
      <h2>Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Order Number</th>
            <th>Total</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
