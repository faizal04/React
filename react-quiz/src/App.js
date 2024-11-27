import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import QuestionsActive from "./QuestionsActive";
import ReadyScreen from "./ReadyScreen";
export default function App() {
  const initialState = {
    questions: [],
    // "loading", error, ready, active, finished
    staus: "loading",
    index: 0,
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
      default:
        throw new Error("unknown error");
    }
  }

  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );
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
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <ReadyScreen questionsnum={questionsnum} dispatch={dispatch} />
        )}
        {status === "active" && <QuestionsActive question={questions[index]} />}
      </Main>
    </div>
  );
}
