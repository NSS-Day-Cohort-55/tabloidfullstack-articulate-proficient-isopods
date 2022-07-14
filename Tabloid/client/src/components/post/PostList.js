import React, { useEffect, useState } from "react";
import {Post} from "./Post.js"
import {getAllPosts} from "../../modules/PostManager.js"
import { useNavigate } from "react-router-dom";


export const PostList = () =>{
    const [posts, updatePosts] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getAllPosts()
            .then(res => updatePosts(res))
    },[])

    return(
        
        <section className="post-container-section">
            <h2>Posts</h2>
            <button className="btn btn-primary" onClick={()=> navigate("new_post")}>New Post</button>
            <div className="row justify-content-center">
            {posts.map(res => (
               res.CreateDateTime > Date.now ? "" : <Post post={res} key={res.Id}/>
            ))}
            </div>
        </section>

    

    )
}
