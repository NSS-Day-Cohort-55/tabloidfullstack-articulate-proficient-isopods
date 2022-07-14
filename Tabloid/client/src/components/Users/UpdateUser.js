
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Alert} from "reactstrap";
import { changeUserType, getUserById } from "../../modules/userManager";

export const UpdateUser = ({getLoggedInUser}) => {
    const [selectedUser, setSelectedUser] = useState({});
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();
    const {userId} = useParams();
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        getLoggedInUser()
            .then(res => setCurrentUser(res))
            
    }, [])

    useEffect(() => {
        getUserById(userId)
            .then(res => {
                //TODO Fix this you dunce
                if(currentUser.userTypeId == 1){
                    setSelectedUser(res)
                } else if (currentUser.id == res.id){
                    return "Can't change your own status. Shoo."
                }                
                else{
                    return "Not an admin. Go away."
                }
            })
        
    }, [currentUser])

    const generateAlert = (id) => {  
        let alertText = ""      
        if(id == 1){
            alertText = "Change User from Admin to Author?"
        }
        else {
            alertText = "Change User from Author to Admin?"
        }
        return alertText
    }

    const alertArr = [
        <div className="alert">
            <Alert color="warning">
                {generateAlert(selectedUser.userTypeId)}
            </Alert>
            <Button color="primary" onClick={()=> {handleUpdateUserType()}}>Yes</Button>
            <Button color="secondary" onClick={() => {setIsClicked(false)}}>Cancel</Button>
        </div>,
        ""
    ]

    const handleUpdateUserType = () => {
        const newUser = {...selectedUser}
        if(newUser.userType.id == 1){
            let changeUser = {
                id : newUser.id,
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
            getUserById(changeUser.id).then(res => setSelectedUser(res))
            setIsClicked(false)           
        } else {
            let changeUser = {
                id : newUser.id,
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
            getUserById(changeUser.id).then(res => setSelectedUser(res))
            setIsClicked(false) 
        }
    }

    

    return (
        <div className="update-user">
            <Card>
                <CardBody>
                    <CardTitle>{selectedUser.firstName} {selectedUser.lastName}</CardTitle>
                    <CardSubtitle>{selectedUser.displayName}</CardSubtitle>
                    <CardText>User Type: {selectedUser.userType?.name}</CardText>
                    <Button onClick={() => {setIsClicked(true)}}>Change</Button>
                    {isClicked ? alertArr[0] : alertArr[1]}
                </CardBody>
            </Card>
            <Button color="danger" onClick={()=> navigate("/users")}>Back</Button>
        </div>
    )
}