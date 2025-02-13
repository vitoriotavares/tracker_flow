import { createBrowserClient } from '@supabase/ssr';
import { type User, AuthError } from '@supabase/supabase-js';

export type AuthUser = User;

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export class AuthenticationError extends Error {
  constructor(message: string, public originalError?: AuthError) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export const auth = {
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        switch (error.message) {
          case 'Invalid login credentials':
            throw new AuthenticationError('Email ou senha incorretos');
          case 'Email not confirmed':
            throw new AuthenticationError('Por favor, confirme seu email antes de fazer login');
          default:
            throw new AuthenticationError(
              'Ocorreu um erro ao fazer login. Tente novamente.',
              error
            );
        }
      }
      
      return data;
    } catch (err) {
      if (err instanceof AuthenticationError) {
        throw err;
      }
      throw new AuthenticationError('Ocorreu um erro inesperado. Tente novamente mais tarde.');
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new AuthenticationError('Erro ao fazer logout. Tente novamente.');
      }
    } catch (error) {
      throw new AuthenticationError('Ocorreu um erro inesperado ao fazer logout.', error instanceof AuthError ? error : undefined);
    }
  },

  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        throw new AuthenticationError('Erro ao recuperar sessão');
      }
      return session;
    } catch (error) {
      throw new AuthenticationError('Erro ao verificar sessão do usuário', error instanceof AuthError ? error : undefined);
    }
  },

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        throw new AuthenticationError('Erro ao recuperar usuário');
      }
      return user;
    } catch (error) {
      throw new AuthenticationError('Erro ao recuperar informações do usuário', error instanceof AuthError ? error : undefined);
    }
  },

  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user ?? null);
    });
  }
};
