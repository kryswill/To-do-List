import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/global.css'
import { ListProps } from '../interfaces/taskInterface'

/**
  * This component has the list of the elements.
 
 * Props:
 * - title (string): The title to be displayed in the list.
 * - description (string): The Title descripcion to be displayed when the title is clicked.
 * - completed (boolean): Flag to know if the task is completed or not.

 */

const TodoList: React.FC<ListProps> = ({ todo: task, onEdit, onDelete, onComplete }) => {
    // State to manage the visibility of task descriptions
    const [showDescriptions, setShowDescriptions] = useState<{ [key: number]: boolean }>({});

    // Function to toggle the visibility of a task's description
    const handleDescriptionToggle = (id: number) => {
        setShowDescriptions((prevDescriptions) => ({
            ...prevDescriptions,
            [id]: !prevDescriptions[id],
        }));
    };

    return (
        <ul className="list-group ">
            {task.map((todo) => (
                <div key={todo.id}>
                    <li
                        className="list-group-item d-flex justify-content-between align-items-center clickable"
                        onClick={() => handleDescriptionToggle(todo.id)} // Toggle description on click
                    >
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`todoCheckbox-${todo.id}`}
                                checked={todo.completed}
                                onChange={() => onComplete(todo.id)}
                                onClick={(e) => e.stopPropagation()} // Prevents toggling description when checkbox is clicked
                            />
                        </div>
                        <div className="todo-info ">
                            <span
                                className={`font-weight-bold fs-5 ${todo.completed ? 'text-decoration-line-through fw-bold' : ''
                                    }`}
                            >
                                {todo.title}
                            </span>

                            {showDescriptions[todo.id] && todo.description && (
                                <div>
                                    <p className="text-muted ">{todo.description}</p>
                                    <button className="btn btn-sm btn-primary" onClick={(e) => { e.stopPropagation(); onEdit(todo); }}>
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                </div>
                            )}
                        </div>

                        <button className="btn btn-sm btn-danger mr-5 pr-5" onClick={(e) => { e.stopPropagation(); onDelete(todo.id); }}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                    </li>
                    <br />
                </div>
            ))}
        </ul>
    );
};

export default TodoList;
