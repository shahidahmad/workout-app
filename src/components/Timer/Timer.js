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
        start,
        setStart,
    } = context;
    const [task, setTask] = useState('')
    const [timer, setTimer] = useState('');
    const [originalTimer, setOriginalTimer] = useState('');
    const [pause, setPause] = useState(false);
    const [currIdx, setCurrIdx] = useState(0);
    const [interval, setTimerInterval] = useState('');


    useEffect(() => {
        if (exerciseList.length > 0) {
            setTimer(parseInt(exerciseList[0].time, 10));
            setOriginalTimer(parseInt(exerciseList[0].time, 10));
            setTask(exerciseList[0].name);
        }
    }, [exerciseList])

    useEffect(() => {
        if (!displayTimer || !start || pause) {
            return clearInterval(interval);
        }
        const lastIdx = exerciseList.length - 1;
        let currentTimer = timer;
        let curExerIdx = currIdx;
        setTimer(currentTimer--);
        function setIntervalFunc() {
            return setInterval(() => {
                if (currentTimer === -1) {
                    if (curExerIdx < lastIdx) {
                        currentTimer = parseInt(exerciseList[++curExerIdx].time, 10);
                        setOriginalTimer(currentTimer);
                        setTask(exerciseList[curExerIdx].name);
                        setTimer(currentTimer--);
                        setCurrIdx(curExerIdx);
                        return;
                    }
                    setOriginalTimer(parseInt(exerciseList[0].time, 10));
                    setTimer(parseInt(exerciseList[0].time, 10));
                    setTask(exerciseList[0].name);
                    setCurrIdx(0);
                    setStart(false)
                    return clearInterval(interval);
                }
                setTimer(currentTimer--);
            }, 1000)
        }
        setTimerInterval(setIntervalFunc());
    }, [displayTimer, pause, start]);

    const onCloseClick = (e) => {
        // Reset All props on Cancel
        e.preventDefault();
        setDisplayTimer(false);
        setPause(false);
        setStart(false);
        setCurrIdx(0);
        setTask(exerciseList[0].name);
        setTimer(parseInt(exerciseList[0].time, 10));
        setOriginalTimer(parseInt(exerciseList[0].time, 10));
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
                <div className="timer__Info">
                    <button
                        onClick={onCloseClick}
                        className="timer__close fa fa-4x fa-times"
                    >
                    </button>
                    {(start || pause)&&<div
                            className="timer__progressBar"
                            style={{
                                width: `${((originalTimer - timer)*100)/originalTimer}%`,
                                background: task !== 'Break' ? 'green' : 'red',
                                opacity: 0.15
                            }}
                        ></div>}
                    <div className="timer__buttons">
                        {!start && <div
                                className="timer__start fa fa-2x fa-play"
                                onClick={onStartClick}
                            ></div>}
                        {start && !pause && <div
                                className="timer__pause fa fa-2x fa-pause"
                                onClick={onPauseClick}
                            ></div>}
                        {pause && <div
                                className="timer__resume fa fa-2x fa-play"
                                onClick={onResumeClick}
                            ></div>}
                    </div>
                    <div className="timer__taskTimer">
                        {timer}
                        {/* <div className="timer__secondsInfo">
                            seconds remaining
                        </div> */}
                    </div>
                    <div className="timer__taskName">{task}</div>
                </div>
            </div>
        </div>
        ) : "";
}
export default Timer;