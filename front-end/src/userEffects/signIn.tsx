
export interface IUserAuthRequest{
  email: string;
  password: string
}
export interface IUserResponse{
  status: number;
  sessionId?: string;
  adminId?: string;
  errorText?: string;
}


export const signIn = (data: IUserAuthRequest): Promise<IUserResponse> => {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  };

  return fetch("/signIn", requestOptions)
    .then(res => {
          return res.json();
    }, err => err.json());
};