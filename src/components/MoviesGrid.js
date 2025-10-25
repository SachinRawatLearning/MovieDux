import React, { useState } from "react";
import MovieCard from "./MovieCard";
import "../styles.css";

export default function MoviesGrid({ movies, watchlist, toggleWatchlist }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All");

  const matchesFilteredMovies = (movie) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const matchesFilteredGenre = (movie) => {
    return (
      genre === "All Genres" ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchesFilteredRating = (movie) => {
    switch (rating) {
      case "All":
        return true;
      case "Good":
        if (movie.rating >= 8) return true;
        break;
      case "Ok":
        if (movie.rating < 8 && movie.rating >= 5) return true;
        break;
      case "Bad":
        if (movie.rating < 5) return true;
        break;
      default:
        return false;
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      matchesFilteredMovies(movie) &&
      matchesFilteredGenre(movie) &&
      matchesFilteredRating(movie)
  );

  return (
    <>
      <input
        type="text"
        className="search-input"
        placeholder="Search Movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>All Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>
        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option>All</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>
      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            isWatchlisted={watchlist.includes(movie.id)}
            toggleWatchlist={toggleWatchlist}
          />
        ))}
      </div>
    </>
  );
}
