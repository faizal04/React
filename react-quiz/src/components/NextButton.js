function NextButton({ dispatch, answer, index, maxquestion }) {
  if (answer === null) return null;
  if (index < maxquestion - 1)
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
  if (index + 1 === maxquestion) {
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
