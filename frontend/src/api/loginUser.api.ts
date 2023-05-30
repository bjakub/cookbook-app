import { ILoginFormValues } from "../pages/Login/Login";

export const loginUserAPI = async (formData: ILoginFormValues) => {
  return fetch(process.env.REACT_APP_API_URL + "/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
