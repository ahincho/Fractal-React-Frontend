import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../../contexts/StoreContext";
import Product from "./Product";
import "./Products.css";

interface ProductsProps {
  category: string;
}

const Products: React.FC<ProductsProps> = ({ category }) => {
  const storeContext = useContext(StoreContext);
  if (!storeContext) {
    toast.error("StoreContext is not available");
    return <strong>StoreContext is not available</strong>;
  }
  const { products, loadingProducts, errorProducts } = storeContext;
  useEffect(() => {
    if (errorProducts) {
      toast.error("Failed to fetch products");
    }
  }, [errorProducts]);
  return (
    <div className="products" id="products">
      <h2>Top Products Near You</h2>
      {loadingProducts ? (
        <p>Loading products...</p>
      ) : (
        <div className="products-list">
          {products.length > 0 ? (
            products.map((item) =>
              category === "All" || category === item.category ? (
                <Product key={item.id} {...item} />
              ) : null
            )
          ) : (
            <p>No products available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
