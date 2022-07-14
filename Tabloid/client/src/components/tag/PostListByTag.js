import React, { useEffect, useState } from "react";
import { Post } from "../post/Post.js";
import { useNavigate } from "react-router-dom";
import { getPostByTagName, getAllPosts } from "../../modules/PostManager.js"


export const PostListByTag = () =>{
    
    const navigate = useNavigate()
  
    const [posts, updatePosts] = useState([])

    const CallSearchPostsByTag = () => {
  
      const name = document.getElementById('name').value
    
      if (name != "") {
        getPostByTagName(name).then((response) => updatePosts(response));
        document.getElementById('name').value = ""
      }
    
      else {
        window.alert("Input a Name")
      }
      };

    return(
        
        <section className="post-container-section">
            <button onClick={() => {navigate(`/tag`)}}>Back to Tags</button>
            <fieldset>
						  <label htmlFor="name">Search Tags:</label>
						<   input type="text" id="name" className="form-control"/>
			      </fieldset>
            <button
						  onClick={CallSearchPostsByTag}>
						  Search
			      </button>
            <div className="row justify-content-center">
            {posts.map(res => (
               res.CreateDateTime > Date.now ? "" : <Post post={res} key={res.Id}/>
            ))}
            </div>
        </section>

    

    )
}