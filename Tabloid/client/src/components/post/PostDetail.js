import { Card, CardBody, CardTitle } from "reactstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById } from "../../modules/PostManager";

export const PostDetail = () =>{

    const [post, updatePost] = useState({})

    const{postId} = useParams()

    useEffect(()=>{
        getPostById(postId).then(res => updatePost(res))
    },[])

    console.log("post", post)




    return (
        <Card>
        <h3>{post.title}</h3>
        <CardBody>
        {post.imageLocation ? <img src={post.imageLocation}/> : ""}
            <p>{post.content}</p>
            <p>{post.profile?.displayName}</p>
            <p>{post.createDateTime}</p>
        </CardBody>
    </Card>
    )
}