import { PageResponse } from "../types/commons/PageResponse";
import { CategoryResponse } from "../types/categories/CategoryResponse";
import axiosClient from "../utils/AxiosClient";

const categoriesPath = 'api/v1/categories';

const categoryService = {
  findCategories: (page: number, size: number) =>
    axiosClient
      .get<PageResponse<CategoryResponse>>(`/${categoriesPath}?page=${page}&size=${size}`)
      .then((response) => response.data),
};

export default categoryService;
