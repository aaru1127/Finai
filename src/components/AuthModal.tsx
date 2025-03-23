
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { useAuth } from '@/hooks/useAuth';

interface AuthModalProps {
  trigger?: React.ReactNode;
  defaultView?: 'signin' | 'signup';
  onAuthenticated?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  trigger, 
  defaultView = 'signin',
  onAuthenticated
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'signin' | 'signup'>(defaultView);
  const { isSignedIn } = useAuth();
  
  // Handle success (close the modal)
  const handleSuccess = () => {
    setIsOpen(false);
    if (onAuthenticated) onAuthenticated();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <button>Sign In</button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {view === 'signin' ? 'Sign In to FINAI' : 'Create FINAI Account'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {view === 'signin' 
              ? 'Enter your credentials to access your account' 
              : 'Fill in your details to create an account'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <AnimatePresence mode="wait">
            {view === 'signin' ? (
              <SignInForm 
                key="signin" 
                onSuccess={handleSuccess} 
                onSwitch={() => setView('signup')} 
              />
            ) : (
              <SignUpForm 
                key="signup" 
                onSuccess={handleSuccess} 
                onSwitch={() => setView('signin')} 
              />
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
