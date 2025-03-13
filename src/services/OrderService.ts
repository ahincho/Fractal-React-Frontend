import { PageResponse } from "../types/commons/PageResponse";
import { OrderCreateRequest } from "../types/orders/OrderCreateRequest";
import { OrderResponse } from "../types/orders/OrderResponse";
import { OrderUpdateRequest } from "../types/orders/OrderUpdateRequest";
import axiosClient from "../utils/AxiosClient";

const ordersPath = 'api/v1/orders';

const orderService = {
  createOneOrder: (data: OrderCreateRequest) => 
    axiosClient
      .post<OrderResponse>(`/${ordersPath}`, data)
      .then((response) => response.data),
  findOrders: (page: number, size: number, username: string) =>
    axiosClient
      .get<PageResponse<OrderResponse>>(`/${ordersPath}?page=${page}&size=${size}&username=${username}`)
      .then((response) => response.data),
  findOneOrderById: (orderId: number) =>
    axiosClient.get<OrderResponse>(`/${ordersPath}/${orderId}`)
    .then((response) => response.data),
  updateOneOrderById: (orderId: number, data: OrderUpdateRequest) =>
    axiosClient.patch<void>(`/${ordersPath}/${orderId}`, data),
  deleteOneOrderById: (orderId: number) =>
    axiosClient.delete<void>(`/${ordersPath}/${orderId}`),
};

export default orderService;
