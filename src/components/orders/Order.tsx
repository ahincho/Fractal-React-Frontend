import { useNavigate } from "react-router-dom";
import { OrderProps } from "../../types/views/OrderProps";
import "./Order.css";

const Order: React.FC<OrderProps & { onDelete: () => void }> = ({ order, onDelete }) => {
  const navigate = useNavigate();
  return (
    <tr className="order-row">
      <td>{order.number}</td>
      <td>{order.status}</td>
      <td>{order.total ? `$${order.total.toFixed(2)}` : "Not Confirmed"}</td>
      <td>{new Date(order.createdAt).toLocaleString()}</td>
      <td className="order-actions">
        <button className="order-details-button" onClick={() => navigate(`/orders/${order.id}`)}>View</button>
        <button 
          className="order-payment-button" 
          onClick={() => navigate(`/payments/${order.id}`)}
        >
          Payment
        </button>
        <button className="order-delete-button" onClick={onDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default Order;
