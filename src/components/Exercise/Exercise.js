import React, { useState } from 'react';
import Task from '../Task/Task';
import './Exercise.css';
import Timer from '../Timer/Timer';

function Exercise() {

    const [name, setName] = useState('');
    const [time, setTime] = useState('');
    const [exerciseList, setExerciseList] = useState([]);
    const [displayTimer, setDisplayTimer] = useState(false);
    const [breakTime, setBreakTime] = useState('');

    const addExercies = (e) => {
        e.preventDefault();
        if (name === '' || time === '') return;
        setExerciseList((arr) => {
            const exercise = {
                name,
                time,
            };
            setName('');
            setTime('');

            const insertBreak = breakTime && breakTime !== '';
            if (arr.length > 0 && insertBreak) {
                const breakObj = {name: 'Break', time: breakTime}
                return [...arr, breakObj, exercise]
            } else {
                return [...arr, exercise]
            }
        });
    }

    const startExercise = () => {
        if (exerciseList.length > 0) {
            setDisplayTimer(true)
        }
    }

    const setFieldValue = e => {
        const targetVal = e.target.value;
        const targetName = e.target.name;
        const isNumeric = new RegExp('^[0-9]+$').test(targetVal);
        let setVal;
        if (isNumeric) {
            const number = parseInt(targetVal, 10);
            setVal = number <= 3600 ? true : false; // Just to be sure that users are not able to enter large numbers of seconds
        }
        if (setVal || targetVal === '') {
            switch (targetName) {
                case 'break':
                    setBreakTime(targetVal);
                    break;
                case 'time':
                    setTime(targetVal);
                    break;
                default:
                    break;
            }
        }
    }
    return (
        <div className="exercise">
            <div className="exercise__header">
                Workout App
            </div>
            <div className="exercise__form">
                <form>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="exercise__name"
                        placeholder="Enter Exercise Name (Required)"
                        key="name"
                        />
                    <input
                        value={time}
                        onChange={setFieldValue}
                        placeholder="Enter Time in Seconds (Required)"
                        key="time"
                        name="time"
                        />
                    <input
                        value={breakTime}
                        onChange={setFieldValue}
                        className="break__time"
                        placeholder="Enter Break Time in Seconds (Optional)"
                        key="break"
                        name="break"
                        />
                    <button
                        className="exercise__add"
                        onClick={addExercies}
                        type="submit"
                        key="add"
                        disabled={name === '' || time === ''}
                    >
                        Add Exercise to List
                    </button>
                </form>
                <button
                    className="exercise__start"
                    onClick={startExercise}
                    key="start"
                    disabled={exerciseList.length === 0}
                >
                    Click to start Exercise
                </button>
            </div>
            <div className="exercise__list">
                {
                    exerciseList.map((exercise, idx) => {
                        return <Task
                            key={idx}
                            index={idx}
                            name={exercise.name}
                            seconds={exercise.time}
                            exerciseList={exerciseList}
                            setExerciseList={setExerciseList}
                        />
                    })
                }
            </div>
            <div className="exercise__timer">
                <Timer
                    displayTimer={displayTimer}
                    setDisplayTimer={setDisplayTimer}
                    exerciseList={exerciseList}
                />
            </div>
        </div>
    )
}

export default Exercise
