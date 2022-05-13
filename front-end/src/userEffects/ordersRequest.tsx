import {IOrders} from "../components/orders/Orders";

export interface IOrdersRequest{
  sessionId: string;

}
export interface IOrdersResponse{
  status: number;
  orders?: Array<IOrders>
  errorText?: string;
}


export const orders = (data: IOrdersRequest): Promise<IOrdersResponse> => {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  };

  return fetch("/orders", requestOptions)
    .then(res => {

      return res.json();
    }, err => err.json());
};
