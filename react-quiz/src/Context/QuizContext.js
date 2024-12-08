import { createContext, useContext, useEffect, useReducer } from "react";

const Contextapi = createContext();

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  highscore: 0,
  points: 0,
  secondRemaining: 300,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "active":
      return {
        ...state,
        status: "active",
      };

    case "datafailed":
      console.log(action.payload);
      return {
        ...state,
        questions: "failed",
        status: "error",
      };
    case "newAnswer":
      const answerpoints = state.questions.at(state.index);
      console.log(state);
      console.log(answerpoints);
      return {
        ...state,
        answer: +action.payload,
        points:
          action.payload === answerpoints.correctOption
            ? state.points + answerpoints.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    case "finishedScreen":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    default:
      throw new Error("unknown error");
  }
}

function QuizContext({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const questionsnum = questions.length;

  useEffect(function () {
    async function fetchdata() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataRecieved", payload: data });
      } catch (error) {
        dispatch({ type: "datafailed", payload: error });
      }
    }
    fetchdata();
  }, []);

  const pointsSum = questions.reduce((prev, curr) => prev + curr.points, 0);

  return (
    <Contextapi.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondRemaining,
        questionsnum,
        pointsSum,
        dispatch,
      }}
    >
      {children}
    </Contextapi.Provider>
  );
}
function useQuiz() {
  const context = useContext(Contextapi);
  return context;
}

export { QuizContext, useQuiz };
