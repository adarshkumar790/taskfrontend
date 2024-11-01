import React, { useEffect, useState } from 'react';
import { getTaskById, updateTask, getUsers } from '../services/api';
import { useParams, useHistory, useNavigate } from 'react-router-dom';

const UpdateTask = () => {
    const { taskId } = useParams(); // Get taskId from the route parameter
    const navigate = useNavigate();

    const [task, setTask] = useState({
        title: '',
        priority: 'low',
        dueDate: '',
        category: '',
        checklist: '',
        status: '',
        assignedTo: '',
    });

    const [users, setUsers] = useState([]); // List of users for assignment

    useEffect(() => {
        const fetchTaskAndUsers = async () => {
            try {
                // Fetch task details
                const taskResponse = await getTaskById(taskId);
                setTask(taskResponse.data);

                // Fetch list of users for assignment
                const usersResponse = await getUsers();
                setUsers(usersResponse.data);
            } catch (error) {
                console.error('Error fetching task or users:', error);
            }
        };

        fetchTaskAndUsers();
    }, [taskId]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    // Handle task update submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTask(taskId, task);
            alert('Task updated successfully');
            navigate('/dashboard'); // Redirect to the dashboard
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task');
        }
    };

    return (
        <div>
            <h2>Update Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>Priority:</label>
                    <select
                        name="priority"
                        value={task.priority}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div>
                    <label>Due Date:</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={task.category}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label>Checklist:</label>
                    <textarea
                        name="checklist"
                        value={task.checklist}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div>
                    <label>Status:</label>
                    <input
                        type="text"
                        name="status"
                        value={task.status}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label>Assign to:</label>
                    <select
                        name="assignedTo"
                        value={task.assignedTo}
                        onChange={handleInputChange}
                    >
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Update Task</button>
            </form>
        </div>
    );
};

export default UpdateTask;
