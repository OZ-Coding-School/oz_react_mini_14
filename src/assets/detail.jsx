import React, { useEffect, useState } from "react";
import movieDetailData from "../assets/movieDetailData.json";


const detail = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setMovie(movieDetailData);
  }, []);

  if (movie) return;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-10">
      <div className="flex w-[900px] gap-8">
        <div className="w-[350px] h-[500px] flex-shrink-0 border border-gray-600 bg-gray-700 flex justify-center items-center">
          <img
            src={`${Image_base_url}${movie.poster_path || movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
 />
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex gap-4">
            <div className="flex-1 bg-gray-800 border border-gray-700 flex justify-center items-center p-3">
              <h2 className="text-xl font-bold">{movie.title}</h2>
            </div>
            <div className="w-[100px] bg-gray-800 border border-gray-700 flex justify-center items-center p-3">
              <p> {movie.vote_average}</p>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 p-4 text-center">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="mx-2">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="bg-gray-800 border border-gray-700 p-6 leading-relaxed overflow-y-auto">
            {movie.overview}
          </div>
           </div>
          </div>
         </div>
         );    
          };



export default MovieDetail;


