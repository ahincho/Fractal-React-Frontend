import { PageResponse } from "../types/commons/PageResponse";
import { ProductCreateRequest } from "../types/products/ProductCreateRequest";
import { ProductResponse } from "../types/products/ProductResponse";
import axiosClient from "../utils/AxiosClient";

const productsPath = 'api/v1/products';

const productService = {
  createOneProduct: (data: ProductCreateRequest) => 
    axiosClient
      .post<ProductResponse>(`/${productsPath}`, data)
      .then((response) => response.data),
  findProducts: (page: number, size: number) =>
    axiosClient
      .get<PageResponse<ProductResponse>>(`/${productsPath}?page=${page}&size=${size}`)
      .then((response) => response.data),
};

export default productService;
