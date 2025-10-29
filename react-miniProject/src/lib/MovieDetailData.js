import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function useMovieDetailData(movieId) {
  const [movieDetailDatas, setMovieDetailDatas] = useState([]); //movieListDatas.results
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const endPoint = `${API_URL}/${movieId}?api_key=${API_KEY}&language=ko`;
        const response = await fetch(endPoint);
        const jsonData = await response.json();
        // console.log("jsonData : " + jsonData);
        // const data = jsonData.find((el) => el.id === Number(movieId));
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
  // console.log("loading : " + loading);
  // console.log("movieData : " + movieData);

  return { movieDetailDatas, loading };
}
