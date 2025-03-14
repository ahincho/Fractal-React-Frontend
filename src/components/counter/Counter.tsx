import React from "react";
import { assets } from "../../assets/assets";
import "./Counter.css";
import { CounterProps } from "../../types/views/CounterProps";

const Counter: React.FC<CounterProps> = ({ quantity, onAdd, onRemove }) => {
  return (
    <>
      {quantity === 0 ? (
        <img className="counter-add" onClick={onAdd} src={assets.addIconWhite} alt="add" />
      ) : (
        <div className="counter-container">
          <img onClick={onRemove} src={assets.removeIconRed} alt="remove" />
          <p>{quantity}</p>
          <img onClick={onAdd} src={assets.addIconGreen} alt="add" />
        </div>
      )}
    </>
  );
};

export default Counter;
