import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VIT_TMDB_API_KEY, //내 API
    language: "ko-KR",
  },
});

export default instance;
