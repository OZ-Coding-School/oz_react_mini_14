import { useState, useEffect } from "react";
import { getPopularMovies } from "../api/tmdb";

// Custom Hook (커스텀 훅)
function usePopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies();
        setMovies(data);
      } catch (error) {
        console.error("영화 데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);
  return { movies, loading };
}

export default usePopularMovies;
