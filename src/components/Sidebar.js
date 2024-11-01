import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <h3>Dashboard</h3>
            </div>
            <Link to="/">Task List</Link>
            {isAuthenticated && (
                <Link to="/create-task">Create Task</Link>
            )}
            <div className="sidebar-bottom">
                {isAuthenticated && (
                    <Link to="/settings">Settings</Link>
                )}
                {isAuthenticated ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to="/register">Register</Link>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
