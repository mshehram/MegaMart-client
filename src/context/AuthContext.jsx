/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Updated login to accept a user object {email, role}
  const login = (userObj) => {
    setUser(userObj);
    localStorage.setItem("loggedUser", JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
