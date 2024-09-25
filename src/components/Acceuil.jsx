import React, { useEffect, useState } from 'react';
import Header from './Header';
import Calendrier from './Calendrier';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import AddTask from './AddTask';
import { Link } from 'react-router-dom';

function Acceuil({ visible, setVisible }) {
  const [value, setValue] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);

    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className='acceuil'>
      <Header visible={visible} setVisible={setVisible}/>
     
      <section>
        <figure>
          <div><Calendrier /></div>
          <div className='clock'><Clock value={value} /></div>
        </figure>
        <main><AddTask tasks={tasks} setTasks={setTasks} /></main>
        <nav >
          <Link to="/"><button style={{ backgroundColor: "orange" }}>Add Task</button></Link>
          <br /><br /><br />
          <Link to="/taskcompleted"><button>Task Completed</button></Link>
          <br /><br /><br />
          <Link to="/tasknotcompleted"><button>Task Not Completed</button></Link>
          <br /><br /><br />
          <Link to="/tasktoday"><button>Task Today</button></Link>
        </nav>
      </section>
{visible? <div className="sectionpc">

     <div className='navpc'>     <Link to="/"><button onClick={()=>setVisible(!visible)}>Add Task</button></Link>
          <br /><br /><br />
          <Link to="/taskcompleted"><button onClick={()=>setVisible(!visible)}>Task Completed</button></Link>
          <br /><br /><br />
          <Link to="/tasknotcompleted"><button onClick={()=>setVisible(!visible)}>Task Not Completed</button></Link>
          <br /><br /><br />
          <Link to="/tasktoday"><button onClick={()=>setVisible(!visible)}>Task Today</button></Link>

      </div>
        
       </div> 
        
        : <div className="sectionpc">
        <AddTask tasks={tasks} setTasks={setTasks}/>
      </div>}
     

    </div>
  );
}

export default Acceuil;
