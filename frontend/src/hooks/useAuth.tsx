import React, { createContext, useContext, useState, useEffect } from 'react';
import { authStorage, type User } from '../lib/auth';
import { apiClient } from '../lib/apiClient';
import toast from 'react-hot-toast';
import { getApiErrorMessage } from '../lib/apiError';

type AuthContextValue = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>; // ✅ return success
  register: (data: { email: string; password: string; fullName?: string }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => authStorage.getUser());
  const [token, setToken] = useState<string | null>(() => authStorage.getToken());
  const [loading, setLoading] = useState(false);

  // ================= LOGIN =================
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await apiClient.post('/auth/login', { email, password });

      const { token: t, email: e, fullName, role } = res.data as {
        token: string;
        email: string;
        fullName?: string;
        role?: string;
      };

      const u: User = { email: e, fullName, role };

      authStorage.setToken(t);
      authStorage.setUser(u);
      setToken(t);
      setUser(u);

      toast.success(`Welcome back${u.fullName ? `, ${u.fullName}` : ''}!`);
      return true; // ✅ success
    } catch (err) {
      toast.error(getApiErrorMessage(err));
      return false; // ❌ fail (NO throw)
    } finally {
      setLoading(false);
    }
  };

  // ================= REGISTER =================
  const register = async (data: {
    email: string;
    password: string;
    fullName?: string;
  }): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await apiClient.post('/auth/register', data);

      if (res.data?.token) {
        const { token: t, email: e, fullName, role } = res.data as {
          token: string;
          email: string;
          fullName?: string;
          role?: string;
        };

        const u: User = { email: e, fullName, role };

        authStorage.setToken(t);
        authStorage.setUser(u);
        setToken(t);
        setUser(u);

        toast.success('Account created successfully!');
        return true;
      } else {
        toast.success('Registered successfully. Please login.');
        return true;
      }
    } catch (err) {
      toast.error(getApiErrorMessage(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    authStorage.clear();
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    // optional: /auth/me later
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
};
