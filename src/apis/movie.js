import { API_BASE_URL, API_END_POINTS } from '@/constants';

async function fetchMovieData({ fetchFn }) {
  const response = await fetchFn();

  if (!response.ok)
    return {
      data: null,
      error: {
        message: `${response.status}: 데이터를 받아오지 못했습니다.\n잠시 후에 다시 시도해 주세요.`,
      },
    };

  const data = await response.json();
  return { data, error: null };
}

async function getMovieList({ params }) {
  const { page } = params;
  const { data, error } = await fetchMovieData({
    fetchFn: () =>
      fetch(
        `${API_BASE_URL}${API_END_POINTS.POPULAR}?language=ko-KR&page=${page}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
            accept: 'application/json',
          },
        },
      ),
  });

  if (error) throw error;
  return {
    data: data.results,
    page: data.page,
    totalPage: data.total_pages,
  };
}

async function getMovieListByKeyword({ params }) {
  const { keyword } = params;
  const { data, error } = await fetchMovieData({
    fetchFn: () =>
      fetch(
        `${API_BASE_URL}${API_END_POINTS.SEARCH}?query=${keyword}&language=ko-KR&page=1`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
            accept: 'application/json',
          },
        },
      ),
  });

  if (error) throw error;
  return data.results;
}

async function getMovieDetails({ params }) {
  const { id } = params;
  const { data, error } = await fetchMovieData({
    fetchFn: () =>
      fetch(`${API_BASE_URL}${API_END_POINTS.DETAIL}/${id}?language=ko-KR`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          accept: 'application/json',
        },
      }),
  });

  if (error) throw error;
  return data;
}

export { getMovieList, getMovieListByKeyword, getMovieDetails };
