import React,  { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getAllUsers } from "../../modules/userManager";
import { useNavigate, useParams } from "react-router-dom";

export const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const {userId} = useParams();

    const getUsers = () => {
        getAllUsers().then(res => setUsers(res));
    }

    useEffect(() => {
        getUsers();
    }, []);

    const handleNavigate = (id) => {
        navigate(`/UserDetails/${id}`)
    }

    const handleNavigateEdit = (id) => {
        navigate(`/EditUser/${id}`)
    }

    return (
        <div className="user-display">
            <Table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => 
                    <>
                        <tr>
                            <td>{user.displayName}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.userType.name}</td>
                            <td><button onClick={() => handleNavigate(user.id)}>Details</button></td>
                            <td><button onClick={() => handleNavigateEdit(user.id)}>Edit</button></td>
                        </tr>                        
                    </>
                    )}
                </tbody>
            </Table>
        </div>
    )
}