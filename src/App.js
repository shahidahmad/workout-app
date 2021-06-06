import './App.css';
import Exercise from './components/Exercise/Exercise';
import TimerContext from './TimerContext';
import { useState } from 'react';

function App() {
  const [exerciseList, setExerciseList] = useState([]);
  const [displayTimer, setDisplayTimer] = useState(false);
  return (
    <div className="App">
      <TimerContext.Provider
        value={
          {
            exerciseList,
            displayTimer,
            setExerciseList,
            setDisplayTimer,
          }
        }>
        <Exercise />
      </TimerContext.Provider>
    </div>
  );
}

export default App;
