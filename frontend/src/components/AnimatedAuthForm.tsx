'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Scale, Sparkles, ArrowRight, Eye, EyeOff, Mail, Lock, User, CheckCircle, AlertCircle } from 'lucide-react';

interface AnimatedAuthFormProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, displayName: string) => Promise<void>;
  loading: boolean;
}

const AnimatedAuthForm = ({ onSignIn, onSignUp, loading }: AnimatedAuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'email') {
      setEmail(value);
      if (value && !validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    } else if (field === 'password') {
      setPassword(value);
      if (value && !validatePassword(value)) {
        setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters' }));
      } else {
        setErrors(prev => ({ ...prev, password: '' }));
      }
    } else if (field === 'displayName') {
      setDisplayName(value);
      if (value && value.length < 2) {
        setErrors(prev => ({ ...prev, displayName: 'Name must be at least 2 characters' }));
      } else {
        setErrors(prev => ({ ...prev, displayName: '' }));
      }
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsAnimating(true);
    await onSignIn(email, password);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !displayName) return;
    
    setIsAnimating(true);
    await onSignUp(email, password, displayName);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div ref={formRef} className="h-full flex items-center justify-center p-8 lg:p-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 bg-gradient-primary rounded-xl">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Welcome Back
            </h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Sign in to your account or create a new one
          </p>
        </div>

        <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-sm dark:bg-card/95 dark:border-border/30 dark:shadow-2xl dark:shadow-primary/10 animate-scale-in">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Get Started
            </CardTitle>
            <CardDescription>
              Access your intelligent legal workspace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 dark:bg-muted/30">
                <TabsTrigger value="signin" className="text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className={`transition-all duration-200 hover:border-primary/50 focus:border-primary dark:bg-background dark:border-border ${
                          errors.email ? 'border-destructive' : ''
                        }`}
                      />
                      {email && validateEmail(email) && (
                        <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-green-500" />
                      )}
                      {errors.email && (
                        <AlertCircle className="absolute right-3 top-3 w-4 h-4 text-destructive" />
                      )}
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                        className={`pr-10 transition-all duration-200 hover:border-primary/50 focus:border-primary dark:bg-background dark:border-border ${
                          errors.password ? 'border-destructive' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      {password && validatePassword(password) && (
                        <CheckCircle className="absolute right-10 top-3 w-4 h-4 text-green-500" />
                      )}
                      {errors.password && (
                        <AlertCircle className="absolute right-10 top-3 w-4 h-4 text-destructive" />
                      )}
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.password}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className={`w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300 group ${
                      isAnimating ? 'animate-pulse' : ''
                    }`}
                    disabled={loading || !email || !password || !!errors.email || !!errors.password}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-sm font-medium flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    <div className="relative">
                      <Input
                        id="displayName"
                        type="text"
                        placeholder="Enter your full name"
                        value={displayName}
                        onChange={(e) => handleInputChange('displayName', e.target.value)}
                        required
                        className={`transition-all duration-200 hover:border-primary/50 focus:border-primary dark:bg-background dark:border-border ${
                          errors.displayName ? 'border-destructive' : ''
                        }`}
                      />
                      {displayName && displayName.length >= 2 && (
                        <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-green-500" />
                      )}
                      {errors.displayName && (
                        <AlertCircle className="absolute right-3 top-3 w-4 h-4 text-destructive" />
                      )}
                    </div>
                    {errors.displayName && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.displayName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className={`transition-all duration-200 hover:border-primary/50 focus:border-primary dark:bg-background dark:border-border ${
                          errors.email ? 'border-destructive' : ''
                        }`}
                      />
                      {email && validateEmail(email) && (
                        <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-green-500" />
                      )}
                      {errors.email && (
                        <AlertCircle className="absolute right-3 top-3 w-4 h-4 text-destructive" />
                      )}
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                        className={`pr-10 transition-all duration-200 hover:border-primary/50 focus:border-primary dark:bg-background dark:border-border ${
                          errors.password ? 'border-destructive' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      {password && validatePassword(password) && (
                        <CheckCircle className="absolute right-10 top-3 w-4 h-4 text-green-500" />
                      )}
                      {errors.password && (
                        <AlertCircle className="absolute right-10 top-3 w-4 h-4 text-destructive" />
                      )}
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.password}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className={`w-full bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary transition-all duration-300 group ${
                      isAnimating ? 'animate-pulse' : ''
                    }`}
                    disabled={loading || !email || !password || !displayName || !!errors.email || !!errors.password || !!errors.displayName}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                    <Sparkles className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="text-center text-sm text-muted-foreground animate-fade-in animation-delay-1000">
              <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnimatedAuthForm;
