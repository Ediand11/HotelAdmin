import { AxiosResponse } from "axios";
import { api } from "..";

interface ISignUp {
  username: string;
  email: string;
  password: string;
  name: string;
}

export interface RespLoginSuccess {
  username: string;
  email: string;
  error?: never;
}

export interface RespLoginError {
  error: any;
  username?: never;
  email?: never;
}

export type RespSign = RespLoginSuccess | RespLoginError;

export const signUpAdminUser = async ({ username, email, password, name }: ISignUp): Promise<RespSign> => {
  try {
    const response: AxiosResponse = await api.post(
      "/users/admin",
      {
        username: username,
        email: email,
        password: password,
        name: name,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};
