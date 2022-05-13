import {IItemToCard} from "../components/cart/CartCard";

export interface IItemsResponse{
  status: number;
  arrayItems: Array<IItemToCard>;
  errorText?: string;
}


export const cartRequest = (): Promise<IItemsResponse> => {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: window.localStorage.getItem("cart"),
  };

  return fetch("/cart", requestOptions)
    .then(res => {
            return res.json();
    }, err => err.json());
};