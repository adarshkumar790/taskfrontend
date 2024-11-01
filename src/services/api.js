import axios from 'axios';

const API_URL = 'https://taskbackend-sd8t.onrender.com/api'; // Update with your backend URL

// User authentication
export const registerUser = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/auth/login`, userData);
export const getCurrentUser = () => axios.get(`${API_URL}/auth/current`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const getUsers = () => axios.get(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
// Update user information
export const updateUserInfo = (userData) => {
    return axios.put(`${API_URL}/auth/update`, userData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
};


// Task management
export const createTask = (taskData) => {
    return axios.post(`${API_URL}/tasks/create`, taskData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
};

export const getAllUsers = () => axios.get(`${API_URL}/auth/allusers`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
export const getTasks = () => axios.get(`${API_URL}/tasks`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const updateTask = (taskId, taskData) => axios.put(`${API_URL}/tasks/${taskId}`, taskData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const deleteTask = (taskId) => axios.delete(`${API_URL}/tasks/${taskId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
// Fetch a single task by ID
export const getTaskById = (taskId) => {
    return axios.get(`${API_URL}/tasks/${taskId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
};

// // Update a task by ID
// export const updateTask = (taskId, taskData) => {
//     return axios.put(`${API_URL}/tasks/${taskId}`, taskData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
// };
