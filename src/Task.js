import React from 'react';
import './Task.css';
function Task({name, seconds}) {
    return (
        <div className="task">
            <div className="task__Info">
                <h3>{name}</h3>
                <p>{seconds}</p>
            </div>
        </div>
    )
}

export default Task;
