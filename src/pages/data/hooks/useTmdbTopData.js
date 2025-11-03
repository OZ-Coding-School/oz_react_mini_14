import { useEffect, useState } from "react";
import axios from "axios";

const apiToken = import.meta.env.VITE_TMDB_API_KEY;

// <-------------------- function -------------------->

export default function useTmdbTopData() {
  const [tmdbTopData, setTmdbTopData] = useState([]);

  // <-------------------- API : Top

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/top_rated",
      params: { language: "ko-KR", page: "1" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };

    axios
      .request(options)
      .then((res) => {
        setTmdbTopData(res.data.results);
      })
      .catch((err) => console.error(err));
  },[]);

  // <-------------------- return -------------------->

  return tmdbTopData;
}
