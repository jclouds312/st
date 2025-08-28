
'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

// --- Demo Users ---
const demoUsers = [
  { email: 'doctor@mediflow.com' },
  { email: 'admin@mediflow.com' },
  { email: 'paciente@mediflow.com' },
];
const SHARED_PASSWORD = '123456';
// --- End Demo Users ---


type User = {
    email: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, pass: string) => Promise<boolean>;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in from a previous session
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    if (loggedInUserEmail) {
      setUser({ email: loggedInUserEmail });
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    const foundUser = demoUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser && pass === SHARED_PASSWORD) {
        setUser({ email: foundUser.email });
        localStorage.setItem('loggedInUser', foundUser.email);
        return true;
    }
    return false;
  };

  const register = async (email: string, pass: string): Promise<boolean> => {
     toast({
        title: "Registro Deshabilitado",
        description: "El registro no está disponible en el modo de demostración. Utilice uno de los usuarios de prueba.",
     });
     return false;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
