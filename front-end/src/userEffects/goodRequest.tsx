import {IGood} from "../components/goods/Goods";


export interface IGoodToCard {
  id: number;
  count: number;
}

export interface IGoodsToCard {
  card: Array<IGoodToCard>;
}
export interface IGoodRequest{
  id: number;
}
export interface IGoodResponse{
  status: number;
  good?: IGood;
  errorText?: string;
}


export const goodRequest = (data: IGoodRequest): Promise<IGoodResponse> => {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  };

  return fetch("/good", requestOptions)
    .then(res => {

      return res.json();
    }, err => err.json());
};