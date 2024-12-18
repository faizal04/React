import { useQuiz } from "../Context/QuizContext";

function NextButton() {
  const { dispatch, answer, index, questionsnum } = useQuiz();
  console.log(answer, index, questionsnum);
  if (answer === null) return null;
  if (index < questionsnum - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => {
            dispatch({ type: "nextQuestion" });
          }}
        >
          Next
        </button>
      </div>
    );
  if (index + 1 === questionsnum) {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => {
            dispatch({ type: "finishedScreen" });
          }}
        >
          Finish
        </button>
      </div>
    );
  }
}

export default NextButton;
