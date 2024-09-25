import React from 'react';
import { Card } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import UpdateTask from './UpdateTask';
import Calendrier from './Calendrier';
import { toast } from 'react-toastify';

function ToDay({ tasks, setTasks }) {
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0]; // Format YYYY-MM-DD

  // Filtrer les tâches pour ne garder que celles de la date d'aujourd'hui
  const todayTasks = tasks.filter(task => task.date === formattedToday);

  // Fonction pour supprimer une tâche
  const removeTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  
    toast.success('Task remove successfully!');

  };

  

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Tasks for Today</h2><br />
      {todayTasks.length === 0 ? (
        <>
          <h4>Votre liste de tâches est vide. Commencez à ajouter vos objectifs !</h4><br />
          <div className='cal'><Calendrier /></div>
        </>
      ) : (
        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {todayTasks.map((task, index) => (
            <Card style={{ width: "18rem" }} key={task.id}>
              <Card.Header>
                {task.date}
                <MdDelete
                  style={{ color: "red", fontSize: "20px", cursor: "pointer", float: "right" }}
                  onClick={() => removeTask(task.id)}
                />
                {/* Passer la fonction updateTask à UpdateTask */}
                <UpdateTask task={task} index={index} />
              </Card.Header>
              <Card.Body>
                <Card.Text style={{ overflowY: "scroll" }}>
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

export default ToDay;
