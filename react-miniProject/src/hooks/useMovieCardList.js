import { useEffect, useState } from "react";
import { API_URL, API_KEY } from "../constants/api.js";
import movieApi from "../apis/movie.js";

export default function useMovieCardList() {
  const [movieList, setMovieList] = useState([]); //movieListDatas.results
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovieInfo = async (pageValue) => {
    try {
      setLoading(true);

      let endPoint = `${API_URL}/popular?api_key=${API_KEY}&language=ko&page=${pageValue}`;
      const response = await fetch(endPoint);
      const jsonData = await response.json();
      const data = jsonData.results.filter((movie) => movie.adult === false);

      if (data.length === 0) {
        throw new Error("영화 데이터를 찾을 수 없습니다.");
      }

      setMovieList((prev) => {
        const combined = [...prev, ...data];
        const uniqueMovies = Array.from(
          new Map(combined.map((m) => [m.id, m])).values()
        );
        return uniqueMovies;
      });
    } catch (error) {
      console.error("API 요청 에러 : ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieInfo(page);
  }, [page]);

  const addMovie = () => {
    setPage((prev) => prev + 1);
  };

  return { movieList, addMovie, loading };
}
