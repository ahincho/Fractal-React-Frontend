import { createContext, ReactNode, useState } from "react";
import { StoreContextType } from "./StoreContextType";
import { usePaginatedData } from "../hooks/UsePaginatedData";
import productService from "../services/ProductService";
import categoryService from "../services/CategoryService";

const StoreContext = createContext<StoreContextType | null>(null);

interface StoreContextProviderProps {
  children: ReactNode;
}

export const StoreContextProvider: React.FC<StoreContextProviderProps> = ({ children }) => {
  const { data: products, loading: loadingProducts, error: errorProducts } = usePaginatedData(
    productService.findProducts,
    0,
    50
  );
  const { data: categories, loading: loadingCategories, error: errorCategories } = usePaginatedData(
    categoryService.findCategories,
    0,
    10
  );
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const addToCart = (itemId: string | number) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };
  const removeFromCart = (itemId: string | number) => {
    setCartItems((prev) => {
      if (prev[itemId] > 1) {
        return {
          ...prev,
          [itemId]: prev[itemId] - 1,
        };
      } else {
        const updatedCart = { ...prev };
        delete updatedCart[itemId];
        return updatedCart;
      }
    });
  };
  const getTotalCartAmount = () => {
    if (!products || loadingProducts) return 0;
    let totalAmount = 0;
    for (const item in cartItems) {
      const itemInfo = products.find((product) => String(product.id) === String(item));
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return Number(totalAmount.toFixed(2));
  };
  const contextValue = {
    products,
    loadingProducts,
    errorProducts,
    categories,
    loadingCategories,
    errorCategories,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };
  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};

export { StoreContext };
