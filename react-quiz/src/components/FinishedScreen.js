import { useQuiz } from "../Context/QuizContext";

function FinishedScreen() {
  const { points, pointsSum, highscore, dispatch } = useQuiz();
  return (
    <>
      <div>
        <p className="result">
          <strong>
            you scored {points} out of {pointsSum}
          </strong>
        </p>
        <p className="highscore">(Highscore:{highscore}points)</p>
      </div>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart
      </button>
    </>
  );
}

export default FinishedScreen;
