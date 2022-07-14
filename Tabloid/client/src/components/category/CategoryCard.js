import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { deleteCategory, updateCategory } from "../../modules/categoryManager";

export const CategoryCard = ({ category }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState({
    name: "",
  });

  const handleDeleteCategory = (id) => {
    deleteCategory(id).then(() => {
      setIsDeleting(false);
      setIsEditing(false);
      window.location.reload();
    });
  };

  const handleEditCategory = (event) => {
    event.preventDefault();
    updateCategory(editedCategory).then(() => {
      setIsEditing(false);
      setIsDeleting(false);
      window.location.reload();
    });
  };

  const handleFieldChange = (event) => {
    const tempCategory = { ...editedCategory };

    let selectedTarget = event.target.value;

    tempCategory[event.target.id] = selectedTarget;
    setEditedCategory(tempCategory);
  };

  useEffect(() => {
    setEditedCategory(category);
  }, [isEditing, isDeleting]);

  const navigate = useNavigate();

  const getCodeByCrudStatus = () => {
    if (isEditing) {
      return (
        <form className="edit_category_form">
          <h2>Edit Category</h2>
          <fieldset>
            <label className="edit_category_label" htmlFor="edit_category_name">
              Category
            </label>
            <input
              type="text"
              id="name"
              onChange={handleFieldChange}
              required
              autoFocus
              className="edit_category_controlled_form"
              placeholder="Category Name"
              value={editedCategory.name}
            />
          </fieldset>
          <button
            type="button"
            id="category_edit_submit_btn"
            className="submit_btn"
            onClick={handleEditCategory}
          >
            Submit
          </button>
          <button
            type="button"
            id="category_cancel_edit_btn"
            className="cancel_btn"
            onClick={() => {
              setIsDeleting(false);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </form>
      );
    }
    if (isDeleting) {
      return (
        <>
          <strong>Are you sure you want to DELETE this Category?</strong>
          <button
            type="button"
            id="category_confirm_delete_btn"
            className="delete_btn"
            onClick={() => {
              console.log(category.id);
              handleDeleteCategory(category.id);
            }}
          >
            Yes, DELETE
          </button>
          <button
            type="button"
            id="category_cancel_delete_btn"
            className="cancel_btn"
            onClick={() => {
              setIsDeleting(false);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            type="button"
            id="category_edit_btn"
            className="edit_btn"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </button>
          <button
            type="button"
            id="category_delete_btn"
            className="delete_btn"
            onClick={() => {
              setIsDeleting(true);
            }}
          >
            Delete
          </button>
        </>
      );
    }
  };

  return (
    <Card className="m-4">
      <CardBody>
        <strong>{category.name}</strong>
        <br />
        {getCodeByCrudStatus()}
      </CardBody>
    </Card>
  );
};
