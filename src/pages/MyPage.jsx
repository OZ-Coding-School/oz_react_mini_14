import { useContext, useEffect } from "react";
import { UserContext } from "@sbCtx/UserContext";
import { useNavigate } from "react-router-dom";
import { useBookmarks } from "@/context/BookmarkContext";
import MovieCard from "@components/MovieCard";

export default function MyPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { bookmarks, removeBookmark } = useBookmarks();

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user)
    return (
      <div className="min-h-screen flex justify-center items-center text-lg pt-24">
        로그인이 필요합니다...
      </div>
    );

  return (
    <>
      <div className="pt-28 max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">마이페이지</h1>

        <div className="space-y-4 text-lg">
          <p>
            <span className="font-semibold">닉네임:</span> {user.userName}
          </p>

          <p>
            <span className="font-semibold">이메일:</span> {user.email}
          </p>
        </div>
      </div>

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">내 북마크</h1>

        {bookmarks.length === 0 ? (
          <p className="text-center text-gray-500">북마크한 영화가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {bookmarks.map((movie) => (
              <div key={movie.id} className="relative">
                <MovieCard {...movie} />

                <button
                  onClick={() => removeBookmark(movie.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600 transition"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
