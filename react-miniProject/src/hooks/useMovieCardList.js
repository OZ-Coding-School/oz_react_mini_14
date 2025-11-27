import { useCallback, useEffect, useState } from "react";
import { API_URL, API_KEY } from "@constants/api.js";
// import movieApi from "../apis/movie.js";

export default function useMovieCardList() {
  const [movieList, setMovieList] = useState([]); //movieListDatas.results //누적된 영화 데이터
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null); // API에서 주는 전체 페이지 수
  const [error, setError] = useState(null);

  const fetchMovieInfo = useCallback(async (pageValue) => {
    try {
      setLoading(true);
      setError(null); //error 추가

      const endPoint = `${API_URL}/popular?api_key=${API_KEY}&language=ko&page=${pageValue}`;
      const response = await fetch(endPoint);

      if (!response.ok) {
        //데이터 사전 체크
        throw new Error(`API 응답 에러: ${response.status}`);
      }

      const jsonData = await response.json();
      const data = jsonData.results.filter((movie) => movie.adult === false);
      // (jsonData.results || []).filter((movie) => movie.adult === false);
      if (typeof jsonData.total_pages === "number") {
        setTotalPages(jsonData.total_pages);
      }

      // if (data.length === 0) {
      //   throw new Error("영화 데이터를 찾을 수 없습니다.");
      // }

      setMovieList((prev) => {
        const combined = [...prev, ...data];
        const uniqueMovies = Array.from(
          new Map(combined.map((m) => [m.id, m])).values()
        );
        return uniqueMovies;
      });
    } catch (error) {
      console.error("API 요청 에러 : ", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovieInfo(page);
  }, [page, fetchMovieInfo]);

  const addMovie = useCallback(() => {
    setPage((prev) => {
      if (totalPages && prev >= totalPages) return prev; // totalPages가 알려져 있고 이미 마지막이면 증가하지 않음
      return prev + 1;
    });
  }, [totalPages]);

  const hasMore = totalPages ? page < totalPages : true; // totalPages 없을 땐 기본적으로 true

  return { movieList, addMovie, loading, page, hasMore, error };
}
