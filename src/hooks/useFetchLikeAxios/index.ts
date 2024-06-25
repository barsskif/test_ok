import { useState } from 'react';

type useFetchLikeAxiosType = {
  url: RequestInfo | URL;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: Record<string, string>;
};

const useFetchLikeAxios = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (requestConfig: useFetchLikeAxiosType) => {
    setLoading(true);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method || 'GET',
        headers: requestConfig.headers || {},
        body: JSON.stringify(requestConfig.body) || null,
      });

      if (!response.ok) throw new Error('Request failed.');

      const responseData = await response.json();

      setData(responseData);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
};

export default useFetchLikeAxios;
