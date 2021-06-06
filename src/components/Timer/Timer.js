import React, { useState, useEffect, useContext } from 'react';
import './Timer.css';
import TimerContext from '../../TimerContext.js';
/**
 * 
 * @param {*} props 
 * Timer component is responsible for the pop-up that actually displays
 * timers of different different activities in Exercise List
 */
function Timer() {
    const context = useContext(TimerContext)
    
    const {
        displayTimer,
        setDisplayTimer,
        exerciseList,
    } = context;
    const [task, setTask] = useState('')
    const [timer, setTimer] = useState('');
    const [pause, setPause] = useState(false);
    const [currIdx, setCurrIdx] = useState(0);
    const [start, setStart] = useState(false);
    const [interval, setTimerInterval] = useState('');


    useEffect(() => {
        if (exerciseList.length > 0) {
            setTimer(parseInt(exerciseList[0].time, 10));
            setTask(exerciseList[0].name);
        }
    }, [exerciseList])

    useEffect(() => {
        if (!displayTimer || !start) {
            return;
        }
        if (pause) {
            return clearInterval(interval);
        }
        const lastIdx = exerciseList.length - 1;
        let currentTimer = timer;
        let curExerIdx = currIdx;
        // setTask(currentTimer--);
        setTimer(currentTimer--);
        setTimerInterval(setInterval(() => {
            if (currentTimer === -1) {
                if (curExerIdx < lastIdx) {
                    currentTimer = parseInt(exerciseList[++curExerIdx].time, 10);
                    console.log('------exterlist, curExerIdx', exerciseList, curExerIdx)
                    setTask(exerciseList[curExerIdx].name);
                    setTimer(--currentTimer);
                    setCurrIdx(curExerIdx);
                    return;
                }
                setTimer(parseInt(exerciseList[0].time, 10));
                setTask(exerciseList[0].name);
                setCurrIdx(0);
                setStart(false)
                return clearInterval(interval);
            }
            setTimer(currentTimer--);
        }, 1000));
        return () => clearInterval(interval);
    }, [displayTimer, pause, start]);

    const onCancelClick = (e) => {
        // Reset All props on Cancel
        e.preventDefault();
        setDisplayTimer(false);
        setPause(false);
        setStart(false);
        setCurrIdx(0);
        setTask(exerciseList[0].name);
        setTimer(parseInt(exerciseList[0].time, 10));
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
                    {!start && <button
                            onClick={onStartClick}
                        >
                            Begin
                        </button>}
                    {start && !pause && <button
                            onClick={onPauseClick}
                        >
                            Pause
                        </button>}
                    {pause && <button
                            onClick={onResumeClick}
                        >
                            Resume
                        </button>}
                    <button
                        onClick={onCancelClick}
                    >
                        Cancel
                    </button>
                </div>
                <div className="timer__Info">
                    <div className="timer__taskTimer">
                        {timer}
                        <div className="timer__secondsInfo">
                            seconds remaining
                        </div>
                    </div>
                    <div className="timer__taskName">{task}</div>
                </div>
            </div>
        </div>
        ) : "";
}
export default Timer;