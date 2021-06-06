import React, { useContext } from 'react';
import './Task.css';
import TimerContext from '../../TimerContext.js';
function Task(props) {
    const {
        name,
        seconds,
        index,
    } = props;
    const context = useContext(TimerContext);
    const {
        exerciseList,
        setExerciseList,
    } = context
    const removeTask = () => {
        const lastIndex = exerciseList.length - 1;
        const updatedList = [];
        for (let i = 0; i < exerciseList.length; i++) {
            if (exerciseList.length > 1) {
                if (index !== lastIndex) {
                    const nextTask = exerciseList[index + 1].name;
                    const skipCondition = nextTask === 'Break'
                                            ? i !== index + 1 && i !== index
                                            : i !== index;
                    if (skipCondition) {
                        updatedList.push(exerciseList[i])
                    }
                }
                if (index === lastIndex) {
                    const previousTask = exerciseList[index - 1].name;
                    const skipCondition = previousTask === 'Break'
                                            ? i !== index - 1 && i !== index
                                            : i !== index;
                    if (skipCondition) {
                        updatedList.push(exerciseList[i])
                    }
                }
            }
        }
        setExerciseList(updatedList)
    }
    return (
            <div className="task">
                <div className="task__Info">
                    <p className="task__text">
                        <span className="task__index">{index + 1}.</span> <b>{name}</b> for <b>{seconds}</b> seconds
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
