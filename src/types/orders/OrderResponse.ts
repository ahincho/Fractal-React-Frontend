import { DetailResponse } from "./DetailResponse";

export interface OrderResponse {
  id: number;
  username: string;
  number: string;
  details: DetailResponse[];
  total: number;
  createdAt: string;
  updatedAt: string;
}
