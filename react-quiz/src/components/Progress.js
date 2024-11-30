function Progress({ index, numQuestion, points, pointsSum, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestion} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/ {numQuestion}
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
