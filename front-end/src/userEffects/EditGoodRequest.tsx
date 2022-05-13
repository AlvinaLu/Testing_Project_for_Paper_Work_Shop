import {IGood} from "../components/goods/Goods";

export interface IEditGoodRequest{
  adminId: string,
  sessionId: string,
  id: number,
  name: string,
  amount: number,
  description: string
}
export interface IEditGoodResponse{
  status: number;
  errorText?: string;
}


export const editGoodsRequest = (data: IEditGoodRequest): Promise<IEditGoodResponse> => {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  };

  return fetch("/editGood", requestOptions)
    .then(res => {
            return res.json();
    }, err => err.json());
};