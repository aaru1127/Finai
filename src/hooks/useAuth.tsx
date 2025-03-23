
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isSignedIn: boolean;
  user: User | null;
  signIn: (email: string, password: string) => boolean;
  signUp: (name: string, email: string, password: string) => boolean;
  signOut: () => void;
}

const defaultUser = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com'
};

// Simple mock database for users
interface StoredUser extends User {
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Check local storage for existing session on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('finai-auth');
    if (storedAuth) {
      const { isSignedIn: storedSignedIn, user: storedUser } = JSON.parse(storedAuth);
      setIsSignedIn(storedSignedIn);
      setUser(storedUser);
    }
  }, []);

  // Update local storage when auth state changes
  useEffect(() => {
    localStorage.setItem('finai-auth', JSON.stringify({ isSignedIn, user }));
  }, [isSignedIn, user]);

  const signIn = (email: string, password: string) => {
    // Check if user exists in localStorage
    const storedUsers = localStorage.getItem('finai-users');
    if (storedUsers) {
      const users: StoredUser[] = JSON.parse(storedUsers);
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        // Using different variable name to avoid conflict
        const { password: pwd, ...userWithoutPassword } = foundUser;
        setIsSignedIn(true);
        setUser(userWithoutPassword);
        toast({
          title: "Successfully signed in",
          description: `Welcome back, ${foundUser.name}!`,
        });
        return true;
      } else {
        toast({
          title: "Sign in failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive"
        });
        return false;
      }
    } else {
      toast({
        title: "Sign in failed",
        description: "No registered users found. Please sign up first.",
        variant: "destructive"
      });
      return false;
    }
  };

  const signUp = (name: string, email: string, password: string) => {
    // Check if users collection exists in localStorage
    const storedUsers = localStorage.getItem('finai-users');
    let users: StoredUser[] = storedUsers ? JSON.parse(storedUsers) : [];
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      toast({
        title: "Sign up failed",
        description: "Email already registered. Please use a different email.",
        variant: "destructive"
      });
      return false;
    }
    
    // Create new user
    const newUser: StoredUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password
    };
    
    // Add user to collection
    users.push(newUser);
    localStorage.setItem('finai-users', JSON.stringify(users));
    
    // Auto sign in after signup - using different variable name to avoid conflict
    const { password: pwd, ...userWithoutPassword } = newUser;
    setIsSignedIn(true);
    setUser(userWithoutPassword);
    
    toast({
      title: "Account created successfully",
      description: `Welcome to FINAI, ${name}!`,
    });
    
    return true;
  };

  const signOut = () => {
    setIsSignedIn(false);
    setUser(null);
  };

  const value = {
    isSignedIn,
    user,
    signIn,
    signUp,
    signOut
  };

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
