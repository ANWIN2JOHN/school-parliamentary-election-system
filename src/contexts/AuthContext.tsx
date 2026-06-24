import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

import { supabase } from "@/services/supabase";

interface AuthContextValue {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (
    username: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(
  null
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] =
    useState(
      localStorage.getItem("admin-auth") ===
      "true"
    );

  const login = useCallback(
    async (
      username: string,
      password: string
    ): Promise<boolean> => {
      try {
        const { data, error } = await supabase
          .from("admins")
          .select("*")
          .eq("username", username)
          .eq("password", password)
          .maybeSingle();

        if (error) {
          console.error(
            "Login error:",
            error
          );
          return false;
        }

        if (!data) {
          console.warn(
            "Invalid username or password"
          );
          return false;
        }

        setIsAuthenticated(true);

        localStorage.setItem(
          "admin-auth",
          "true"
        );

        return true;
      } catch (err) {
        console.error(
          "Authentication failed:",
          err
        );
        return false;
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("admin-auth");
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin: isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return ctx;
}