import { DetailCreateRequest } from "./DetailCreateRequest";

export interface OrderUpdateRequest {
  username: string;
  details: DetailCreateRequest[];
}
