import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTags } from "../../modules/tagManager";
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

  return (
    <>
      <h1>Hideout List</h1>
      <div className="container">
        <div className="row justifty-content-center">
          {tags.map((tag) => (
            <TagCard tag={tag} key={tag.id}/>
          ))}
        </div>
      </div>
      <button type="button" className="btn btn-primary" onClick={() => {navigate("/tag/add")}}>Create Tag</button>
    </>
  )
}
