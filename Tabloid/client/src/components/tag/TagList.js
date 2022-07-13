import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
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
    <div className="user-display">
      
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

