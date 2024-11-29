import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import QuestionsActive from "./QuestionsActive";
import ReadyScreen from "./ReadyScreen";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
export default function App() {
  const initialState = {
    questions: [],
    // "loading", error, ready, active, finished
    staus: "loading",
    index: 0,
    answer: null,
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
        console.log(answerpoints);
        console.log(state);

        return {
          ...state,
          answer: +action.payload,
          points:
            action.payload === answerpoints.correctOption
              ? state.answer + answerpoints.points
              : state.points,
        };
      case "nextQuestion":
        return { ...state, index: state.index + 1, answer: null };
      default:
        throw new Error("unknown error");
    }
  }

  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const questionsnum = questions.length;

  const pointsSum = questions.reduce((prev, curr) => prev + curr.points, 0);
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
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <ReadyScreen questionsnum={questionsnum} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestion={questionsnum}
              points={points}
              pointsSum={pointsSum}
              answer={answer}
            />
            <QuestionsActive
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              maxquestion={questionsnum}
              index={index}
            />
          </>
        )}
        {status === "finished" && (
          <FinishedScreen points={points} pointsSum={pointsSum} />
        )}
      </Main>
    </div>
  );
}
