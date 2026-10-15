import * as yup from "yup";

export const registerSchema = yup
  .object({
    username: yup
      .string()
      .required("Username is a required field")
      .min(5, "Username must be at least 5 characters long"),
    email: yup
      .string()
      .required("Email Address is a required field")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address",
      ),
    password: yup
      .string()
      .required("Password is a required field")
      .min(6, "Password must be at least 6 characters long"),
  })
  .required();

export const loginSchema = yup
  .object({
    identifier: yup
      .string()
      .required("Email Address is a required field")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address",
      ),
    password: yup
      .string()
      .required("Password is a required field")
      .min(6, "Password must be at least 6 characters long"),
  })
  .required();
