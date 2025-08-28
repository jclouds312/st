
'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { createUser, findUserByUsername } from '@/lib/users';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  isAuthenticated: boolean;
  user: { username: string } | null;
  login: (username: string, pass: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, pass: string) => Promise<boolean>;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you'd check for a token in localStorage or a cookie
    // For this simulation, we'll check sessionStorage.
    try {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Could not parse user from sessionStorage", e);
      sessionStorage.removeItem('user');
    } finally {
        setIsLoading(false);
    }
  }, []);

  const login = async (username: string, pass: string): Promise<boolean> => {
    // --- THIS IS A SIMULATION ---
    // In a real app, you would send credentials to your backend,
    // which would verify them against a database.
    const foundUser = findUserByUsername(username);

    // We are comparing plain text passwords, which is VERY INSECURE.
    // A real app must use hashing (e.g., bcrypt).
    if (foundUser && foundUser.passwordHash === pass) {
      const userData = { username: foundUser.username };
      setUser(userData);
      sessionStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (username: string, pass: string): Promise<boolean> => {
    // --- THIS IS A SIMULATION ---
    const newUser = createUser(username, pass);
    return !!newUser;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
