import React from "react";
import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "reactstrap";
import { useParams } from "react-router-dom"
import { getPostById, editPost } from "../../modules/PostManager";


export const PostEdit = ()=>{

    const [post, updatePost] = useState({})
    const navigate = useNavigate();

    const{postId} = useParams()

    useEffect(()=>{
        getPostById(postId).then(res => updatePost(res))
    },[])

    const controlInput = (event) =>{
        let target = {...post}

        target[event.target.id] = event.target.value
        updatePost(target)
    }

    const handleEdit = () =>{
        editPost(post).then(navigate("/"))
    }



    return(

        <form>
            <Card className="form-group">
                <label htmlFor="post-date">Date</label>
                <input id="createDateTime" type="text" required onChange={controlInput} value={post.createDateTime} className="form-control"></input>
                <label htmlFor="post-image">Image</label>
                <input id="imageLocation" type="text" required onChange={controlInput} value={post.imageLocation} className="form-control"></input>
                <label htmlFor="post-title" className="form-check-label">Title</label>
                <input id="title" type="text" required onChange={controlInput} value={post.title} className="form-control"></input>
                <label htmlFor="content">Content</label>
                <textarea id="content" type="textarea" required onChange={controlInput} value={post.content} className="form-control" rows="10"></textarea>
                <button className="btn btn-primary" id="submit" required onClick={handleEdit}>Submit</button>
            </Card>
        </form>
    )
}