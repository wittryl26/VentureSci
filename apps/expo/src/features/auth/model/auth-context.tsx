import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type AuthStatus = 'unauthenticated' | 'authenticated' | 'onboarding';

interface AuthUser {
  id: string;
  email: string;
  verified: boolean;
  phoneVerified: boolean;
}

interface AuthContextValue {
  status: AuthStatus;
  user?: AuthUser;
  signIn: (email: string) => void;
  signUp: (email: string) => void;
  signOut: () => void;
  completeOnboarding: () => void;
  verifyEmail: () => void;
  verifyPhone: () => void;
  requestPasswordReset: (email: string) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<AuthStatus>('unauthenticated');
  const [user, setUser] = useState<AuthUser | undefined>();

  const signIn = useCallback((email: string) => {
    setUser({ id: 'user-1', email, verified: false, phoneVerified: false });
    setStatus('onboarding');
  }, []);

  const signUp = useCallback((email: string) => {
    setUser({ id: 'user-2', email, verified: false, phoneVerified: false });
    setStatus('onboarding');
  }, []);

  const signOut = useCallback(() => {
    setUser(undefined);
    setStatus('unauthenticated');
  }, []);

  const completeOnboarding = useCallback(() => {
    setStatus('authenticated');
  }, []);

  const verifyEmail = useCallback(() => {
    setUser((current) => (current ? { ...current, verified: true } : current));
  }, []);

  const verifyPhone = useCallback(() => {
    setUser((current) => (current ? { ...current, phoneVerified: true } : current));
  }, []);

  const requestPasswordReset = useCallback((email: string) => {
    // stub for now: in production integrate Supabase auth reset
    setUser({ id: 'reset-request', email, verified: false, phoneVerified: false });
    setStatus('unauthenticated');
  }, []);

  const value = useMemo(
    () => ({
      status,
      user,
      signIn,
      signUp,
      signOut,
      completeOnboarding,
      verifyEmail,
      verifyPhone,
      requestPasswordReset,
    }),
    [status, user, signIn, signUp, signOut, completeOnboarding, verifyEmail, verifyPhone, requestPasswordReset],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
