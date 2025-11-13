import React from "react";
import Item from "./ItemList";
import MovieListData from "./movieListData.json";

const MovieList = () => {
  const movies = MovieListData.results || MovieListData;

  console.log(movies);

  return (
    <div className="grid grid-cols-5 gap-4 place-items-center p-4">
      {movies.map((movie, index) => (
        <Item key={index} />
      ))}
    </div>
  );
};

export default MovieList;
