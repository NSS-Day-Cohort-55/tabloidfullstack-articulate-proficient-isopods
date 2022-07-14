
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Alert} from "reactstrap";
import { changeUserType, getUserById } from "../../modules/userManager";

export const UpdateUser = () => {
    const [selectedUser, setSelectedUser] = useState({});
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();
    const {userId} = useParams();

    const generateAlert = (id) => {  
        let alertText = ""      
        if(id == 1){
            alertText = "Change User from Admin to Author?"
        }
        else {
            alertText = "Change User from Author to Admin?"
        }
    }

    const alertArr = [
        <div className="alert">
            <Alert color="warning">
                {generateAlert(selectedUser.userType.id)}
            </Alert>
        </div>,
        ""
    ]

    const handleUpdateUserType = () => {
        const newUser = {...selectedUser}
        if(newUser.userType.id == 1){
            let changeUser = {
                Id : newUser.id,
                firebaseUserId : newUser.firebaseUserId,
                firstName : newUser.firstName,
                lastName : newUser.lastName,
                displayName : newUser.displayName,
                email : newUser.email,
                createDateTime : newUser.createDateTime,
                imageLocation : newUser.imageLocation,
                userTypeId : 2,
                userType : {
                    id : 2,
                    name : "Author"
                },
                fullName : newUser.fullName
            } 
            changeUserType(changeUser)           
        } else {
            let changeUser = {
                Id : newUser.id,
                firebaseUserId : newUser.firebaseUserId,
                firstName : newUser.firstName,
                lastName : newUser.lastName,
                displayName : newUser.displayName,
                email : newUser.email,
                createDateTime : newUser.createDateTime,
                imageLocation : newUser.imageLocation,
                userTypeId : 1,
                userType : {
                    id : 1,
                    name : "Admin"
                },
                fullName : newUser.fullName
            }   
            changeUserType(changeUser)
        }
    }

    useEffect(() => {
        getUserById(userId)
            .then(res => setSelectedUser(res))
        
    }, [])

    return (
        <div className="update-user">
            <Card>
                <CardBody>
                    <CardTitle>{selectedUser.firstName} {selectedUser.lastName}</CardTitle>
                    <CardSubtitle>{selectedUser.displayName}</CardSubtitle>
                    <CardText>User Type: {selectedUser.userType.name}</CardText>
                    <Button onClick={() => {setIsClicked(true)}}>Change</Button>
                    {isClicked ? alertArr[0] : alertArr[1]}
                </CardBody>
            </Card>
        </div>
    )
}