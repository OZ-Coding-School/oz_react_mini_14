import React, { useEffect, useState } from "react";
import movieDetailData from "./movieDetailData.json";



const MovieDetail = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setMovie(movieDetailData);
  }, []);

  if (movie) return;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-10 flex justify-center items-start">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 max-w-6xl w-full">
        {/* 포스터 */}
        <div className="flex flex-col gap-4">
          {/* 제목 + 평점 */}
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">{movie.title}</h2>
            <span className="text-lg text-yellow-400 font-semibold">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          </div>
          
           {/* 장르 */}
          <div className="flex flex-wrap gap-2">
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
          <div className="mt-2">
            <h3 className="text-xl font-semibold mb-2">줄거리</h3>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
