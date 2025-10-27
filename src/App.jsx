import React from 'react';
import movieListData from '../movieListData.json';
import MovieCard from './components/MovieCard.jsx';

export default function App() {
  const list = movieListData?.results ?? [];

  return (
    <section>
      <h1 className="visually-hidden">Movies</h1>
      <div className="grid">
        {list.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </section>
  );
}
