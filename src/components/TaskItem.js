import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/TaskItem.css';

const TaskItem = ({ task, onDelete, currentUser }) => {
    const navigate = useNavigate();

    const handleEditClick = () => {
        if (currentUser === task.assignedTo) {
            navigate(`/tasks/update/${task._id}`); 
            toast.success("Navigating to edit task");
        } else {
            toast.error("You are not authorized to edit this task.");
        }
    };

    const handleDeleteClick = () => {
        onDelete(task._id);
        toast.info("Task deleted successfully");
    };

    return (
        <li>
            <span className="task-title">Title: {task.title}</span>
            <span className="task-due-date">Date: {task.dueDate}</span>
            <span className="task-status">Status: {task.status}</span>
            <div className="task-checklist">Task: {task.checklist}</div>
            <span className="task-priority">Priority: {task.priority}</span>
            
            <button className="edit-btn" onClick={handleEditClick}>Edit</button>
            <button className="delete-btn" onClick={handleDeleteClick}>Delete</button>

            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </li>
    );
};

export default TaskItem;
