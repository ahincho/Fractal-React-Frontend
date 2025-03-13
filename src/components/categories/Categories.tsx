import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { CategoriesProps } from "../../types/views/CategoriesProps";
import { CategoryResponse } from "../../types/categories/CategoryResponse";
import { StoreContext } from "../../contexts/StoreContext";
import Category from "./Category";
import "./Categories.css";

const Categories: React.FC<CategoriesProps> = ({ category, setCategory }) => {
  const storeContext = useContext(StoreContext);
  if (!storeContext) {
    toast.error("StoreContext is not available");
    return <strong>StoreContext is not available</strong>;
  }
  const { categories, loadingCategories, errorCategories } = storeContext;
  useEffect(() => {
    if (errorCategories) {
      toast.error("Failed to fetch categories");
    }
  }, [errorCategories]);
  return (
    <div className="explore" id="explore">
      <h1>Explore our products</h1>
      <p className="explore-text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio magnam aut nisi, facere magni voluptates error ullam. Molestiae odio quaerat rem, quibusdam dolores corrupti quam illo quisquam et, eos ullam? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam deleniti molestias nihil nostrum numquam sapiente odit unde voluptatibus, expedita perferendis nobis cumque ipsa non eaque repudiandae aliquam fugiat vel. Delectus.
      </p>
      {loadingCategories ? (
        <p>Loading categories...</p>
      ) : categories.length > 0 ? (
        <div className="explore-list">
          {categories.map((item: CategoryResponse) => (
            <Category key={item.id} category={category} item={item} setCategory={setCategory} />
          ))}
        </div>
      ) : (
        <p>No categories available</p>
      )}
      <hr />
    </div>
  );
};

export default Categories;
