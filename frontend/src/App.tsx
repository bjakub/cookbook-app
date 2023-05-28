import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { IToken } from "./index";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  const userInfo = useLoaderData() as IToken;

  return (
    <AuthContextProvider initialToken={userInfo.access_token}>
      {/* <header>{userInfo.userId}</header> */}
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
