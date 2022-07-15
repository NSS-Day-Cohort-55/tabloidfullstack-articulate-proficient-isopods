
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Alert} from "reactstrap";
import { changeUserType, getUserById } from "../../modules/userManager";

export const UpdateUser = ({getLoggedInUser}) => {
    const [selectedUser, setSelectedUser] = useState({});
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();
    const {userId} = useParams();
    const [currentUser, setCurrentUser] = useState({});
    const [isSelf, setIsSelf] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);

    useEffect(() => {
        getLoggedInUser()
            .then(res => setCurrentUser(res))
            
    }, [])

    useEffect(() => {
        getUserById(userId)
            .then(res => {
                
                setSelectedUser(res)
            })
        
    }, [currentUser])

    const verifyUser = (userObj) => {
        if(userObj.userTypeId != 1){
            setIsAuthor(true)
        } else if (currentUser.id == selectedUser.id){
            setIsSelf(true)
        } else {
            setIsClicked(true)
        }
    }

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
        "",
        <div className="alert">
            <Alert color="danger">
                You are not an Admin
            </Alert>
        </div>,
        <div className="alert">
            <Alert color="danger">
                Cannot change your own profile type. Shoo.
            </Alert>
        </div>

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
                    <Button onClick={() => {verifyUser(currentUser)}}>Change</Button>
                    {isClicked ? alertArr[0] : alertArr[1]}
                    {isAuthor ? alertArr[2] : ""}
                    {isSelf ? alertArr[3]: ""}
                </CardBody>
            </Card>
            <Button color="danger" onClick={()=> navigate("/users")}>Back</Button>
        </div>
    )
}