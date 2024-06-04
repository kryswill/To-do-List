import React, { useState } from 'react';
import List from './components/List';
import { Container, Col, Modal, Button } from 'react-bootstrap';
import './styles/global.css'
import { Task } from './interfaces/taskInterface'

/**
  * This component renders the application main page.
 * It includes a static list for visualization.

 * Props:
 * - title (string): The title to be displayed in the list.
 * - description (string): The Title descripcion to be displayed when the title is clicked.
 * - completed (boolean): Flag to know if the task is completed or not.

 */

const App: React.FC = () => {

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'AWS', description: 'Study AWS Course', completed: false },
    { id: 2, title: 'Groceries', description: 'Buy groceries', completed: false },
    { id: 3, title: 'Visit the doctor', description: 'Appointment with my doctor', completed: false }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Opens the edit modal and sets the current task for editing
  const openEditModal = (todo: Task) => {
    setCurrentTask(todo);
    setNewTaskTitle(todo.title);
    setNewTaskDescription(todo.description || '');
    setIsEditModalOpen(true);
  };

  // Closes the edit modal and resets the current task and form fields
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentTask(null);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  // Adds a new task
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
  };

  // Edits an existing task
  const editTask = (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentTask) return;

    const updatedTask = {
      ...currentTask,
      title: newTaskTitle,
      description: newTaskDescription,
    };

    setTasks(tasks.map(task => (task.id === currentTask.id ? updatedTask : task)));
    closeEditModal();
  };

  // Deletes a task by its ID
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggle the completion status of a task by its ID
  const completeTask = (id: number) => {
    setTasks(
      tasks.map(toDo =>
        toDo.id === id ? { ...toDo, completed: !toDo.completed } : toDo
      )
    );
  };

  return (
    <div className="bg-info-subtle min-vh-100">
      <Container className="text-center d-flex justify-content-center  p-5">
        <Col sm={8} className="bg-white p-4 rounded shadow">
          <h1 className="my-4">To-Do List</h1>
          {!isExpanded ? (
            <div className='text-center mb-4 clickable' onClick={() => setIsExpanded(true)}>
              Add new task...
            </div>
          ) : (
            <form onSubmit={(e) => { addTask(e); e.preventDefault(); setIsExpanded(false) }}>
              <div className="align-items-center mb-3">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control mb-4"
                />
                <button className="btn btn-primary mb-4" type="submit">Add</button>
              </div>
            </form>
          )}
          <List todo={tasks} onEdit={openEditModal} onDelete={deleteTask} onComplete={completeTask} />

          <Modal show={isEditModalOpen} onHide={closeEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit To-Do</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={editTask}>
                <div className="form-group">
                  <label htmlFor="editTodoTitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTodoTitle"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                  />
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="editTodoDescription">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTodoDescription"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                  />
                </div>
                <div className='d-flex justify-content-end'>
                  <Button className="mt-4" variant="primary" type="submit">
                    Save
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </Col>
      </Container>
    </div>
  );
};

export default App;
