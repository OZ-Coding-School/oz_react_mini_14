import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function useMovieCardData() {
  const [movieData, setMoiveData] = useState([]); //movieListDatas.results
  const [page, setPage] = useState(1);

  const fetchMovieInfo = async (pageValue) => {
    try {
      let endPoint = `${API_URL}/popular?api_key=${API_KEY}&language=ko&page=${pageValue}`;
      const response = await fetch(endPoint);
      const jsonData = await response.json();
      const data = jsonData.results.filter((movie) => movie.adult === false);

      if (data.length === 0) {
        throw new Error("영화 데이터를 찾을 수 없습니다.");
      }

      setMoiveData((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("API 요청 에러 : ", error);
    }
  };

  useEffect(() => {
    fetchMovieInfo(page);
  }, [page]);

  const addMovie = () => {
    setPage((prev) => prev + 1);
  };

  return { movieData, addMovie };
}

// let value = 1;

// useEffect(() => {
//   const fetchMovieInfo = async () => {
//     try {
//       let endPoint = `${API_URL}/popular?api_key=${API_KEY}&language=ko&page=${value}`;
//       const response = await fetch(endPoint);
//       const jsonData = await response.json();
//       const data = jsonData.results.filter((movie) => movie.adult === false);

//       if (data.length === 0) {
//         throw new Error("영화 데이터를 찾을 수 없습니다.");
//       }
//       setMoiveData(data);
//     } catch (error) {
//       console.error("API 요청 에러 : ", error);
//     }
//   };
//   fetchMovieInfo();
// }, []);
