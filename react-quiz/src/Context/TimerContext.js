import { createContext, useContext, useEffect, useReducer } from "react";

const TimerContext = createContext();

const initialTimerState = { secondRemaining: 300 };

function timerReducer(state, action) {
  switch (action.type) {
    case "tick":
      return {
        ...state,
        secondRemaining: Math.max(0, state.secondRemaining - 1),
      };
    case "reset":
      return { secondRemaining: action.payload || 300 };
    default:
      throw new Error("Unknown timer action");
  }
}

export function TimerProvider({ children }) {
  const [state, dispatch] = useReducer(timerReducer, initialTimerState);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <TimerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  return useContext(TimerContext);
}
