import { useCallback, useEffect, useState } from 'react';

function useFetch({ api }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const newData = await api();
      setData(newData);
    } catch (err) {
      const message =
        err.message ??
        '네트워크 오류가 발생했습니다.\n잠시 후에 다시 시도해 주세요.';
      setError({ message });
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error };
}

export default useFetch;
