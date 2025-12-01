import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@sbcontext/UserContext";
import { useBookmarks } from "@contexts/BookmarkContext";
import MovieCard from "@components/MovieCard";
import { toast } from "react-toastify";

export default function MyPage() {
  const { user } = useUser();
  const { bookmarks, removeBookmark } = useBookmarks();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.info("로그인이 필요합니다.");
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
    <main className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
      <section className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          마이페이지
        </h1>

        <div className="space-y-4 text-gray-700 text-lg">
          <p className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-500">닉네임</span>
            <span>{user.userName}</span>
          </p>

          <p className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-500">이메일</span>
            <span>{user.email}</span>
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
          내가 북마크한 영화
        </h2>

        {bookmarks.length === 0 ? (
          <p className="text-center text-gray-500 mt-12">
            북마크한 영화가 없습니다.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {bookmarks.map((movie) => (
              <div key={movie.id} className="relative group">
                <MovieCard {...movie} />

                <button
                  onClick={() => removeBookmark(movie.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
