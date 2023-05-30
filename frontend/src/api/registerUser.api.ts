import { IRegisterFormValues } from "../pages/Register/Register";

export const registerUserAPI = (
  user: IRegisterFormValues,
  role: "ADMIN" | "USER"
) =>
  fetch(process.env.REACT_APP_API_URL + "/users", {
    method: "POST",
    body: JSON.stringify({ ...user, role }),
    headers: {
      "Content-Type": "application/json",
    },
  });
