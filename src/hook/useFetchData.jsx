import React, { useEffect, useState } from "react";
import { fetchData } from "../api/api";

export const useFetchData = (endpoint = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchData(endpoint);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (endpoint) {
      loadData();
    }
  }, [endpoint]);

  return { data, loading, error };
};
