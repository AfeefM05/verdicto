"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Scale, Menu, X, User, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const getUserInitials = (email: string) => {
    return email.split('@')[0].substring(0, 2).toUpperCase();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-border/50 shadow-lg' 
        : 'bg-transparent backdrop-blur-none border-b-0 shadow-none'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-primary rounded-xl group-hover:animate-bounce-subtle transition-all duration-300">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <span className={`text-2xl font-bold transition-all duration-300 ${
              isScrolled 
                ? 'bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent drop-shadow-lg' 
                : 'bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent drop-shadow-lg'
            }`}>
              Verdicto
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                          {getUserInitials(user.email || 'U')}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.email}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          Signed in
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button 
                  asChild 
                  variant="outline" 
                  className={`font-medium transition-all duration-200 hover:scale-105 ${
                    isScrolled 
                      ? 'bg-background/80 border-border hover:bg-accent backdrop-blur-sm text-foreground' 
                      : 'bg-transparent border-transparent hover:bg-primary/10 text-primary shadow-none'
                  }`}
                >
                  <Link href="/auth">Sign In</Link>
                </Button>
                <Button 
                  asChild 
                  className={`font-medium px-6 transition-all duration-200 hover:scale-105  ${
                    isScrolled 
                      ? 'bg-gradient-primary text-white shadow-lg hover:shadow-xl' 
                      : 'bg-gradient-primary text-white shadow-2xl hover:shadow-2xl'
                  }`}
                >
                  <Link href="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                isScrolled 
                  ? 'text-foreground hover:bg-accent' 
                  : 'text-primary hover:bg-primary/10'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden animate-fade-in transition-all duration-300 ${
            isScrolled 
              ? 'bg-background/95 backdrop-blur-md border-t border-border' 
              : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-border/50'
          }`}>
            <div className="px-6 py-4 space-y-3">
              {user ? (
                <>
                  <div className="text-sm text-muted-foreground mb-2">
                    Signed in as {user.email}
                  </div>
                  <Button asChild variant="outline" className="w-full font-medium">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button onClick={handleSignOut} variant="destructive" className="w-full font-medium">
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="w-full font-medium bg-white/95 dark:bg-slate-800/95 border-white/30 dark:border-slate-700/30 hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 text-slate-900 dark:text-white shadow-lg">
                    <Link href="/auth">Sign In</Link>
                  </Button>
                  <Button asChild className="w-full bg-gradient-primary text-white font-medium shadow-xl">
                    <Link href="/auth">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;