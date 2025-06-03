'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';
// import { signInUser as apiSignInUser } from '@/lib/api'; // Placeholder for actual login

interface User {
  id: string;
  email: string;
  universityId: string; // Assuming JWT contains this
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (credentials: any) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(Cookies.get('jwt_token') || null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loadUserFromCookies = async () => {
      const tokenFromCookie = Cookies.get('jwt_token');
      if (tokenFromCookie) {
        setToken(tokenFromCookie);
        try {
          // In a real app, you would verify the token with the backend or decode it to get user info
          // For now, if a token exists, we'll assume it's valid and try to parse a mock user or fetch user profile.
          // This part needs to be robust: fetch /users/me from backend using the token.
          // const profile = await apiClient.get('/users/me'); // apiClient needs to be configured
          // setUser(profile.data);
          // For this starter, we'll decode a mock user if token exists
          // const mockUser: User = { id: 'mock-user-id', email: 'user@example.com', universityId: 'mock-uni-id' };
          // Try to parse JWT (very basic, not for production without validation)
          try {
            const base64Url = tokenFromCookie.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const decodedPayload = JSON.parse(jsonPayload);
            setUser({id: decodedPayload.sub, email: decodedPayload.email, universityId: decodedPayload.universityId });
          } catch (e) {
             // If token is 'fake_jwt_token_for_testing' (from mock signInUser)
            if (tokenFromCookie === 'fake_jwt_token_for_testing') {
                 setUser({ id: "user-uuid", email: "admin@uconakry.com", universityId: "tenant-uuid-uconakry" });
            } else {
                console.warn("Failed to parse token or token is invalid, signing out.");
                Cookies.remove('jwt_token');
                setToken(null);
                setUser(null);
            }
          }

        } catch (error) {
          console.error('Failed to load user from token', error);
          Cookies.remove('jwt_token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    loadUserFromCookies();
  }, [token]);

  useEffect(() => {
    if (!isLoading && !user && !pathname.startsWith('/(auth)') && pathname !== '/onboarding/university' && pathname !== '/') {
      router.push('/(auth)/sign-in');
    }
    if (!isLoading && user && (pathname.startsWith('/(auth)/sign-in') || pathname === '/onboarding/university')) {
      router.push(`/(dashboard)/${user.universityId}`);
    }
  }, [user, isLoading, pathname, router]);


  const signIn = async (credentials: any) => {
    try {
      // This needs a proper backend /auth/login endpoint
      // const { access_token, user: loggedInUser } = await apiSignInUser(credentials);
      // For now, using the mock from api/index.ts
      const { access_token, user: loggedInUser } = await import('@/lib/api').then(mod => mod.signInUser(credentials));

      Cookies.set('jwt_token', access_token, { expires: 1 }); // Expires in 1 day
      setToken(access_token);
      setUser(loggedInUser);
      router.push(`/(dashboard)/${loggedInUser.universityId}`);
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error; // Re-throw to be caught by the form
    }
  };

  const signOut = () => {
    Cookies.remove('jwt_token');
    setToken(null);
    setUser(null);
    router.push('/(auth)/sign-in');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
