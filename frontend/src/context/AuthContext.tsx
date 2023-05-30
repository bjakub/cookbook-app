import React, { createContext, useMemo, useState } from "react";

interface IOwnProps {
  children: React.ReactNode;
  initialToken: string;
}

export const AuthContext = createContext({
  token: "",
});

export const AuthContextProvider = (props: IOwnProps) => {
  const { children, initialToken } = props;

  const [token, setToken] = useState(initialToken);

  const value = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
