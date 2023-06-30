'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { client } from '@/src/rspc';

import type { User } from '@/types/user';

type AuthContextProps = {
  token: string | null;
  user: User | null;
  authGitHubToken: (token: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
};

export const AuthContext = createContext<AuthContextProps>({
  token: '',
  user: null,
  authGitHubToken: () => {},
  error: null,
  setError: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);

    if (!token) {
      router.push('/login');
    }
  }, [router, token]);

  useEffect(() => {
    const handleCookieChange = () => {
      const newToken = localStorage.getItem('token');
      setToken(newToken);
    };

    window.addEventListener('storage', handleCookieChange);

    return () => {
      window.removeEventListener('storage', handleCookieChange);
    };
  }, []);

  const authGitHubToken = async (token: string) => {
    const user = await client.query(['validate_token', token]);

    if (user) {
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
    } else {
      setError('Invalid token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        authGitHubToken,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
