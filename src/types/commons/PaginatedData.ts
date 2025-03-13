import { AxiosError } from "axios";
import { PageInfo } from "./PageInfo";

export interface PaginatedData<T> {
  data: T[];
  pageInfo: PageInfo | null;
  loading: boolean;
  error: AxiosError | null;
}
