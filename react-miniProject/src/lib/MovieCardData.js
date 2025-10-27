import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function MovieCardData() {
  const [movieData, setMoiveData] = useState([]); //movieListDatas.results
  // console.log(API_URL + " / " + API_KEY);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const endPoint = `${API_URL}/popular?api_key=${API_KEY}&language=ko&page=1`;
        const response = await fetch(endPoint);
        const jsonData = await response.json();
        const data = jsonData.results.filter((movie) => movie.adult === false);
        if (data.length === 0) {
          throw new Error("영화 데이터를 찾을 수 없습니다.");
        }
        // console.log(data);
        setMoiveData(data);
      } catch (error) {
        console.error("API 요청 에러 : ", error);
      }
    };
    fetchMovieInfo();
  }, []);

  return movieData;
}
