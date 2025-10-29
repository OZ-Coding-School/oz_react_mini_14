import { useEffect, useState } from "react";

// <-------------------- function -------------------->

export default function useMainApi() {
  const [mainApi, setMainApi] = useState([]);

  // <-------------------- API : popular

  useEffect(() => {
    const apiToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        const noAdultResData = res.results.filter(
          (resData) => resData.adult === false
        );
        // console.log("✅ TMDB 응답 데이터:", filteredTmdbMovies);
        setMainApi(noAdultResData);
      })
      .catch((err) => console.error(err));
  }, []);

  // <-------------------- return -------------------->

  return mainApi;
}
