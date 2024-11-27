import Options from "./components/Options";

function QuestionsActive({ question }) {
  return (
    <div>
      <h2>{question.question}</h2>
      <Options question={question} />
    </div>
  );
}

export default QuestionsActive;
