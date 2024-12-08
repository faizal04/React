import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QuizContext } from "./Context/QuizContext";
import { TimerProvider } from "./Context/TimerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TimerProvider>
      <QuizContext>
        <App />
      </QuizContext>
    </TimerProvider>
  </React.StrictMode>
);
