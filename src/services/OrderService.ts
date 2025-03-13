import { PageResponse } from "../types/commons/PageResponse";
import { OrderCreateRequest } from "../types/orders/OrderCreateRequest";
import { OrderResponse } from "../types/orders/OrderResponse";
import axiosClient from "../utils/AxiosClient";

const ordersPath = 'api/v1/orders';

const orderService = {
  createOneOrder: (data: OrderCreateRequest) => 
    axiosClient
      .post<OrderCreateRequest>(`/${ordersPath}`, data)
      .then((response) => response.data),
  findOrders: (page: number, size: number, username: string) =>
    axiosClient
      .get<PageResponse<OrderResponse>>(`/${ordersPath}?page=${page}&size=${size}&username=${username}`)
      .then((response) => response.data),
};

export default orderService;
