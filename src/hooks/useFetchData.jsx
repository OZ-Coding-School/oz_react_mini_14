import { useEffect, useState, useMemo } from "react";
import { fetchData } from "@/api";

const useFetchData = (endpoint, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);

  useEffect(() => {
    if (!endpoint) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchData(endpoint, params);

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          console.error("API 요청 중 오류발생:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, memoizedParams]);

  return { data, loading, error };
};

export default useFetchData;
