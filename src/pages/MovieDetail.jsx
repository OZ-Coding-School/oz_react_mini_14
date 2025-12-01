import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "@api/tmdb";
import { ORIGINAL_IMAGE_URL } from "@/constants/urls";
import { useUser } from "@sbcontext/UserContext";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { toast } from "react-toastify";

export default function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const navigate = useNavigate();
  const { user } = useUser();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    fetchMovieDetails(id)
      .then(setMovie)
      .catch(() => {
        toast.error("영화 정보를 불러오지 못했습니다.");
      });
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const handleBookmark = () => {
    if (!user) {
      toast.info("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    toggleBookmark({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    });
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <header
        className="h-96 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${ORIGINAL_IMAGE_URL}${
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
            src={`${ORIGINAL_IMAGE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="flex flex-col justify-start relative">
          {/* ✅ 북마크 버튼 */}
          <button
            onClick={handleBookmark}
            className={`absolute top-4 right-4 px-4 py-2 rounded-lg font-semibold transition
              ${
                isBookmarked(movie.id)
                  ? "bg-red-500 text-white"
                  : "bg-yellow-400 text-black"
              }`}
          >
            {isBookmarked(movie.id) ? "북마크 취소" : "북마크"}
          </button>

          <h2 className="text-3xl font-semibold mb-3">{movie.title}</h2>
          <p className="text-yellow-400 mb-3">
            ⭐{" "}
            {typeof movie.vote_average === "number"
              ? movie.vote_average.toFixed(1)
              : "N/A"}
          </p>

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
