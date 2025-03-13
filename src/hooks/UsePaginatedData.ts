import { useEffect, useState } from "react";
import { PageInfo } from "../types/commons/PageInfo";
import { PageResponse } from "../types/commons/PageResponse";
import { PaginatedData } from "../types/commons/PaginatedData";
import { AxiosError  } from "axios";

export type FetchData<T> = (page: number, size: number) => Promise<PageResponse<T>>;

export const usePaginatedData = <T>(
  fetchData: FetchData<T>,
  initialPage: number = 0, 
  initialSize: number = 10
): PaginatedData<T> => {
  const [data, setData] = useState<T[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetchData(initialPage, initialSize);
        setData(response.items);
        setPageInfo({
          totalItems: response.totalItems,
          totalPages: response.totalPages,
          currentPage: response.currentPage,
          pageSize: response.pageSize,
          hasNextPage: response.hasNextPage,
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, [fetchData, initialPage, initialSize]);
  return { data, pageInfo, loading, error };
};
