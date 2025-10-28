import React, { useState } from "react";
import movieDetailData from "../data/movieDetailData.json";

export default function MovieDetail() {
  const [movie] = useState(movieDetailData);
  const baseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <header
        className="h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${baseUrl}${
            movie.backdrop_path || movie.poster_path
          })`,
        }}
      ></header>

      <section className="max-w-5xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 포스터 */}
        <div className="w-full">
          <img
            src={`${baseUrl}${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
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
