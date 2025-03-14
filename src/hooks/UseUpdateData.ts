import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";

export const useUpdateData = <TRequest, TResponse>(
  updateData: (id: number, updatedData: TRequest) => Promise<AxiosResponse<TResponse>>
) => {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const updateById = async (id: number, updatedData: TRequest) => {
    setLoading(true);
    try {
      const response = await updateData(id, updatedData);
      setData(response.data);
    } catch (err) {
      setError(err as AxiosError);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { updateById, data, loading, error };
};

export default useUpdateData;
