"use client";
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from './Navbar';

const ConditionalLayout = ({ children }) => {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  
  // Don't show navbar on login page
  const isLoginPage = pathname === '/login';
  
  // Show navbar only if authenticated and not on login page
  const showNavbar = isAuthenticated && !isLoginPage && !isLoading;

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

export default ConditionalLayout;
