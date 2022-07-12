import React,  { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getAllUsers } from "../../modules/userManager";

export const UserList = () => {
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        getAllUsers().then(res => setUsers(res));
    }

    useEffect(() => {
        getUsers();
    }, []);

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
                        <td>{user.displayName}</td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.userType.name}</td>    
                    </>
                    )}
                </tbody>
            </Table>
        </div>
    )
}