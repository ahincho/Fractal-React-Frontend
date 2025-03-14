import React, { useCallback, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import detailService from "../../services/DetailService";
import orderService from "../../services/OrderService";
import { OrderDetailResponse } from "../../types/orders/OrderDetailResponse";
import { OrderUpdateRequest } from "../../types/orders/OrderUpdateRequest";
import Counter from "../counter/Counter";
import "./OrderDetail.css";
import { useGetData } from "../../hooks/UseGetData";
import useUpdateData from "../../hooks/UseUpdateData";
import { useDeleteData } from "../../hooks/UseDeleteData";

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const fetchOrderDetails = useCallback(() => {
    return detailService.findDetails(Number(orderId));
  }, [orderId]);
  const { data: order, loading, error, refetch } = useGetData<OrderDetailResponse>(fetchOrderDetails);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [isModified, setIsModified] = useState(false);
  const { updateById, loading: updating } = useUpdateData<OrderUpdateRequest, void>(orderService.updateOneOrderById);
  const { deleteById } = useDeleteData<void>(orderService.deleteOneOrderById);
  useEffect(() => {
    if (order) {
      const initialQuantities: { [key: number]: number } = {};
      order.details.forEach((item) => {
        initialQuantities[item.id] = item.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, [order]);
  useEffect(() => {
    if (order && order.details.length === 0) {
      deleteById(order.id)
        .then(() => {
          toast.success("Order deleted successfully");
          navigate("/orders");
        })
        .catch((err) => {
          const errorMessage = err.response?.data?.message || "Error deleting the order";
          toast.error(errorMessage);
        });
    }
  }, [order, deleteById, navigate]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p>Error loading order details.</p>;
  if (!order) return <p>No order details found.</p>;

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity >= 0) {
      setQuantities((prevQuantities) => {
        const updatedQuantities = { ...prevQuantities, [itemId]: newQuantity };
        const isChanged = order.details.some(
          (item) => updatedQuantities[item.id] !== item.quantity
        );
        setIsModified(isChanged);
        return updatedQuantities;
      });
    }
  };
  const handleSaveChanges = async () => {
    if (order.details.length === 0 || order.details.every(item => (quantities[item.id] ?? 0) === 0)) {
      deleteById(order.id)
        .then(() => {
          toast.success("Order deleted successfully");
          navigate("/orders");
        })
        .catch((err) => {
          const errorMessage = err.response?.data?.message || "Error deleting the order";
          toast.error(errorMessage);
        });
      return;
    }
    if (!isModified) return;
    const updatedDetails = order.details
      .map((item) => ({
        productId: item.id,
        quantity: quantities[item.id] ?? 0,
      }))
      .filter((item) => item.quantity > 0);
    if (updatedDetails.length === 0) return;
    const updatedOrder: OrderUpdateRequest = {
      username: order.username,
      details: updatedDetails,
    };
    try {
      await updateById(order.id, updatedOrder);
      toast.success("Order updated successfully");
      setIsModified(false);
      refetch();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Error updating the order";
      toast.error(errorMessage);
    }
  };
  return (
    <div className="order-detail-container">
      <div className="order-detail-header">
        <h2 className="order-detail-title">Order Details (#{order.id})</h2>
        <button className="save-button" onClick={handleSaveChanges} disabled={!isModified || updating}>
          {updating ? "Saving..." : "Save"}
        </button>
      </div>
      <p><strong>Username:</strong> {order.username}</p>
      <p><strong>Number:</strong> {order.number}</p>
      <p>
        <strong>Total:</strong> $
        {order.details.reduce((acc, item) => acc + item.price * (quantities[item.id] ?? 0), 0).toFixed(2)}
      </p>
      <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      <h3 className="order-detail-subtitle">Products</h3>
      <div className="order-detail-table-container">
        <table className="order-detail-table no-absolute">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.details.map((item) => (
              <tr key={item.id}>
                <td>{item.product}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <Counter
                    quantity={quantities[item.id] ?? 0}
                    onAdd={() => handleUpdateQuantity(item.id, (quantities[item.id] ?? 0) + 1)}
                    onRemove={() => handleUpdateQuantity(item.id, (quantities[item.id] ?? 0) - 1)}
                  />
                </td>
                <td>${(item.price * (quantities[item.id] ?? 0)).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
