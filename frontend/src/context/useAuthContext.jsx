import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("game-hunter-user")) || null);

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>{ children }</AuthContext.Provider>
}