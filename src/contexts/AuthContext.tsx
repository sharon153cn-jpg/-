import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { UserRole } from '../types';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  role: 'student',
  setRole: () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  // Defaulting role to 'student', could be pulled from user metadata if configured
  const [role, setRole] = useState<UserRole>('student');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user?.user_metadata?.role) {
         setRole(session.user.user_metadata.role as UserRole);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user?.user_metadata?.role) {
         setRole(session.user.user_metadata.role as UserRole);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    role,
    setRole: async (newRole: UserRole) => {
      // In a real app this would update the user metadata in Supabase
      // Here we just update local state, and you can also implement metadata update
      setRole(newRole);
      if (user) {
        await supabase.auth.updateUser({
          data: { role: newRole }
        });
      }
    },
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
