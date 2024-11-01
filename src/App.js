import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import CreateTask from './pages/CreateTask';
import './App.css';
import UpdateTask from './pages/UpdateTask';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check localStorage for existing token on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <div className="app-container">
                <div className="main-content">
                    <Sidebar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                    <div className="page-content">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                            <Route path="/create-task" element={isAuthenticated ? <CreateTask /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                            <Route path="/tasks/update/:taskId" element={<UpdateTask />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
