'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar se há um usuário salvo no localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implementar chamada real à API de autenticação
      const mockUser = {
        id: '1',
        email: email,
        name: 'Usuário Teste',
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      // Adicionar um cookie para o middleware
      document.cookie = 'auth=true; path=/';
      router.push('/');
      router.refresh(); // Força uma atualização da navegação
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Remover o cookie de autenticação
    document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/login');
    router.refresh(); // Força uma atualização da navegação
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
