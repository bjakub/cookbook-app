import { IRegisterFormValues } from "../pages/SignUp/SignUp";

export const signUpUserAPI = (
  user: IRegisterFormValues,
  role: "ADMIN" | "USER"
) =>
  fetch(process.env.REACT_APP_API_URL + "/auth/signUp", {
    method: "POST",
    body: JSON.stringify({ ...user, role }),
    headers: {
      "Content-Type": "application/json",
    },
  });
