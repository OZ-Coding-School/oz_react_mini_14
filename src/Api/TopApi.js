import { useEffect, useState } from "react";
import axios from "axios";

const apiToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

// <-------------------- function -------------------->

export default function TopApi() {
  const [topApi, setTopApi] = useState([]);

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
        setTopApi(res.data.results);
      })
      .catch((err) => console.error(err));
  });

  // <-------------------- return -------------------->

  return topApi;
}
