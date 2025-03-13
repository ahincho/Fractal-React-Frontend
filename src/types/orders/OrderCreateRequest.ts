import { DetailCreateRequest } from "./DetailCreateRequest";

export interface OrderCreateRequest {
  username: string;
  details: DetailCreateRequest[];
}
