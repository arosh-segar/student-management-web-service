/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const cookies = new Cookies(null, { path: "/" });
  const navigate = useNavigate();
  const [token, setToken] = useState(cookies.get("accessToken"));
  const assignToken = (userToken) => {
    setToken(userToken);
  };
  const logout = () => {
    setToken(null);
    navigate("/login");
  };
  const isAuthenticated = !!token;
  return (
    <AuthContext.Provider value={{ isAuthenticated, assignToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
