import React, { useState, useEffect } from 'react';
import { getCurrentUser, updateUserInfo } from '../services/api';

const UserSettings = () => {
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getCurrentUser();
                setUser(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserInfo({ name, email });
            alert('User information updated successfully.');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>User Info Update</h2>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type="submit">Update</button>
        </form>
    );
};

export default UserSettings;
