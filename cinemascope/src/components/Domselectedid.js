import { useEffect, useState } from "react";
import Loading from "./Loading.js";
import StarRating from "./StarRating.js";

export default function Domselectedid({
  selectedid,
  boxback,
  apikey,
  onAddWatched,
}) {
  const [movie, setmovie] = useState({});
  const [isloading, setloading] = useState(false);
  const [userRating, setUserRating] = useState();
  useEffect(
    function () {
      function keypressevent(e) {
        if (e.code === "Escape") {
          boxback();
        }
      }
      document.addEventListener("keydown", keypressevent);
      return function () {
        document.removeEventListener("keydown", keypressevent);
      };
    },
    [boxback]
  );

  useEffect(() => {
    async function getmoviedetail() {
      setloading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${apikey}&i=${selectedid}`
      );
      const data = await res.json();
      setmovie(data);
      setloading(false);
    }
    getmoviedetail();
  }, [selectedid, apikey]);

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
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedid,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    boxback();
  }

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie: ${movie.Title}`;
      return function () {
        document.title = "CinemaScope";
      };
    },
    [title, movie]
  );
  return (
    <div className="details">
      {isloading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={boxback}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{actors}</h2>
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
          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={20}
                color="yellow"
                fontSize={15}
                setrated={setUserRating}
              />
              <button className="btn-add" onClick={handleAdd}>
                add to list
              </button>
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>

          {/* <p>{avgRating}</p> */}
        </>
      )}
    </div>
  );
}
