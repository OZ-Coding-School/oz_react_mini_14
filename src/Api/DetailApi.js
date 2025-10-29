import { useEffect, useState } from "react";
import axios from "axios";

const apiToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

// <-------------------- function -------------------->

export default function useDetailApi(id) {
  const [detailApi, setDetailApi] = useState([]);
  // console.log(movieId);

  // <-------------------- API : Details

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}`,
      params: { language: "ko-KR" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };

    axios
      .request(options)
      .then((res) => {
        setDetailApi(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // <-------------------- return -------------------->

  return detailApi;
}
