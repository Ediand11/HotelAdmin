import { AxiosResponse } from "axios";
import { api } from "..";

interface ISignUp {
  username: string;
  email: string;
  password: string;
  name: string;
  role: string;
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

export const signUpAdminUser = async ({
  username,
  email,
  password,
  name,
  role,
}: ISignUp): Promise<RespSign> => {
  try {
    const response: AxiosResponse = await api.post(
      "/users/admin",
      {
        username: username,
        email: email,
        password: password,
        name: name,
        role: role,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};
