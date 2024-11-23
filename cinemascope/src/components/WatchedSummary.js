const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function WactchedSummary({ watched }) {
  const avgImdbRating = Math.floor(
    average(watched.map((movies) => movies.imdbRating))
  );
  const avgUserRating = Math.floor(
    average(watched.map((movies) => movies.userRating))
  );
  const avgRuntime = Math.floor(
    average(watched.map((movies) => movies.runtime))
  );
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

export default WactchedSummary;
