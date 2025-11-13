import { API_BASE_URL, API_END_POINTS } from '@/constants';

async function getMovieList() {
  const response = await fetch(
    `${API_BASE_URL}${API_END_POINTS.POPULAR}?language=ko-KR&page=1`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        accept: 'application/json',
      },
    },
  );

  if (!response.ok)
    throw Error(
      `${response.status}: 데이터를 받아오지 못했습니다.\n잠시 후에 다시 시도해 주세요.`,
    );

  const data = await response.json();
  return data.results;
}

export default getMovieList;
