import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { updateTag, getTagById } from "../../modules/tagManager";

export const TagEditForm = () => {

  const [isLoading, setIsLoading] = useState(false);

  const {tagId} = useParams();

  const navigate = useNavigate();

  const [tag, setTag] = useState({ name: "" });

  useEffect(() => {
    getTagById(tagId)
      .then(tag => {
        setTag(tag);
        console.log(tag);
        setIsLoading(false);
      });
  }, []);

  const handleFieldChange = evt => {
    const stateToChange = { ...tag };
    stateToChange[evt.target.id] = evt.target.value;
    setTag(stateToChange);
  };

  const updateExistingTag = evt => {
    evt.preventDefault()
    setIsLoading(true);


    const editedTag = {
      id: tagId,
      name: tag.name,
    };


  updateTag(editedTag)
    .then(() => navigate("/tag")
    )
  }

  const ClickCancel = (event) => {
    navigate("/tag")
  }

  return (
    <>
    <h1>Edit a Tag</h1>
      <fieldset>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Tag name" value={tag.name} />
      </fieldset>
      
      <button disabled={isLoading}
        onClick={updateExistingTag}>
        Update
      </button>

      <button disabled={isLoading}
        onClick={ClickCancel}>
        Cancel
      </button>   
    </>
  )

}