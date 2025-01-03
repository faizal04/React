import { useQuiz } from "../Context/QuizContext";

function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  const hasAnswered = answer !== null;
  return (
    <div>
      {question.options.map((opt, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={index}
          disabled={hasAnswered}
          onClick={() => {
            dispatch({
              type: "newAnswer",
              payload: index,
            });
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Options;
