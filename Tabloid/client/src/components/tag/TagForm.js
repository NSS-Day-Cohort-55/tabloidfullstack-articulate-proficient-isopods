import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { getAllTags, addTag } from "../../modules/tagManager";


export const TagForm = () => {

  const navigate = useNavigate();

  const [tag, setTag] = useState({
    name:""
  })

  const [currentTags, setCurrentTags] = useState({})

  const getCurrentTags = () => {
    getAllTags().then((response) => setCurrentTags(response));
  };

  useEffect(() => {
    getCurrentTags();
  }, []);

  const handleControlledInputChange = (event) => {
		//Create a copy of the hideout array
		const newTag = { ...tag }
		//target the value of the input field
		let selectedVal = event.target.value
		//Change the property of the input field to a new value
		newTag[event.target.id] = selectedVal
		// update state
		setTag(newTag)
	}

  const ClickAddTag = (event) => {
    event.preventDefault()

    const tagName = tag.name

    let newTag = { ...tag }

    const isTag = (currentTags.find(tag => tag.name === tagName))

    if (tagName === "") {
      window.alert("Please input a name for your tag")

    } else if (isTag != undefined) {
      window.alert("You already have a Hideout by this name")

    } else {
      addTag(newTag)
        .then(() => navigate("/tag"))
    }
  }

	const ClickCancel = (event) => {
		navigate("/tag")
	}

  return (
    <main>
      <h1>Create a Tag</h1>
      <div className="container">
      <fieldset>
					<div>
						<label htmlFor="name">New Tag:</label>
						<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Tag Name" value={tag.name} />
					</div>
				</fieldset>
      </div>

      <div className="buttons">
					<button type="button" className="btn btn-primary"
						onClick={ClickAddTag}>
						Create Tag
					</button>
					<button type="button" className="btn btn-primary"
						onClick={ClickCancel}>
						Cancel
					</button>
				</div>
    </main>

  )

}