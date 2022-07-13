import React, { useState, useEffect } from "react";
import { CategoryCard } from "./CategoryCard";
import { getAllCategories, addCategory } from "../../modules/categoryManager";
import { useNavigate } from "react-router-dom";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
  });

  const navigate = useNavigate();

  const getCategories = () => {
    getAllCategories().then((r) => setCategories(r));
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmitCategory = (event) => {
    event.preventDefault();
    addCategory(newCategory).then(() => {
      setIsAddingCategory(false);
      window.location.reload();
    });
  };

  const handleFieldChange = (event) => {
    const tempCategory = { ...newCategory };

    let selectedTarget = event.target.value;

    tempCategory[event.target.id] = selectedTarget;
    setNewCategory(tempCategory);
  };

  const newCategoryCodeArray = [
    <form className="new_review_form">
      <h2>Add Category</h2>
      <fieldset>
        <label className="new_category_label" htmlFor="new_category_name">
          Category
        </label>
        <input
          type="text"
          id="name"
          onChange={handleFieldChange}
          required
          autoFocus
          className="new_category_controlled_form"
          placeholder="Category Name"
          value={newCategory.name}
        />
      </fieldset>
      <button
        type="button"
        id="category_add_submit_btn"
        className="submit_btn"
        onClick={handleSubmitCategory}
      >
        Submit
      </button>
      <button
        type="button"
        id="new_category_cancel_btn"
        className="cancel_btn"
        onClick={() => setIsAddingCategory(false)}
      >
        Cancel
      </button>
    </form>,
    <button
      type="button"
      onClick={() => {
        setIsAddingCategory(true);
      }}
    >
      Add a New Category
    </button>,
  ];

  return (
    <div className="container">
      <div className="row justify-content-center">
        {isAddingCategory ? newCategoryCodeArray[0] : newCategoryCodeArray[1]}
        {categories.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
};
