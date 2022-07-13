import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { deleteCategory } from "../../modules/categoryManager";

export const CategoryCard = ({ category }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteCategory = (id) => {
    deleteCategory(id).then(() => {
      setIsDeleting(false);
      window.location.reload();
    });
  };

  const navigate = useNavigate();

  const categoryCardCodeArray = [
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
        }}
      >
        Cancel
      </button>
    </>,
    <button
      type="button"
      id="category_delete_btn"
      className="delete_btn"
      onClick={() => {
        setIsDeleting(true);
      }}
    >
      Delete
    </button>,
  ];

  return (
    <Card className="m-4">
      <CardBody>
        <strong>{category.name}</strong>
        <br />
        {isDeleting ? categoryCardCodeArray[0] : categoryCardCodeArray[1]}
      </CardBody>
    </Card>
  );
};
