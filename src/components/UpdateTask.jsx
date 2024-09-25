import { useState, useEffect } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { MdSystemUpdateAlt } from "react-icons/md";
import { toast } from 'react-toastify';

function UpdateTask({ task, index }) {
  const [show, setShow] = useState(false);
  const [newTask, setNewTask] = useState(task.task);
  const [newDate, setNewDate] = useState(task.date);
  const [etat, setEtat] = useState(task.etat);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index] = { task: newTask, date: newDate, etat }; // Met à jour la tâche
    localStorage.setItem('tasks', JSON.stringify(tasks));
    handleClose(); // Fermer le modal après la sauvegarde
  
    toast.success('Task updating successfully!');

  };

  useEffect(() => {
    // Pour initialiser les champs avec les valeurs actuelles
    setNewTask(task.task);
    setNewDate(task.date);
    setEtat(task.etat); // S'assurer que l'état est également initialisé
  }, [task]);

  return (
    <>
      <MdSystemUpdateAlt 
        style={{ color: "black", fontSize: "20px", cursor: "pointer", float: "right", marginRight: "30px" }} 
        onClick={handleShow} 
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTask">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
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
          </Form>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ButtonGroup className="mb-2">
              <ToggleButton
                id="toggle-check"
                type="checkbox"
                variant={etat ? "success" : "outline-success"} // Vert si `etat` est vrai, sinon transparent
                value="1"
                checked={etat} // État visuel du bouton basé sur `etat`
                onClick={() => setEtat(!etat)} // Toggle l'état
              >
                Task Completed
              </ToggleButton>
            </ButtonGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateTask;
