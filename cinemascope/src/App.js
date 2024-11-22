import { useEffect, useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
export default function App() {
  const [query, setQuery] = useState("");

  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isload, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [selectedid, setselectedid] = useState(null);
  const apikey = "3a859eac";

  useEffect(
    function () {
      async function fetchmovies() {
        try {
          setloading(true);
          const movie = await fetch(
            `http://www.omdbapi.com/?apikey=${apikey}&s=${query}`
          );

          if (!movie.ok) throw Error("something went wrong");

          const data = await movie.json();
          console.log(data);
          if (data.Response === "False") throw Error("Can only add numbers");

          setMovies(data.Search);
          setloading(false);
        } catch (er) {
          console.log(er.message);
          // console.log(er.message);
          // seterror(error);
        } finally {
          setloading(false);
        }
      }
      fetchmovies();
    },
    [query]
  );

  function boxback(id) {
    setselectedid(selectedid === id ? null : id);
  }
  function displaymoviesection(id) {
    setselectedid((selectedid) => (selectedid === id ? null : id));
  }
  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setquery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isload && <Loading />}
          {error && <Error message={error} />}
          {!error && !isload && (
            <MovieList
              movies={movies}
              displaymoviesection={displaymoviesection}
            />
          )}
        </Box>
        <Box>
          {selectedid ? (
            <Domselectedid
              selectedid={selectedid}
              boxback={boxback}
              apikey={apikey}
            />
          ) : (
            <>
              <WactchedSummary watched={watched} />
              <MovieWatchedList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Domselectedid({ selectedid, boxback, apikey }) {
  const [movie, setmovie] = useState();
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  useEffect(() => {
    async function getmoviedetail() {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${apikey}&i=${selectedid}`
      );
      const data = await res.json();
      console.log(data);
    }
    getmoviedetail();
  }, []);

  return (
    <div className="details">
      <>
        <header>
          <button className="btn-back">&larr;</button>
          <img src={poster} alt={`Poster of ${movie} movie`} />
          <div className="details-overview">
            <h2>{title}</h2>
            <p>
              {released} &bull; {runtime}
            </p>
            <p>{genre}</p>
            <p>
              <span>⭐️</span>
              {imdbRating} IMDb rating
            </p>
          </div>
        </header>

        {/* <p>{avgRating}</p> */}
      </>
    </div>
  );
}
function Error({ message }) {
  return <p>{message}</p>;
}
function Loading() {
  return <p className="loader">loading...</p>;
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ query, setquery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setquery(e.target.value)}
    />
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Box({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}
function MovieList({ movies, displaymoviesection }) {
  return (
    <ul className="list">
      {movies?.map((movies) => (
        <Movie
          movies={movies}
          key={movies.imdbID}
          displaymoviesection={displaymoviesection}
        />
      ))}
    </ul>
  );
}
function Movie({ movies, displaymoviesection }) {
  return (
    <li
      onClick={() => {
        // console.log(movies.imdbID);
        // displaymoviesection(movies.imdbID);
        displaymoviesection(movies.imdbID);
      }}
    >
      <img src={movies.Poster} alt={`${movies.Title} poster`} />
      <h3>{movies.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movies.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieWatchedList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movies) => (
        <WatchedMovie movies={movies} key={movies.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movies }) {
  return (
    <li key={movies.imdbID}>
      <img src={movies.Poster} alt={`${movies.Title} poster`} />
      <h3>{movies.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movies.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movies.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movies.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
function WactchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movies) => movies.imdbRating));
  const avgUserRating = average(watched.map((movies) => movies.userRating));
  const avgRuntime = average(watched.map((movies) => movies.runtime));
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
