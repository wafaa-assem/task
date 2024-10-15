import { createContext, useEffect, useState } from "react";

export const authContext = createContext();
export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  console.log("token", token);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <authContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
