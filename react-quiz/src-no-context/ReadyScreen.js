function ReadyScreen({ questionsnum, dispatch }) {
  return (
    <div>
      <h2>{questionsnum} questions are ready </h2>

      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "active" });
        }}
      >
        click to start
      </button>
    </div>
  );
}

export default ReadyScreen;
