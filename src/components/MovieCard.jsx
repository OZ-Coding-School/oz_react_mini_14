import { useNavigate } from "react-router-dom";
import { useUser } from "@sbCtx/UserContext";
import { useBookmarks } from "@/context/BookmarkContext";
import { Button } from ".";

const baseUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ id, title, poster_path, vote_average }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const handleBookmark = (e) => {
    e.stopPropagation();

    if (!user) {
      alert("로그인이 필요합니다!");
      return;
    }

    toggleBookmark({ id, title, poster_path, vote_average });
  };

  return (
    <div
      className="relative cursor-pointer group"
      onClick={() => navigate(`/details/${id}`)}
    >
      {/* 이미지 */}
      <img
        src={`${baseUrl}${poster_path}`}
        alt={title}
        className="rounded-lg shadow-md w-full group-hover:opacity-90 transition"
      />

      {/* 평점 */}
      <span className="absolute bottom-2 left-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
        ⭐ {vote_average}
      </span>

      {/* ✅ 북마크 버튼 */}
      <Button
        onClick={handleBookmark}
        className={`absolute top-2 right-2 px-2 py-1 rounded-full text-sm font-bold transition
          ${
            isBookmarked(id)
              ? "bg-yellow-400 text-black"
              : "bg-white/80 text-gray-700"
          }
        `}
      >
        {isBookmarked(id) ? "★" : "☆"}
      </Button>
    </div>
  );
}
