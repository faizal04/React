import { useQuiz } from "../Context/QuizContext";

function Progress() {
  const { index, questionsnum, points, pointsSum, answer } = useQuiz();
  return (
    <header className="progress">
      <progress max={questionsnum} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/ {questionsnum}
      </p>
      <p>
        <strong>
          {points}/{pointsSum}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
