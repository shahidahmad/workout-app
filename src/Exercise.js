import
    React,
    {
        useState,
        useEffect,
} from 'react';
import Task from './Task';
import './Exercise.css';
import Timer from './Timer';

function Exercise() {

    const [name, setName] = useState('');
    const [time, setTime] = useState('');
    const [exerciseList, setList] = useState([]);
    const [displayTimer, setDisplayTimer] = useState(false);

    const addExercies = (e) => {
        e.preventDefault();
        if (name === '' || time === '') return;
        setName(() => '');
        setTime(() => '');
        setList((arr) => [...arr, {name, time}]);
        return;
    }

    const startExercise = () => {
        setDisplayTimer(true)
    }

    return (
        <div className="exercise">
            <div>
                <div className="exercise__top">
                    <form>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="exercise__name"
                            placeholder="Exercise"
                            key="name"
                            />
                        <input
                            value={time}
                            onChange={e => {
                                let val = '';
                                const targetVal = e.target.value;
                                const setVal = new RegExp('^[0-9]+$').test(targetVal)
                                if (setVal || targetVal === '') {
                                    setTime(targetVal)
                                }
                            }}
                            placeholder="Seconds"
                            key="time"
                            />
                        <button
                            onClick={addExercies}
                            type="submit"
                            key="add"
                        >
                            Add
                        </button>
                    </form>
                </div>
            </div>
            <div>
                <button
                    onClick={startExercise}
                    key="start"
                >
                    Start
                </button>
            </div>
            <div>
                {
                    exerciseList.map(({name, time}, idx) => {
                        return <Task
                            key={idx}
                            name={name}
                            seconds={time}
                            
                        />
                    })
                }
            </div>
            <div>
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
