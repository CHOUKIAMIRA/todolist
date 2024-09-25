import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

function AddTask({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [etat, setEtat] = useState(false);

  const add_task = () => {
    const newTaskObj = { id: Math.floor(Math.random() * 1000000), task: newTask, date: newDate, etat };
    const updatedTasks = [...tasks, newTaskObj];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toast.success('Task Added successfully!'); // Mettez ceci ici
   
};


  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add task</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formTask">
          <Form.Label>Task</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </Form.Group>
        <br />
        <button className='b1 b2' variant="warning" onClick={add_task}>
          Add
        </button>
      </Form>
    </div>
  );
}

export default AddTask;
