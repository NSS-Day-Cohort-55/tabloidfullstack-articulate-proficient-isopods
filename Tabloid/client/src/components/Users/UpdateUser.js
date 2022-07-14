
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Alert} from "reactstrap";
import { changeUserType } from "../../modules/userManager";

export const UpdateUser = ({user}) => {
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
        let newUser = {...selectedUser}
        if(newUser.userType.id == 1){
            
        }
    }

    useEffect(() => {
        setSelectedUser(user);
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