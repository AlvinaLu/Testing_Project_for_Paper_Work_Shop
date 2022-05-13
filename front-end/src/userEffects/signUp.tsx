import {Simulate} from "react-dom/test-utils";

export interface IUserRequest{
  name: string;
  surname: string;
  email: string;
  password: string
}
export interface IUserResponse{
  status: number;
  sessionId?: string;
  adminId?: string;
  errorText?: string;
}


export const signUp = (data: IUserRequest): Promise<IUserResponse> => {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  };

  return fetch("/signUp", requestOptions)
    .then(res => {
           return res.json();
    });
};
