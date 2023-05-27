import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { InitialUserData } from "./index";

function App() {
  const token = useLoaderData() as InitialUserData;

  console.log("token");
  console.log(token);

  return (
    <AuthContext>
      <header></header>
      <Outlet />
    </AuthContext>
  );
}

export default App;
