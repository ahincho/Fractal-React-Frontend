import { OrderDetailResponse } from "../types/orders/OrderDetailResponse";
import axiosClient from "../utils/AxiosClient";

const detailsPath = 'api/v1/orders/details';

const detailService = {
  findDetails: (orderId: number) =>
    axiosClient.get<OrderDetailResponse>(`/${detailsPath}/${orderId}`)
    .then((response) => response.data),
};

export default detailService;
