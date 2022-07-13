import React from "react";
import { Card, CardBody, CardTitle} from "reactstrap";

export const UserCard = ({user}) => {
    const creationDate = user.createDateTime
    let splitDate = ""
    if(!creationDate){
        splitDate = "unknown"
    }
    else
    {
        splitDate = creationDate.split("T")[0]
    }
    console.log(creationDate)
    console.log(splitDate)
    return (
        <Card>
            <CardTitle>{user.firstName} {user.lastName}</CardTitle>
            <CardBody>
                <p>Username: {user.displayName}</p>
                <p>Email: {user.email}</p>
                <p>Member Since {splitDate}</p>
                <p>{user.userType?.name}</p>
            </CardBody>
        </Card>
    )
}