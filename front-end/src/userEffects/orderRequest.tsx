import {IItemToCard} from "../components/cart/CartCard";
import {IOrder} from "../components/order/Order";

export interface IOrderRequest{
  sessionId: string;
  delivery: string;
  payment: string;
  cart: Map<string, number>;
  shipping: IOrder;
}

export interface IOrderResponse{
  status: number;
  sum?: number;
  errorText?: string;
}


export const orderRequest = (data: IOrderRequest): Promise<IOrderResponse> => {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  };

  return fetch("/order", requestOptions)
    .then(res => {

      return res.json();
    });
};