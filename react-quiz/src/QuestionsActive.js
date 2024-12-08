import Options from "./components/Options";
import { useQuiz } from "./Context/QuizContext";

function QuestionsActive() {
  const { questions, index } = useQuiz();
  const question = questions.at(index);

  return (
    <div>
      <h2>{question.question}</h2>
      <Options question={question} />
    </div>
  );
}

export default QuestionsActive;
