import React, { useEffect, useState } from "react";
import { getAllTags } from "../../modules/tagManager";
import { TagCard } from "./TagCard";

export const TagList = () => {

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
      <div className="container">
        <div className="row justifty-content-center">
          {tags.map((tag) => (
            <TagCard tag={tag} key={tag.id}/>
          ))}
        </div>
      </div>
    </>
  )
}
