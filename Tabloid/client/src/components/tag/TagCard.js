import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useNavigate } from "react-router-dom";



export const TagCard = ({tag, callDeleteTag}) => {

  const navigate = useNavigate();

  return (
    <Card>
      <h3>{tag.name}</h3>
      <div>
        <button type="button" className="btn btn-primary" onClick={() => callDeleteTag(tag.id)}>Delete Tag</button>

        <button type="button" className="btn btn-primary" onClick={() => {navigate(`/tag/${tag.id}/edit`)}}>Edit Tag</button>
      </div>
    </Card>
  )
}