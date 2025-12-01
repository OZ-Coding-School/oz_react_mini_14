import { useState, useEffect, useCallback } from "react";
import { fetchPopularMovies } from "@api/tmdb";

export function useFeaturedMovies(limit = 20) {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [error, setError] = useState(null);

  const loadFeatured = useCallback(async () => {
    try {
      setLoadingFeatured(true);

      const data = await fetchPopularMovies(1);

      if (!data?.length) {
        setFeaturedMovies([]);
        return;
      }

      // ✅ adult 제거 + 평점 정렬 + 랜덤 셔플
      const filtered = data
        .filter((m) => m.adult === false)
        .sort((a, b) => b.vote_average - a.vote_average);

      const randomized = filtered
        .slice(0, limit)
        .sort(() => Math.random() - 0.5);

      setFeaturedMovies(randomized);
    } catch (err) {
      console.error(err);
      setError("추천 영화 로드 실패");
    } finally {
      setLoadingFeatured(false);
    }
  }, [limit]);

  useEffect(() => {
    loadFeatured();
  }, [loadFeatured]);

  return { featuredMovies, loadingFeatured, error };
}
