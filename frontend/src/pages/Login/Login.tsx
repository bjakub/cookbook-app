import React from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const loginFetch = await fetch(
      process.env.REACT_APP_API_URL + "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({
          email: "jakub.bialecki123@gmail.com",
          password: "Somepassword123.",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!loginFetch.ok) return;

    const data = await loginFetch.json();

    window.localStorage.setItem(
      "user_token",
      JSON.stringify({
        access_token: data.access_token,
        exp: data.exp,
      })
    );

    return navigate("/");
  };

  return <button onClick={handleClick}>Click to login</button>;
};
