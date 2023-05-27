import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { InitialUserData } from "./index";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  const userInfo = useLoaderData() as InitialUserData;

  return (
    <AuthContextProvider initialToken={userInfo.token}>
      <header>{userInfo.userId}</header>
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
