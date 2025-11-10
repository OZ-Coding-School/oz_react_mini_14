import { useEffect, useState } from "react";
import { API_URL, API_KEY } from "../constants/api.js";

export default function useMovieDetailData(movieId) {
  const [movieDetailDatas, setMovieDetailDatas] = useState([]); //movieListDatas.results
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const endPoint = `${API_URL}/${movieId}?api_key=${API_KEY}&language=ko`;
        const response = await fetch(endPoint);
        const jsonData = await response.json();

        if (!jsonData || jsonData.success === false) {
          throw new Error("영화 데이터를 불러올 수 없습니다.");
        }

        setMovieDetailDatas(jsonData);
      } catch (error) {
        console.error("API 요청 에러 : ", error);
      } finally {
        setLoading(false);
      }
    };
    if (movieDetailDatas) {
      fetchMovieInfo();
    }
  }, [movieId]);

  return { movieDetailDatas, loading };
}
