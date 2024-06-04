import React from 'react';
import { Props } from '../interfaces/taskInterface'

/**
  * This component renders the elements of the to-do list.
 
 * Props:
 * - title (string): The title to be displayed in the list.
 * - description (string): The Title descripcion to be displayed when the title is clicked.
 * - completed (boolean): Flag to know if the task is completed or not.

 */


const TodoItem: React.FC<Props> = ({ todo: task, onEdit, onDelete, onComplete }) => {
    return (
        <div className={`list-group-item ${task.completed ? 'completed' : ''}`}>
            <h5 className="mb-1">{task.title}</h5>
            <p className="mb-1">{task.description}</p>

            <button className="btn btn-primary mr-2" onClick={() => onComplete(task.id)}>Complete</button>
            <button className="btn btn-secondary mr-2" onClick={() => onEdit(task)}>Edit</button>
            <button className="btn btn-danger" onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    );
};

export default TodoItem;
