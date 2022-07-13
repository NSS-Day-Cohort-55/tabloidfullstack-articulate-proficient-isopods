import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTags, deleteTag } from "../../modules/tagManager";
import { TagCard } from "./TagCard";

export const TagList = () => {

  const navigate = useNavigate()

  const [tags, setTags] = useState([]);

  const getTags = () => {
    getAllTags().then((response) => setTags(response));
  };

  useEffect(() => {
    getTags();
  }, []);

  console.log(tags)

  const callDeleteTag = (id) => {
    deleteTag(id)
    .then(() => getTags())
  };

  return (
    <>
      <h1>Tag List</h1>
      <div className="container">
        <div className="row justifty-content-center">
          {tags.map((tag) => (
            <TagCard tag={tag} key={tag.id} callDeleteTag={callDeleteTag}/>
          ))}
        </div>
      </div>
      <button type="button" className="btn btn-primary" onClick={() => {navigate("/tag/add")}}>Create Tag</button>
    </>
  )
}
