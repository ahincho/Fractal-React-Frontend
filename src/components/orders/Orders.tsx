import React, { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { usePaginatedData } from "../../hooks/UsePaginatedData";
import { OrderResponse } from "../../types/orders/OrderResponse";
import orderService from "../../services/OrderService";
import Modal from "../modal/Modal";
import Order from "./Order";
import "./Orders.css";

const Orders: React.FC = () => {
  const authenticationContext = useContext(AuthenticationContext);
  const username = authenticationContext?.user?.username || "";
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
  const fetchOrders = useCallback(
    username
      ? async (page: number, size: number) => {
          const response = await orderService.findOrders(page, size, username);
          setOrders(response.items);
          return response;
        }
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
  const { loading, error } = usePaginatedData(fetchOrders, 0, 10);
  useEffect(() => {
    if (!username) {
      toast.error("No username found. Please log in.");
    }
  }, [username]);
  const handleDelete = async () => {
    if (selectedOrder) {
      try {
        await orderService.deleteOneOrderById(selectedOrder.id);
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== selectedOrder.id));
        toast.success("Order deleted successfully!");
      } catch (error) {
        toast.error("Error deleting order.");
      } finally {
        setSelectedOrder(null);
      }
    }
  };
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
            <th>Order Number</th>
            <th>Status</th>
            <th>Total</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <Order key={order.id} order={order} onDelete={() => setSelectedOrder(order)} />
          ))}
        </tbody>
      </table>
      {selectedOrder && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedOrder(null)}
          onConfirm={handleDelete}
          title="Confirm Delete"
          message={`Are you sure you want to delete order ${selectedOrder.number}?`}
        />
      )}
    </div>
  );
};

export default Orders;
