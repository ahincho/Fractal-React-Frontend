import { useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";

export type FetchDataFunction<T> = () => Promise<T>;

export const useGetData = <T>(fetchData: FetchDataFunction<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchData();
      setData(response);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [fetchData]);
  useEffect(() => {
    refetch();
  }, [refetch]);
  return { data, loading, error, setData, refetch };
};
