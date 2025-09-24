"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import AnimatedAuthBackground from '@/components/AnimatedAuthBackground';
import AuthShowcase from '@/components/AuthShowcase';
import AnimatedAuthForm from '@/components/AnimatedAuthForm';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const router = useRouter();

  const from = '/dashboard';

  useEffect(() => {
    if (user) {
      router.push(from);
    }
  }, [user, router, from]);

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await signIn(email, password);
    if (!error) {
      router.push(from);
    }
    setLoading(false);
  };

  const handleSignUp = async (email: string, password: string, displayName: string) => {
    setLoading(true);
    await signUp(email, password, displayName);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Split Layout Container */}
      <div className="min-h-screen flex">
        {/* Left Side - Showcase (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          {/* Dark mode gets animated background */}
          <div className="dark:block hidden w-full h-full">
            <AnimatedAuthBackground isDark={true} />
            <AuthShowcase />
          </div>
          
          {/* Light mode gets animated background */}
          <div className="dark:hidden w-full h-full relative">
            <AnimatedAuthBackground isDark={false} />
            <AuthShowcase />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 relative">
          {/* Background for form side */}
          <div className="absolute inset-0">
            <div className="dark:hidden block w-full h-full">
              <AnimatedAuthBackground isDark={false} />
            </div>
            <div className="hidden dark:block w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
          </div>
          
          {/* Form Content */}
          <div className="relative z-10 h-full">
            <AnimatedAuthForm 
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}