import React from "react";
import { Card, CardBody } from "reactstrap";

export const CategoryCard = ({ category }) => {
  return (
    <Card className="m-4">
      <CardBody>
        <strong>{category.name}</strong>
      </CardBody>
    </Card>
  );
};
