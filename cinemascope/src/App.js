import { useEffect, useState } from "react";
import Domselectedid from "./components/Domselectedid.js";
import WatchedMovie from "./components/WatchedMovie.js";
import Loading from "./components/Loading";
import Box from "./components/Box.js";
import WactchedSummary from "./components/WatchedSummary.js";

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
      const controller = new AbortController();
      async function fetchmovies() {
        try {
          setloading(true);
          const movie = await fetch(
            `http://www.omdbapi.com/?apikey=${apikey}&s=${query}`,
            { signal: controller.signal }
          );

          if (!movie.ok) throw Error("something went wrong");

          const data = await movie.json();
          if (data.Response === "False") throw Error("Can only add numbers");

          setMovies(data.Search);
          setloading(false);
        } catch (er) {
          if (er.name !== "AbortError") {
            seterror(er.message);
          }
        } finally {
          setloading(false);
        }
      }
      fetchmovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  function boxback() {
    setselectedid(null);
  }
  function displaymoviesection(id) {
    setselectedid((selectedid) => (selectedid === id ? null : id));
  }

  function handleAddwatched(movies) {
    setWatched((watched) => [...watched, movies]);
    function check() {}
    check();
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
              onAddWatched={handleAddwatched}
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

function Error({ message }) {
  return <p>{message}</p>;
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
      <span role="img">📽️</span>
      <h1>CinemaScope</h1>
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
