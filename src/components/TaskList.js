import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, getCurrentUser } from '../services/api';
import TaskItem from './TaskItem';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); 

    useEffect(() => {
        const fetchTasksAndUser = async () => {
            try {
                
                const tasksResponse = await getTasks();
                setTasks(tasksResponse.data);

                
                const userResponse = await getCurrentUser();
                setCurrentUser(userResponse.data._id); 
            } catch (error) {
                console.error('Error fetching tasks or user:', error);
            }
        };

        fetchTasksAndUser();
    }, []);

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task._id !== taskId)); 
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div>
            <h2>Your Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        onDelete={handleDeleteTask}
                        currentUser={currentUser} 
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
