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
import { useQuiz } from "./Context/QuizContext";

export default function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <ReadyScreen />}
        {status === "active" && (
          <>
            <Progress />
            <QuestionsActive />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishedScreen />}
      </Main>
    </div>
  );
}
