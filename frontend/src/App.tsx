import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { IToken } from "./index";
import { AuthContextProvider } from "./context/AuthContext";
import { Header } from "./components/shared/Header/Header";

function App() {
  const userInfo = useLoaderData() as IToken;

  return (
    <AuthContextProvider initialToken={userInfo.access_token}>
      <Header />
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
