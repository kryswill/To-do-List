import React, { useState } from 'react';
import List from './List';
import { Task } from '../interfaces/taskInterface'

/**
  * This component is used to add and edit tasks to the to-do list.
 */

const App: React.FC = () => {
    // Manages the list of task
    const [tasks, setTasks] = useState<Task[]>([]);

    const editTask = (editedTodo: Task) => {
        setTasks(tasks.map(todo => (todo.id === editedTodo.id ? editedTodo : todo)));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(todo => todo.id !== id));
    };

    const completeTask = (id: number) => {
        setTasks(
            tasks.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div className="container">
            <h1 className="my-4">Task List</h1>
            <List todo={tasks} onEdit={editTask} onDelete={deleteTask} onComplete={completeTask} /> {/* List component to display task */}
        </div>
    );
};

export default App;
