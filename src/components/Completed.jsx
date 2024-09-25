import React from 'react';
import { MdDelete } from 'react-icons/md';
import UpdateTask from './UpdateTask';
import { Card } from 'react-bootstrap';
import Calendrier from './Calendrier';
import { toast } from 'react-toastify'; // Assurez-vous que react-toastify est importé

function Completed({ tasks, setTasks }) {
  // Filtrer les tâches complétées
  const completedTasks = tasks.filter(task => task.etat === true);

  // Fonction pour supprimer une tâche
  const removeTask = (id) => {
    const newTasks = tasks.filter(e => e.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
   
    toast.success('Task removed successfully!');
  };

  

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Tasks Completed</h2><br />
      {completedTasks.length === 0 ? (
        <>
          <h4>Votre liste de tâches est vide. Commencez à ajouter vos objectifs !</h4><br />
          <div className='cal'><Calendrier /></div>
        </>
      ) : (
        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {completedTasks.map((task, index) => (
            <Card style={{ width: "18rem" }} key={task.id}>
              <Card.Header>
                {task.date}
                <MdDelete
                  style={{ color: "red", fontSize: "20px", cursor: "pointer", float: "right" }}
                  onClick={() => removeTask(task.id)}
                />
                {/* Passer l'index et la fonction de mise à jour à UpdateTask */}
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

export default Completed;
