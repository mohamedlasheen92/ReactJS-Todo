import type { ILoginInput, IRegisterInput } from "../interfaces";

export const registerFormData: IRegisterInput[] = [
  {
    name: "username",
    placeholder: "Username",
  },
  {
    name: "email",
    placeholder: "Email Address",
  },
  {
    name: "password",
    placeholder: "Email AdPassworddress",
  },
];

export const loginFormData: ILoginInput[] = [
  {
    name: "identifier",
    placeholder: "Email Address",
  },
  {
    name: "password",
    placeholder: "Password",
  },
];
