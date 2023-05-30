export const getUserProfileAPI = (token: string) =>
  fetch(process.env.REACT_APP_API_URL + "/auth/profile", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
