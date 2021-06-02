import React, { useState, useEffect } from 'react';
import './Timer.css';
/**
 * 
 * @param {*} props 
 * Timer component is responsible for the pop-up that actually displays
 * timers of different different activities in Exercise List
 */
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
    const [start, setStart] = useState(false);


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
        const lastIdx = exerciseList.length - 1;
        let currentTimer = timer;
        let curExerIdx = currIdx;
        const interval = setInterval(() => {
            /**
             * If current index is the last one and current timer is -1 OR if Pause putton
             * is clicked then kill the setInterval
             */
            if ((currentTimer === -1 && curExerIdx === lastIdx) || pause) {
                // If the currentTimer is -1 then reset every all props except for pause
                if(!pause) {
                    setTimer(parseInt(exerciseList[0].time, 10));
                    setTask(exerciseList[0].name);
                    setCurrIdx(0);
                    setStart(false)
                }
                return clearInterval(interval);
            }
            setTask(exerciseList[curExerIdx].name);
            setTimer(currentTimer);
            currentTimer--;
            // CurrentTimer is -1 and we still have exercises in the list, then it's time
            // increment current index and reset current timer
            if (currentTimer === -1 && curExerIdx < lastIdx) {
                curExerIdx++
                currentTimer = parseInt(exerciseList[curExerIdx].time, 10);
                setCurrIdx(curExerIdx)
            }

        }, 1000);
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
        const lastIndex = exerciseList.length - 1;
        /**
         * Handles edge cases,
         * If timer is 0 and is currently being resumed then decrement
         * current element index and set task name
         */
        if (timer === 0) {
            const lastIdxTask = exerciseList[lastIndex].name;
            if (currIdx === lastIndex && lastIdxTask === task) {            
                return;
            }
            setCurrIdx(currIdx - 1);
            setTask(exerciseList[currIdx - 1].name);
        }

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