import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./pages/Login/Login";
import App from "./App";

export interface InitialUserData {
  token: string;
  role: "ADMIN" | "USER";
  userId: string;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async ({ request }) => {
      const token = window.localStorage.getItem("user_token");

      if (!token) return redirect("/login");

      const userProfile = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/profile`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!userProfile.ok) {
        return redirect("/login");
      }

      const user: InitialUserData = await userProfile.json();

      return {
        token,
        role: user.role,
        userId: user.userId,
      };
    },
  },
  {
    element: <Login />,
    path: "/login",
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
