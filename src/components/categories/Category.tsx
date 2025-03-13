import React from "react";
import { CategoryProps } from "../../types/views/CategoryProps";
import "./Category.css";

const Category: React.FC<CategoryProps> = ({ category, item, setCategory }) => {
  return (
    <div
      key={item.id}
      onClick={() => setCategory((prev) => (prev === item.name ? "All" : item.name))}
      className="category-item"
    >
      <img className={category === item.name ? "active" : ""} src={item.image} alt={item.name} />
      <p>{item.name}</p>
    </div>
  );
};

export default Category;
