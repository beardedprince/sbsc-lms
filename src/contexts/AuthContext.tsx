import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "employee" | "l&d_admin" | "it_admin" | "management" | "hr";

export interface User {
  id: string;
  staffId: string;
  name: string;
  email: string;
  department: string;
  role: UserRole;
  grade: string;
  unit: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (staffId: string, email: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: "1",
  staffId: "STF-2024-0042",
  name: "Adaeze Okonkwo",
  email: "adaeze.okonkwo@bank.com",
  department: "Retail Banking",
  role: "employee",
  grade: "Senior Associate",
  unit: "Customer Experience",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (_staffId: string, _email: string) => {
    setUser(MOCK_USER);
  };

  const logout = () => setUser(null);

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
