import { createContext, useEffect, useState } from "react";
import { create, setAuthToken } from "../api/apiWrapper";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const [currentRole, setCurrentRole] = useState(() => {
    const savedRole = localStorage.getItem("currentRole");
    return savedRole || "unknown_user";
  });

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      //   localStorage.setItem("accessToken", token);
    } else {
      setAuthToken(null);
      //   localStorage.removeItem("accessToken");
    }
  }, [token]);

  useEffect(() => {
    if (user?.roles?.length) {
      const defaultRole = user?.roles[0].role?.nameEn?.toLowerCase();
      setCurrentRole(defaultRole);
      localStorage.setItem("currentRole", defaultRole);
    }
  }, [user]);

  const login = (user, token) => {
    setUser(user);
    setToken(token);
  };

  const changeRole = (role) => {
    setCurrentRole(role);
    localStorage.setItem("currentRole", role);
  };

  const logout = async () => {
    try {
      await create("auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    }

    setUser(null);
    setToken("");
    setCurrentRole("unknown_user");

    localStorage.removeItem("currentRole");
    //   localStorage.removeItem("accessToken");

    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        currentRole,
        setUser,
        login,
        logout,
        changeRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
