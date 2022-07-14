import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getAllTags, deleteTag, getTagsByName } from "../../modules/tagManager";
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

  const CallSearchTags = () => {
  
  const name = document.getElementById('name').value

  if (name != "") {
    getTagsByName(name).then((response) => setTags(response));
    document.getElementById('name').value = ""
  }

  else {
    window.alert("You already have a Hideout by this name")
  }
  };

  const CallReset = () => {
    getTags()
    };



  return (
    <div className="user-display">
      <fieldset>
						<label htmlFor="name">Search Tags:</label>
						<input type="text" id="name" className="form-control"/>
				</fieldset>
      <button
						onClick={CallSearchTags}>
						Search
			</button>
      <button
						onClick={CallReset}>
						Reset
			</button>
        <Table>
            <thead>
                <tr>
                    <th>Tag Name</th>
                </tr>
            </thead>
            <tbody>
                {tags.map(tag => 
                <>
                    <tr>
                        <td>{tag.name}</td>
                        
                        <td>
                        <button onClick={() => {navigate(`/tag/${tag.id}/edit`)}}>Edit Tag</button> 
                        </td>

                        <td>
                        <button onClick={() => callDeleteTag(tag.id)}>Delete Tag</button>
                        </td>
                    </tr>                        
                </>
                )}
            </tbody>
        </Table>
        <button onClick={() => {navigate("/tag/add")}}>Create Tag</button>
    </div>
)
}

