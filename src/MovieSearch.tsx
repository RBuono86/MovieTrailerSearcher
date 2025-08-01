import React, { useState } from "react";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

const API_KEY = "7582d2dd"; // replace with your key

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(
          query
        )}&apikey=${API_KEY}`
      );
      const data = await res.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
        alert("No results found.");
      }
    } catch (err) {
      alert("Error fetching movies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movie-search">
      <h2>🎬 Movie Trailer Searcher</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movie title"
      />
      <button onClick={searchMovies}>Search</button>

      {loading && <p>Loading...</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/150"
              }
              alt={movie.Title}
            />
            <h4>{movie.Title}</h4>
            <p>{movie.Year}</p>
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                movie.Title + " trailer"
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              🎥 Watch Trailer
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
