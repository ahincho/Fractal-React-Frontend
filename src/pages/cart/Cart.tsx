import React, { useContext } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../../contexts/StoreContext";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { OrderCreateRequest } from "../../types/orders/OrderCreateRequest";
import useCreateData from "../../hooks/UseCreateData";
import orderService from "../../services/OrderService";
import { useNavigate } from "react-router-dom"; // Asegúrate de importar useNavigate
import "./Cart.css";

const Cart: React.FC = () => {
  const storeContext = useContext(StoreContext);
  const authContext = useContext(AuthenticationContext);
  const navigate = useNavigate(); // Usar el hook useNavigate aquí

  if (!storeContext || !authContext) {
    toast.error("Context is not available");
    return <strong>Context is not available</strong>;
  }

  const { cartItems, getTotalCartAmount, setCartItems } = storeContext;
  const { user } = authContext;
  const { createData, loading } = useCreateData(orderService.createOneOrder);

  const total = getTotalCartAmount().toFixed(2);

  const handlePlaceOrder = async () => {
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
      setCartItems({}); // Limpiar el carrito después de realizar la compra
      toast.success("Order placed successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      // Redirigir a la página de pago o la siguiente acción deseada
      navigate("/orders"); // Redirigir a la página de pago
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order. Try again!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
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
        {Object.entries(cartItems).map(([productId, quantity]) => {
          const product = storeContext.products.find(item => item.id === Number(productId));
          if (product && quantity > 0) {
            return (
              <React.Fragment key={product.id}>
                <div className="cart-items-title cart-items-item">
                  <img src={product.image} alt="product" />
                  <p>{product.name}</p>
                  <p>${product.price.toFixed(2)}</p>
                  <p>{quantity}</p>
                  <p>${(product.price * quantity).toFixed(2)}</p>
                  <p className="cross" onClick={() => storeContext.removeFromCart(product.id)}>X</p>
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
          <h2>Description</h2>
          <div>
            <div className="cart-total-details">
              <p>Total</p>
              <p>${total}</p>
            </div>
            <hr />
            <button onClick={handlePlaceOrder} disabled={loading}>
              {loading ? "Placing order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
