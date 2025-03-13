import { AxiosError } from "axios";
import { CategoryResponse } from "../types/categories/CategoryResponse";
import { ProductResponse } from "../types/products/ProductResponse";

export interface StoreContextType {
  products: ProductResponse[];
  loadingProducts: boolean;
  errorProducts: AxiosError | null;
  categories: CategoryResponse[];
  loadingCategories: boolean;
  errorCategories: AxiosError | null;
  cartItems: Record<number, number>;
  setCartItems: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  addToCart: (itemId: string | number) => void;
  removeFromCart: (itemId: string | number) => void;
  getTotalCartAmount: () => number;
}
