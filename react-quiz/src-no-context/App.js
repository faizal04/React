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
import Footer from "./components/Footer";
import Timer from "./components/Timer";

export default function App() {
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

  const [
    { questions, status, index, answer, points, highscore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
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
            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                maxquestion={questionsnum}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            pointsSum={pointsSum}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
