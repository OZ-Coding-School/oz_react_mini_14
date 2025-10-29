// src/api/fetch.jsx
// fetch data 불러오기 (tmdb data 전부)
import instance from "./axios";

export const fetchData = async (endpoint, extraParams = {}) => {
  try {
    const response = await instance.get(endpoint, { params: extraParams });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
