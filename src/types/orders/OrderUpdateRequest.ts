import { DetailUpdateRequest } from "./DetailUpdateRequest";

export interface OrderUpdateRequest {
  username: string;
  details: DetailUpdateRequest[];
}
