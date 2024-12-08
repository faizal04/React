import Options from "./components/Options";

function QuestionsActive({ question, dispatch, answer }) {
  return (
    <div>
      <h2>{question.question}</h2>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default QuestionsActive;
