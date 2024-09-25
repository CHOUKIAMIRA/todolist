import { Route, Routes } from 'react-router-dom';
import './App.css';
import Acceuil from './components/Acceuil';
import TaskCompleted from './components/TaskCompleted'; // Assurez-vous que ce chemin est correct
import TaskNotCompleted from './components/TaskNotCompleted'; // Assurez-vous que ce chemin est correct
import TaskToDay from './components/TaskToDay';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Acceuil visible={visible} setVisible={setVisible} />} />
        <Route path="/taskcompleted" element={<TaskCompleted visible={visible} setVisible={setVisible} />} />
        <Route path="/tasknotcompleted" element={<TaskNotCompleted visible={visible} setVisible={setVisible} />} />
        <Route path="/tasktoday" element={<TaskToDay visible={visible} setVisible={setVisible} />} />
      </Routes>
      <ToastContainer 
        position='bottom-left' 
        autoClose={3000} 
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;
