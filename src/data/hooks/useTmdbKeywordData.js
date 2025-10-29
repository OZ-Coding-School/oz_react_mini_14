import { useEffect, useState } from "react";
import axios from "axios";

const apiToken = import.meta.env.VITE_TMDB_API_KEY;

export default function useTmdbKeywordData(keyword) {
  const [search, setSearch] = useState([]);

  useEffect(() => {
    console.log(keyword);

    if (!keyword) return;

    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/search/movie`,
      params: {
        query: keyword,
        language: "ko-KR",
        page: 1,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };

    axios
      .request(options)
      .then((res) => setSearch(res.data.results))
      .catch((err) => console.error(err));
  }, [keyword]);

  return search;
}
