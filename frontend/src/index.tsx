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
import { CssBaseline, ThemeProvider as MUIThemeProvider } from "@mui/material";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { SignUp } from "./pages/SignUp/SignUp";
import { theme } from "./styles/theme";
import { Home } from "./pages/Home/Home";

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
        return redirect("/login");
      }

      return parsedToken;
    },
    children: [
      {
        element: <Home />,
        path: "home",
      },
    ],
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

      return redirect("/home");
    },
  },
  {
    element: <SignUp />,
    path: "/signUp",
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MUIThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </EmotionThemeProvider>
      </MUIThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
