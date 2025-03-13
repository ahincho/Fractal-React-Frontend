import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { ProductsProps } from "../../types/views/ProductsProps";
import { StoreContext } from "../../contexts/StoreContext";
import Product from "./Product";
import "./Products.css";

const Products: React.FC<ProductsProps> = ({ category }) => {
  const storeContext = useContext(StoreContext);
  if (!storeContext) {
    return <p>StoreContext is not available.</p>;
  }
  const { products, loadingProducts, errorProducts } = storeContext;
  useEffect(() => {
    if (errorProducts) {
      toast.error("Failed to fetch products");
    }
  }, [errorProducts]);
  if (loadingProducts) {
    return <p>Loading products...</p>;
  }
  if (!products || products.length === 0) {
    return <p className="error-message">No products available.</p>;
  }
  return (
    <div className="products" id="products">
      <h2>Top Products Near You</h2>
      <div className="products-list">
        {products
          .filter(product => category === "All" || product.category === category)
          .map((item) => (
            <Product key={item.id} {...item} />
          ))}
      </div>
    </div>
  );
};

export default Products;
