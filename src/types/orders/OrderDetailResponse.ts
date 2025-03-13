import { DetailResponse } from "./DetailResponse";

export interface OrderDetailResponse {
  id: number;
  username: string;
  number: string;
  details: DetailResponse[];
  total: number;
  createdAt: string;
  updatedAt: string;
}
