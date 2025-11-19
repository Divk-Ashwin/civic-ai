"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  role: "citizen" | "admin" | "ngo";
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, role: "citizen" | "admin" | "ngo") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("civicai_user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("civicai_user");
      }
    }
  }, []);

  const login = (email: string, role: "citizen" | "admin" | "ngo") => {
    const userData: User = {
      name: email.split("@")[0],
      email,
      role,
    };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("civicai_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("civicai_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
