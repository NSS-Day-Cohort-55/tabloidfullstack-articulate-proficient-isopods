import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../modules/userManager";
import { UserCard } from "./UserCard";


export const UserDetails = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate();
    const {userId} = useParams();

    const getUser = (id) => {
        getUserById(id)
            .then(res => setUser(res));
    }

    useEffect(() => {
        getUser(userId);
    }, []);

    return (
        <div className="user-container">
            <UserCard user={user}/>
        </div>
    )
}