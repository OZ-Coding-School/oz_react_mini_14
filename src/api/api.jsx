import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

// axios 인스턴스
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_OTHER_SECRET}`,
  },
  params: {
    api_key: `${import.meta.env.VITE_API_KEY}`,
    language: "ko-KR",
  },
});

// fetchData
// api data 불러오기 (tmdb data 전부)

export const fetchData = async (endpoint, extraParams = {}) => {
  try {
    const response = await instance.get(endpoint, { params: extraParams });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};

export default instance;
