import React from 'react';
import './Task.css';
function Task(props) {
    const {
        name,
        seconds,
        exerciseList,
        index,
        setExerciseList,
    } = props;
    const removeTask = (e) => {
        const lastIndex = exerciseList.length - 1;
        const updatedList = [];
        for (let i = 0; i < exerciseList.length; i++) {
            if (exerciseList.length > 1) {
                if (index !== lastIndex) {
                    const nextTask = exerciseList[index + 1].name;
                    const condition = nextTask === 'Break'
                        ? i !== index + 1 && i !== index
                        : i !== index;
                    if (condition) {
                        updatedList.push(exerciseList[i])
                    }
                }
                if (index === lastIndex) {
                    const previousTask = exerciseList[index - 1].name;
                    const condition = previousTask === 'Break'
                        ? i !== index - 1 && i !== index
                        : i !== index;
                    if (condition) {
                        updatedList.push(exerciseList[i])
                    }
                }
            }
        }
        setExerciseList((arr) => updatedList)
    }
    return (
        <div className="task">
            <div className="task__Info">
                <p className="task__text">
                    {index + 1}.   <b>{name}</b> for <b>{seconds}</b> seconds
                </p>
                {
                    name !== 'Break' 
                    && <button
                            className="task__remove"
                            onClick={removeTask}
                        >
                            Remove
                    </button>}
            </div>
        </div>
    )
}

export default Task;
