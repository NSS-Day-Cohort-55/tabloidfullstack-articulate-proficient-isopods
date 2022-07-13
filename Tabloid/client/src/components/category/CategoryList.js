import React, { useState, useEffect } from "react";
import { CategoryCard } from "./CategoryCard";
import { getAllCategories, addCategory } from "../../modules/categoryManager";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    getAllCategories().then((r) => setCategories(r));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        {categories.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
};
