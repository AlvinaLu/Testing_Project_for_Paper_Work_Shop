import {IGood} from "../components/goods/Goods";
import {Category} from "../components/Categories";

export interface ICategoryRequest{
  message: string;
}
export interface ICategoryResponse{
  status: number;
  arrayCategories?: Array<Category>;
  errorText?: string;
}


export const categoriesRequest = (data: ICategoryRequest): Promise<ICategoryResponse> => {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  };

  return fetch("/categories", requestOptions)
    .then(res => {
      return res.json();
    }, err => err.json());
};