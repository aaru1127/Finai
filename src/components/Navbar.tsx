
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import AuthModal from './AuthModal';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn, signOut, user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out of your account.",
    });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-2xl font-bold text-finance-600">FINAI</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#dashboard">Dashboard</NavLink>
            <NavLink href="#budget">Budget</NavLink>
            <NavLink href="#investments">Investments</NavLink>
            <NavLink href="#insights">Insights</NavLink>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-gray-700">
                  <User className="inline-block mr-1 h-4 w-4" /> 
                  {user?.name || 'User'}
                </div>
                <Button variant="ghost" size="sm" className="text-sm font-medium" onClick={handleSignOut}>
                  <LogOut className="mr-1 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <AuthModal 
                  trigger={
                    <Button variant="ghost" size="sm" className="text-sm font-medium">
                      <LogIn className="mr-1 h-4 w-4" />
                      Sign In
                    </Button>
                  }
                  defaultView="signin"
                />
                <AuthModal
                  trigger={
                    <Button 
                      size="sm" 
                      className="text-sm bg-finance-600 hover:bg-finance-700 text-white"
                    >
                      Get Started
                    </Button>
                  }
                  defaultView="signup"
                />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t border-gray-100 shadow-sm"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            <MobileNavLink href="#dashboard" onClick={() => setIsMobileMenuOpen(false)}>
              Dashboard
            </MobileNavLink>
            <MobileNavLink href="#budget" onClick={() => setIsMobileMenuOpen(false)}>
              Budget
            </MobileNavLink>
            <MobileNavLink href="#investments" onClick={() => setIsMobileMenuOpen(false)}>
              Investments
            </MobileNavLink>
            <MobileNavLink href="#insights" onClick={() => setIsMobileMenuOpen(false)}>
              Insights
            </MobileNavLink>
            <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
              {isSignedIn ? (
                <>
                  <div className="text-sm font-medium text-gray-700 py-2">
                    <User className="inline-block mr-1 h-4 w-4" /> 
                    {user?.name || 'User'}
                  </div>
                  <Button variant="ghost" size="sm" className="justify-center" onClick={handleSignOut}>
                    <LogOut className="mr-1 h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <AuthModal
                    trigger={
                      <Button variant="ghost" size="sm" className="justify-center">
                        <LogIn className="mr-1 h-4 w-4" />
                        Sign In
                      </Button>
                    }
                    defaultView="signin"
                  />
                  <AuthModal
                    trigger={
                      <Button 
                        size="sm" 
                        className="justify-center bg-finance-600 hover:bg-finance-700 text-white"
                      >
                        Get Started
                      </Button>
                    }
                    defaultView="signup"
                  />
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a
      href={href}
      className="text-sm font-medium text-gray-700 hover:text-finance-600 transition-colors duration-200"
    >
      {children}
    </a>
  );
};

const MobileNavLink = ({ 
  href, 
  onClick, 
  children 
}: { 
  href: string; 
  onClick: () => void;
  children: React.ReactNode 
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-finance-600 transition-colors duration-200"
    >
      {children}
    </a>
  );
};

export default Navbar;
