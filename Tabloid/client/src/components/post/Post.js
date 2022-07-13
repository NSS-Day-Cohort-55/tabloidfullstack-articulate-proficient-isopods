import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

export const Post = ({post}) =>{
    console.log(post)
    return (
        <Card>
            <h3>{post.title}</h3>
            <CardBody>
                <p>{post.UserProfile.FirstName} {post.UserProfile.LastName}</p>
                <p>{post.createDateTime}</p>
            </CardBody>
        </Card>

    )
}