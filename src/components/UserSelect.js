import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/api'; 

const UserSelect = ({ onUserSelect }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                console.log('Users fetched:', response.data);
                if (Array.isArray(response.data)) {
                    setUsers(response.data); 
                    console.log(response.data)
                } else {
                    console.error('Expected an array of users, but received:', response.data);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <select onChange={(e) => onUserSelect(e.target.value)} defaultValue="">
            <option value="" disabled>Select a user</option>
            {users.map(user => (
                <option key={user._id} value={user._id}>{user.name}</option> 
            ))}
        </select>
    );
};

export default UserSelect;
