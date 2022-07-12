import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";


export const TagCard = ({tag}) => {
  console.log(tag)
  return (
    <Card>
      <h3>{tag.name}</h3>
    </Card>
  )
}