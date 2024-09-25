import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import UpdateTask from './UpdateTask';
import Calendrier from './Calendrier';
import { toast } from 'react-toastify';

function NotCompleted() {
  const [tasks, setTasks] = useState([]);

  // Récupérer les tâches depuis le localStorage au chargement
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Filtrer les tâches non complétées
  const notCompletedTasks = tasks.filter(task => task.etat === false);

  // Fonction pour supprimer une tâche
  const removeTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    toast.success('Task removed successfully!');
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Tasks Not Completed</h2><br />
      {notCompletedTasks.length === 0 ? (
        <>
          <h4>Votre liste de tâches est vide. Commencez à ajouter vos objectifs !</h4><br/>
          <div className='cal'><Calendrier /></div>
        </>
      ) : (
        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {notCompletedTasks.map((task, index) => (
            <Card style={{ width: "18rem" }} key={task.id}>
              <Card.Header>
                {task.date}
                <MdDelete
                  style={{ color: "red", fontSize: "20px", cursor: "pointer", float: "right" }}
                  onClick={() => removeTask(task.id)}
                />
                <UpdateTask task={task} index={index} />
              </Card.Header>
              <Card.Body>
                <Card.Text style={{ overflowY: "scroll", height: "100px" }}>
                  {task.task}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotCompleted;
