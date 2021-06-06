import { createContext, useState } from 'react';
const AppContext = createContext();

// const TimerContext = createContext(() => {
//     const [exerciseList, setExerciseList] = useState([]);
//     const [displayTimer, setDisplayTimer] = useState(false);
//     return (
//         <AppContext value={{exerciseList, setExerciseList}} />
//     )
// })
const TimerContext = createContext(null)
export default TimerContext;