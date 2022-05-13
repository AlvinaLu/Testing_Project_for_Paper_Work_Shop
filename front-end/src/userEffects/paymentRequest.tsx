

export interface IPaymentRequest{
  sessionId: string;
}

export interface IPaymentResponse{
  status: number;
  sum?: number
  payment?: boolean;
  errorText?: string;
}


export const paymentRequest = (data: IPaymentRequest): Promise<IPaymentResponse> => {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  };

  return fetch("/payment", requestOptions)
    .then(res => {

      return res.json();
    }, err => err.json());
};