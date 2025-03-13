export interface OrderResponse {
  id: number;
  username: string;
  number: string;
  status: string;
  total?: number;
  createdAt: Date;
  updatedAt: Date;
}
