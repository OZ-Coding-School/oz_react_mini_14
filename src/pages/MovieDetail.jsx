import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/tmdb";

const baseUrl = "https://image.tmdb.org/t/p/original";

export default function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(id).then((data) => setMovie(data));
  }, [id]);

  if (!movie)
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        Loading...
      </div>
    );

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <header
        className="h-96 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${baseUrl}${
            movie.backdrop_path || movie.poster_path
          })`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </header>

      <section className="max-w-5xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 포스터 */}
        <div className="w-full">
          <img
            src={`${baseUrl}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        {/* 영화정보 */}
        <div className="flex flex-col justify-start">
          <h2 className="text-3xl font-semibold mb-3">{movie.title}</h2>
          <p className="text-yellow-400 mb-3">⭐ {movie.vote_average}</p>

          {/* 장르 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
          {/* 줄거리 */}
          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
        </div>
      </section>
    </main>
  );
}
