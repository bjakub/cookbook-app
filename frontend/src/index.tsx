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
import { QueryClient, QueryClientProvider } from "react-query";

export interface IToken {
  access_token: string;
  exp: number;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      const token: string | null = window.localStorage.getItem("user_token");

      if (!token) return redirect("/login");

      const parsedToken: IToken = JSON.parse(token);

      if (parsedToken.exp < Date.now()) {
        window.localStorage.removeItem("user_token");
        return redirect("/");
      }

      return parsedToken;
    },
  },
  {
    element: <Login />,
    path: "/login",
    loader: async () => {
      const token: string | null = window.localStorage.getItem("user_token");

      if (!token) return null;

      const parsedToken: IToken = JSON.parse(token);

      if (parsedToken.exp < Date.now()) {
        window.localStorage.removeItem("user_token");
        return null;
      }

      return redirect("/");
    },
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
