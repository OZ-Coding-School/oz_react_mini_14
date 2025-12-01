import { useState, useRef, useCallback } from "react";
import { fetchPopularMovies } from "@api/tmdb";

export function useInfiniteMovies() {
  const [movies, setMovies] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(1);
  const movieIdsRef = useRef(new Set());

  const loadMovies = useCallback(async () => {
    if (loading || isEnd) return;

    setLoading(true);

    const data = await fetchPopularMovies(pageRef.current);

    if (!data?.length) {
      setIsEnd(true);
      setLoading(false);
      return;
    }

    const filtered = data.filter((m) => !movieIdsRef.current.has(m.id));
    filtered.forEach((m) => movieIdsRef.current.add(m.id));

    setMovies((prev) => [...prev, ...filtered]);
    pageRef.current += 1;

    setLoading(false);
  }, [loading, isEnd]);

  return { movies, loadMovies, loading, isEnd };
}
