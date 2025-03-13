import React, { useState } from "react";
import Header from "../../components/header/Header";
import Categories from "../../components/categories/Categories";
import Products from "../../components/products/Products";
import Mobile from "../../components/mobile/Mobile";

const Home: React.FC = () => {
  const [category, setCategory] = useState<string>("All");
  return (
    <>
      <Header/>
      <Categories category={category} setCategory={setCategory}/>
      <Products category={category}/>
      <Mobile/>
    </>
  );
};

export default Home;
