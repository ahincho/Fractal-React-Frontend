import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Payment from "./pages/payment/Payment";
import Footer from "./components/footer/Footer";
import Navigation from "./components/navigation/Navigation";
import SignUp from "./components/signUp/SignUp";
import Orders from "./components/orders/Orders";
import OrderDetail from "./components/details/OrderDetail";

const App: React.FC = () => {
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  return (
    <>
      {showSignUp && <SignUp setShowSignUp={setShowSignUp} />}
      <div className="app">
        <Navigation setShowSignUp={setShowSignUp} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/orders/:orderId" element={<OrderDetail />} />
          <Route path="/carts" element={<Cart />} />
          <Route path="/payments/:orderId" element={<Payment />}/>
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
};

export default App;
