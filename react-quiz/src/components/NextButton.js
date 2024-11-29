function NextButton({ dispatch, answer, index, maxquestion }) {
  if (answer === null) return null;
  return (
    <div>
      <button
        className="btn btn-ui"
        onClick={() => {
          index === maxquestion
            ? dispatch({ type: "FinishedScreen" })
            : dispatch({ type: "nextQuestion" });
        }}
      >
        Next
      </button>
    </div>
  );
}

export default NextButton;
