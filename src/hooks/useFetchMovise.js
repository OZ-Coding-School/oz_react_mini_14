import { useEffect, useState } from "react";

function useFetchMovise() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const token = import.meta.env.VITE_TMDB_TOKEN;
  const fetchPopular = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);
      const filtered = data.results.filter((movie) => movie.adult === false);
      setMovies(filtered);
    } catch (error) {
      console.error("인기 영화 API 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 검색 API 호출
  // const searchMovies = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await fetch(
  //       `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
  //         searchQuery
  //       )}&language=ko-KR&page=1&include_adult=false`,
  //       {
  //         headers: {
  //           accept: "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const data = await res.json();
  //     setMovies(data.results || []);
  //   } catch (error) {
  //     console.error("검색 API 오류:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    fetchPopular();
  }, []);

  return { movies, searchQuery, loading };
}
export default useFetchMovise;
