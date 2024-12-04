import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from '../../../declarations/terra_backend';

interface AuthContextType {
  isAuthenticated: boolean;
  principal: string | null;
  userProfile: UserProfile | null;
  login: (provider: 'internet-identity' | 'nfid') => Promise<void>;
  logout: () => Promise<void>;
}

interface UserProfile {
  id: string;
  username: string;
  adoptions: number[];
  contributions: number;
  badges: string[];
  balance: number;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  principal: null,
  userProfile: null,
  login: async () => {},
  logout: async () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);

  useEffect(() => {
    const initAuthClient = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);

      // Check if already authenticated
      if (await client.isAuthenticated()) {
        const identity = client.getIdentity();
        const principalId = identity.getPrincipal().toString();
        setPrincipal(principalId);
        setIsAuthenticated(true);
        
        // Try to fetch user profile
        await fetchUserProfile(principalId);
      }
    };

    initAuthClient();
  }, []);

  const fetchUserProfile = async (principalId: string) => {
    try {
      const backend = createActor(principalId);
      const profile = await backend.getUserProfile();
      
      if (profile) {
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const login = async (provider: 'internet-identity' | 'nfid') => {
    if (!authClient) return;

    const options = {
      identityProvider: 
        provider === 'internet-identity' 
          ? "https://identity.ic0.app/#authorize" 
          : "https://nfid.one/authenticate"
    };

    await new Promise((resolve, reject) => {
      authClient.login({
        ...options,
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const principalId = identity.getPrincipal().toString();
          
          setPrincipal(principalId);
          setIsAuthenticated(true);

          // Check if user profile exists
          const backend = createActor(principalId);
          try {
            const profile = await backend.getUserProfile();
            
            if (profile) {
              setUserProfile(profile);
              resolve(true);
            } else {
              // Trigger onboarding modal
              resolve(false);
            }
          } catch (error) {
            console.error('Login error:', error);
            reject(error);
          }
        },
        onError: (error) => {
          console.error('Authentication error:', error);
          reject(error);
        }
      });
    });
  };

  const logout = async () => {
    if (authClient) {
      await authClient.logout();
      setIsAuthenticated(false);
      setPrincipal(null);
      setUserProfile(null);
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      principal,
      userProfile,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);