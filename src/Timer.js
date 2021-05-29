import React, { useState, useEffect } from 'react';
import './Timer.css';

function Timer(props) {
    const {
        displayTimer,
        setDisplayTimer,
        exerciseList,
    } = props;
    const { name, time } = exerciseList.length > 0 ? exerciseList[0] : ['', '']
    const [task, setTask] = useState(name)
    const [timer, setTimer] = useState(time);


    useEffect(() => {
        if (displayTimer) {
            let timer = 0;
            const lastIdx = exerciseList.length - 1;
            for(let i = 0; i < exerciseList.length; i++) {
                const exTime = parseInt(exerciseList[i].time, 10);
                timer += exTime;
            }
            let currentTimer = parseInt(exerciseList[0].time, 10);
            let curExerIdx = 0;
            let lastMaxSecs = 0;
            for (let i = timer; i >= 0; i--) {
                setTimeout(() => {
                    setTimer(currentTimer--);
                    setTask(exerciseList[curExerIdx].name);
                    console.log('----curExerIdx', curExerIdx)
                    if (currentTimer === -1 && curExerIdx !== lastIdx) {
                            currentTimer = parseInt(exerciseList[curExerIdx + 1].time, 10);
                            curExerIdx++
                    } else if (curExerIdx === lastIdx && lastMaxSecs <= -1) {
                        if (lastMaxSecs === 0) {
                            currentTimer = parseInt(exerciseList[curExerIdx].time);
                            lastMaxSecs = currentTimer;
                        }
                        setTimer(lastMaxSecs--);
                    }

                }, i*1000);
            }
        }
    }, [displayTimer])

    return (displayTimer) ? (
    <div className="timer">
        <div className="timer-inner">
            <button
                className="close-btn"
                onClick={() => setDisplayTimer(false)}
            >
                Close
            </button>
            <p>Current Task: {task}</p>
            <p>Time Remaining: {timer}</p>
        </div>
    </div>
    ) : "";
}
export default Timer;