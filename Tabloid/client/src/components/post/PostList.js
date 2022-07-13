import React, { useEffect, useState } from "react";
import {Post} from "./Post.js"
import {getAllPosts} from "./PostManager.js"


export const PostList = () =>{
    const [posts, updatePosts] = useState([])


    useEffect(()=>{
        getAllPosts()
            .then(res => updatePosts(res))
    },[])

    return(
        
        <section className="post-container-section">
            <h2>Posts</h2>
            <div className="row justify-content-center">
            {posts.map(res => (
               res.CreateDateTime > Date.now ? "" : <Post post={res} key={res.Id}/>
            ))}
            </div>
        </section>

    

    )
}
