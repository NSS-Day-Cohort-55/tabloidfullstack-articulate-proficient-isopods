import React from "react";
import { useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "reactstrap";
import { addPost } from "../../modules/PostManager";
import { getAllCategories } from "../../modules/categoryManager";
import { getToken } from "../../modules/authManager";

export const PostNew = ({getLoggedInUser}) =>{

    const [post, updatePost] = useState({})
    const [categories, updateCategories] = useState([])
    const navigate = useNavigate();

    getLoggedInUser().then(res => console.log(res))

    useEffect(()=>{
        getAllCategories().then(res => updateCategories(res))
    },[])

    const controlInput = (event) =>{
        let target = {...post}

        target[event.target.id] = event.target.value
        updatePost(target)
    }

    const handleSave = () =>{
        post.createDateTime = Date.now;



        addPost(post).then(navigate("/"))
    }

    return(
        <form>
            <Card className="form-group">
                <label htmlFor="post-title" className="form-check-label">Title</label>
                <input id="title" type="text" required onChange={controlInput} className="form-control"></input>
                <label htmlFor="content">Content</label>
                <textarea id="content" type="textarea" required onChange={controlInput} className="form-control" rows="10"></textarea>
                <label htmlFor="post-image">Image</label>
                <input id="imageLocation" type="text" required onChange={controlInput} className="form-control"></input>
                <select id="Category">
                    <option>Choose a category</option>
                    {categories.map(cat => <option value={cat.id}>{cat?.name}</option>)}
                </select>


                <button className="btn btn-primary" id="submit" required onClick={handleSave}>Submit</button>
            </Card>
        </form>
    )
}