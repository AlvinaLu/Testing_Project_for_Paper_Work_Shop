import {IOrders} from "../components/orders/Orders";
import {IClientOrders} from "../components/clientOrders/ClientOrders";

export interface IClientOrdersRequest{
  sessionId: string;

}
export interface IClientOrdersResponse{
  status: number;
  orders?: Array<IClientOrders>
  errorText?: string;
}


export const clientOrders = (data: IClientOrdersRequest): Promise<IClientOrdersResponse> => {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  };

  return fetch("/clientOrders", requestOptions)
    .then(res => {
          return res.json();
    }, err => err.json());
};
