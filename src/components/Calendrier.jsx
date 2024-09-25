import React, { useState, useEffect } from 'react';
import AddTaskCalendrier from './AddTaskCalendrier';

function Calendrier() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [tasks, setTasks] = useState([]);

    // Récupérer les tâches depuis le localStorage au chargement du composant
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    const monthLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const changeMonth = (delta) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + delta));
        setCurrentDate(newDate);
    };

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const days = Array(daysInMonth).fill(0).map((_, i) => i + 1);
    const emptyDays = Array(firstDayOfMonth).fill(null);

    const handleDateClick = (day) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(clickedDate.toISOString().split('T')[0]); // Met à jour la date sélectionnée
    };

    // Vérifier si une tâche existe pour cette date
    const isTaskOnDate = (day) => {
        const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
        return tasks.some(task => task.date === dateToCheck); // Retourne true si une tâche existe pour cette date
    };

    return (
        <div className="calendrier"  >
            <h2 className="calendar-header">
    <button className='supinf' onClick={() => changeMonth(-1)}>&lt;</button>
    <div className="month-year">
        {monthLabels[currentDate.getMonth()]} <br />
        {currentDate.getFullYear()}
    </div>
    <button className='supinf' onClick={() => changeMonth(1)}>&gt;</button>
</h2>

            <div className="days">
                {weekDays.map((day) => (
                    <div className="day" key={day}>{day}</div>
                ))}
                {emptyDays.map((_, index) => (
                    <div className="day empty" key={index}></div>
                ))}
                {days.map((day) => (
                    <div
                        className="day"
                        key={day}
                        onClick={() => handleDateClick(day)}
                        style={{ backgroundColor: isTaskOnDate(day+1) ? 'red' : '#f9f9f9' }}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Affiche le composant AddTask lorsque selectedDate est défini */}
            {selectedDate && (
    <AddTaskCalendrier
        date={selectedDate}
       // Passe la date sélectionnée
        tasks={tasks}
        setTasks={setTasks}
        onClose={() => setSelectedDate(null)} // Ferme le modal après ajout
    />
)}

        </div>
    );
}

export default Calendrier;
