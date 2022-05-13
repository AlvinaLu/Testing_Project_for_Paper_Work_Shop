
export interface IPersonalRequest{
  sessionId: string;
}

export interface IPersonalResponse{
  status: number;
  name: string;
  surname: string;
  email: string;
  errorText?: string;
}


export const personalRequest = (data: IPersonalRequest): Promise<IPersonalResponse> => {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  };

  return fetch("/personal", requestOptions)
    .then(res => {

      return res.json();
    }, err => err.json());
};