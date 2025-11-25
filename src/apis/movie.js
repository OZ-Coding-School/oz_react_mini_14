import { API_BASE_URL, API_END_POINTS, ERROR_MESSAGE } from '@/constants';

async function fetchMovieData({ fetchFn }) {
  const response = await fetchFn();

  if (!response.ok)
    return {
      data: null,
      error: {
        message: `${response.status}: ${ERROR_MESSAGE.FETCH_FAILED}`,
      },
    };

  const data = await response.json();
  return { data, error: null };
}

async function getMovieListBase({ endpoint, params = {} }) {
  const queryString = new URLSearchParams({
    language: 'ko-KR',
    page: 1,
    ...params,
  }).toString();

  const { data, error } = await fetchMovieData({
    fetchFn: () =>
      fetch(`${API_BASE_URL}${endpoint}?${queryString}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          accept: 'application/json',
        },
      }),
  });

  if (error) throw error;
  return {
    data: data.results,
    page: data.page,
    totalPage: data.total_pages,
  };
}

async function getMovieList({ params }) {
  const { page } = params;
  return await getMovieListBase({
    endpoint: API_END_POINTS.POPULAR,
    params: { page },
  });
}

async function getMovieListByKeyword({ params }) {
  const { keyword } = params;
  return await getMovieListBase({
    endpoint: API_END_POINTS.SEARCH,
    params: { query: keyword },
  });
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
