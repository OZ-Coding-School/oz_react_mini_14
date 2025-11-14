import movie from "../asset/movieDetailData.json";

const MovieDetail = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-3 gap-6">
      {/* 왼쪽 : 포스터 */}
      <div className="col-span-1">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto rounded shadow-lg"
        />
      </div>

      {/* 오른쪽 : 제목 / 평점 / 장르 / 줄거리 */}
      <div className="col-span-2 flex flex-col gap-4">

        {/* 제목 + 평점 */}
        <div className="flex gap-4">
          <div className="flex-1 bg-teal-800 text-white p-4 text-center rounded">
            <h2 className="text-xl font-bold">{movie.title}</h2>
          </div>
          <div className="w-32 bg-teal-800 text-white p-4 text-center rounded">
            ⭐ {movie.vote_average}
          </div>
        </div>

        {/* 장르 */}
        <div className="bg-teal-800 text-white p-4 rounded text-center text-lg">
          {movie.genres.map((g) => g.name).join(" · ")}
        </div>

        {/* 줄거리 */}
        <div className="bg-teal-800 text-white p-6 rounded text-center">
          {movie.overview}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;