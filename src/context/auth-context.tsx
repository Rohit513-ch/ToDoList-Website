"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = async () => {
    if (!auth) {
      toast({
        variant: "destructive",
        title: "Configuration Error",
        description: "Firebase authentication is not configured. Please add your credentials to a .env.local file.",
      });
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/todo');
    } catch (error) {
      console.error("Error signing in with Google", error);
      toast({
        variant: "destructive",
        title: "Sign-in Error",
        description: "Could not sign in with Google. Please try again.",
      });
    }
  };

  const logout = async () => {
    if (!auth) {
      return;
    }
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out", error);
       toast({
        variant: "destructive",
        title: "Sign-out Error",
        description: "An error occurred while signing out.",
      });
    }
  };

  const value = { user, loading, signInWithGoogle, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
