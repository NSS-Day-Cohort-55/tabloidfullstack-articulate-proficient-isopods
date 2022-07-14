import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useParams } from "react-router-dom"

export const Post = ({post}) =>{

    const [postById, updatePost] = useState({})
    const {postId} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        
    }, [])

    return (
            <Card >
                <h3>{post.title}</h3>
                <CardBody onClick={() => navigate(`${post.id}/PostDetails`)}>
                    <p>{post.profile.displayName}</p>
                    <p>{post.createDateTime}</p>
                </CardBody>
                <button onClick={()=> navigate(`${post.id}/Edit`)}>Edit</button>
            </Card>


    )
}