import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";


function AddTaskCalendrier({ date, tasks, setTasks, onClose }) {
  const [show, setShow] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState(""); // Initialiser sans valeur pour calculer ensuite la date -1
  const [etat, setEtat] = useState(false);

  useEffect(() => {
    // Calculer la date -1 lorsque le composant se monte
    const selectedDate = new Date(date); // Créer un objet Date basé sur la date passée
    selectedDate.setDate(selectedDate.getDate() + 1); // Soustraire un jour
    const formattedDate = selectedDate.toISOString().split("T")[0]; // Formater la date en YYYY-MM-DD
    setNewDate(formattedDate); // Mettre à jour l'état avec la date -1
  }, [date]);

  const handleClose = () => {
    setShow(false);
    onClose(); // Appelle la fonction onClose pour réinitialiser selectedDate dans Calendrier
  };

  const add_task = () => {
    if (newTask.trim() && newDate.trim()) {
      const newTaskObj = {id:Math.floor(Math.random() * 1000000), task: newTask, date: newDate, etat };
      const updatedTasks = [...tasks, newTaskObj];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  
      handleClose();
      
      toast.success('Task Added successfully!');
    }
    
  };
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formTask">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
             
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={newDate} // Utiliser la date -1
              onChange={(e) => setNewDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning"  onClick={add_task}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTaskCalendrier;
