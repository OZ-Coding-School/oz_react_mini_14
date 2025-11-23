function refineMovies({ movies, movieIds }) {
  return movies.filter((movie) => {
    if (movieIds.has(movie.id) || movie.adult) return false;
    movieIds.add(movie.id);
    return true;
  });
}

export { refineMovies };
