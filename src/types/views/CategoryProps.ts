import { CategoryResponse } from "../categories/CategoryResponse";

export interface CategoryProps {
  category: string;
  item: CategoryResponse;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}
