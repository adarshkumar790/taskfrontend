import React, { useState } from 'react';
import { createTask } from '../services/api';
import mongoose from 'mongoose';
import UserSelect from '../components/UserSelect';
import '../styles/CreateTask.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('medium');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [checklist, setChecklist] = useState('');
    const [assignedTo, setAssignedTo] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (assignedTo && !mongoose.Types.ObjectId.isValid(assignedTo)) {
            toast.error('Invalid User ID'); // Toastify error notification
            return;
        }

        const taskData = {
            title,
            priority: priority.toLowerCase(),
            dueDate,
            category,
            checklist: checklist.split(',').map(item => item.trim()),
            assignedTo: assignedTo || null,
        };

        try {
            const response = await createTask(taskData);
            console.log('Task created:', response.data);
            toast.success('Task created successfully!'); // Toastify success notification
            setTitle('');
            setPriority('medium');
            setDueDate('');
            setCategory('');
            setChecklist('');
            setAssignedTo('');
        } catch (error) {
            console.error('Error creating task:', error.response ? error.response.data : error.message);
            toast.error('Failed to create task. Please try again.'); // Toastify error notification
        }
    };

    return (
        <div>
            <h1>Create Task</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Priority:</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div>
                    <label>Due Date:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Checklist (comma-separated):</label>
                    <input
                        type="text"
                        value={checklist}
                        onChange={(e) => setChecklist(e.target.value)}
                    />
                </div>
                <div>
                    <label>Assign To:</label>
                    <UserSelect onUserSelect={setAssignedTo} />
                </div>
                <button type="submit">Create Task</button>
            </form>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default CreateTask;
