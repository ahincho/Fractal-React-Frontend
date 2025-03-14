import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";

export const useDeleteData = <TResponse>(
  deleteData: (id: number) => Promise<AxiosResponse<TResponse>>
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [data, setData] = useState<TResponse | null>(null);
  const deleteById = async (id: number) => {
    setLoading(true);
    try {
      const response = await deleteData(id);
      setData(response.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };
  return { deleteById, data, loading, error };
};

export default useDeleteData;
