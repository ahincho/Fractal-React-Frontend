import { AxiosError } from "axios";
import { useState } from "react";

const useCreateData = <TRequest, TResponse>(
  postData: (data: TRequest) => Promise<TResponse>
) => {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const createData = async (data: TRequest) => {
    setLoading(true);
    try {
      const response = await postData(data);
      setData(response);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };
  return { createData, data, loading, error };
};

export default useCreateData;
