function Options({ question }) {
  return (
    <div>
      {question.options.map((opt) => (
        <button className="btn btn-option">{opt}</button>
      ))}
    </div>
  );
}

export default Options;
