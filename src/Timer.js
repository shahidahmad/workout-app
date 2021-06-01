import React, { useState, useEffect } from 'react';
import './Timer.css';

function Timer(props) {
    const {
        displayTimer,
        setDisplayTimer,
        exerciseList,
    } = props;
    const [task, setTask] = useState('')
    const [timer, setTimer] = useState('');
    const [pause, setPause] = useState(false);
    const [currIdx, setCurrIdx] = useState(0);
    const [start, setStart] = useState(true)


    useEffect(() => {
        if (exerciseList.length > 0) {
            setTimer(() => parseInt(exerciseList[0].time, 10));
            setTask(() => exerciseList[0].name);
        }
    }, [exerciseList])
    useEffect(() => {
        if (displayTimer && start) {
            const lastIdx = exerciseList.length - 1;
            let currentTimer = timer;
            let curExerIdx = currIdx;
             const interval = setInterval(() => {
                    if (currentTimer === -1 || pause) {
                            if(!pause) {
                                setTimer(() => parseInt(exerciseList[0].time, 10));
                                setTask(() => exerciseList[0].name);
                                setCurrIdx(0);
                                setStart(false)
                            }
                            return clearInterval(interval);
                    }
                    setTimer(currentTimer--);
                    setTask(exerciseList[curExerIdx].name);
                    if (currentTimer === -1 && curExerIdx !== lastIdx) {
                            currentTimer = parseInt(exerciseList[curExerIdx + 1].time, 10);
                            setCurrIdx(() => ++curExerIdx)
                    }

                }, 1000);
                return () => clearInterval(interval);
        }
    }, [displayTimer, pause, start]);

    const onCancelClick = (e) => {
        e.preventDefault();
        setDisplayTimer(false);
        setPause(false);
        setStart(false);
        setCurrIdx(0);
        setTask(() => {
            if(exerciseList.length > 0) {
                return exerciseList[0].name;
            }
            return '';
        });
        setTimer(() => {
            if(exerciseList.length > 0) {
                return parseInt(exerciseList[0].time, 10);
            }
            return '';
        });
    };

    const onPauseClick = (e) => {
        e.preventDefault();
        setPause(true);
    };

    const onResumeClick = (e) => {
        e.preventDefault();
        setPause(false);
    };

    const onStartClick = (e) => {
        e.preventDefault();
        setStart(true);
    };

    return (displayTimer) ? (
    <div className="timer">
        <div className="timer__inner">
            <div className="timer__buttons">
                {
                    !start && <button
                            onClick={onStartClick}
                        >
                            Start
                        </button>
                    }
                {
                    start && !pause && <button
                            onClick={onPauseClick}
                        >
                            Pause
                        </button>
                }
                {
                    pause && <button
                        onClick={onResumeClick}
                    >
                        Resume
                    </button>
                }
                <button
                    onClick={onCancelClick}
                >
                    Cancel
                </button>
            </div>
            <div className="timer__Info">
                <div className="timer__taskTimer">{timer}</div>
                <div className="timer__taskName">Seconds remaining for {task}</div>
            </div>
        </div>
    </div>
    ) : "";
}
export default Timer;