'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Shield, Brain, FileSearch, Gavel } from 'lucide-react';
// removed unused heroBg and Image to clear warnings

const AnimatedIntro = () => {
  // cleaned unused state/effects to resolve build warnings

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-transparent">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Light mode solid background */}
        <div className="absolute inset-0 dark:hidden bg-white" />
        {/* Dark mode gradient matched to below sections */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

        {/* Fixed animated floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-4 h-4 bg-white/70 rounded-full animate-particle-float" />
          <div className="absolute top-40 right-20 w-3 h-3 bg-white rounded-full animate-bounce-gentle opacity-60" />
          <div className="absolute top-60 left-1/4 w-2 h-2 bg-white/80 rounded-full animate-float" />
          <div className="absolute bottom-40 right-10 w-5 h-5 bg-white/60 rounded-full animate-float" />
          <div className="absolute bottom-20 left-20 w-3 h-3 bg-white rounded-full animate-particle-float opacity-80" />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/70 rounded-full animate-float" />
          <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-white/60 rounded-full animate-bounce-gentle" />

          {/* Shapes */}
          <div className="absolute top-32 right-1/4 w-8 h-8 border-2 border-white/40 rotate-45 animate-rotate-3d opacity-70" />
          <div className="absolute bottom-32 left-1/3 w-6 h-6 border-2 border-white/30 animate-float opacity-60" />
          <div className="absolute top-1/2 left-10 w-4 h-4 border border-white/30 rounded-full animate-pulse-glow opacity-50" />
          <div className="absolute top-1/4 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-enhanced" />
          <div className="absolute bottom-1/4 right-1/4 w-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-enhanced" />
          <div className="absolute top-16 right-16 w-16 h-16 border border-white/20 rounded-2xl rotate-12 animate-float opacity-30" />
          <div className="absolute bottom-16 left-16 w-12 h-12 bg-white/10 rounded-full animate-pulse-glow opacity-40" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative mt-24 z-10 max-w-7xl mx-auto px-6 text-center text-slate-900 dark:text-white">
        {/* Animated Badge */}
        <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
          <div className="p-2 bg-white/70 dark:bg-white/10 backdrop-blur-sm rounded-xl animate-glow-pulse">
            <Brain className="h-8 w-8 text-slate-900 dark:text-white" />
          </div>
          <span className="text-lg font-medium tracking-wider uppercase text-slate-900 dark:text-white drop-shadow-lg">
            Next-Gen AI Legal Platform
          </span>
          <Sparkles className="h-6 w-6 text-slate-900 dark:text-white animate-pulse" />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="block animate-fade-in-up gradient-text-animated">
            The Future of
          </span>
          <span className="block animate-fade-in-up animation-delay-1000 gradient-text-animated">
            Legal Intelligence
          </span>
        </h1>

        {/* Subtitle */}
        <div className="animate-fade-in-delay-2">
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-slate-700 dark:text-white drop-shadow-lg">
            Revolutionize your legal practice with AI-powered contract analysis, 
            predictive case outcomes, and intelligent virtual assistance. 
            <span className="font-semibold text-slate-900 dark:text-white">Built for modern law firms who demand excellence.</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-delay-3">
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-elegant transition-all duration-300 hover:scale-105 hover:shadow-xl group ">
            <Link href="/dashboard">
              Enter AI Platform
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/30 text-slate-900 dark:text-white hover:bg-white dark:hover:bg-white/20 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 group shadow-lg">
            <Zap className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            Watch Demo
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center p-8 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-glow group animate-fade-in-delay-4">
            <div className="p-4 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <FileSearch className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white drop-shadow-lg">Smart Contract Analysis</h3>
            <p className="text-slate-700 dark:text-white/90 text-center leading-relaxed drop-shadow-md">AI-powered clause extraction and risk assessment with 98% accuracy</p>
            <div className="mt-4 px-3 py-1 bg-slate-100 dark:bg-white/15 text-slate-700 dark:text-white rounded-full text-sm font-medium">
              98% Accuracy
            </div>
          </div>
          <div className="flex flex-col items-center p-8 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-glow group animate-fade-in-delay-5">
            <div className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Brain className="h-12 w-12 text-white" />
        </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white drop-shadow-lg">Case Prediction</h3>
            <p className="text-slate-700 dark:text-white/90 text-center leading-relaxed drop-shadow-md">Predict outcomes with 85% accuracy using advanced ML models</p>
            <div className="mt-4 px-3 py-1 bg-slate-100 dark:bg-white/15 text-slate-700 dark:text-white rounded-full text-sm font-medium">
              85% Win Rate
            </div>
        </div>
          <div className="flex flex-col items-center p-8 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-glow group animate-fade-in-delay-6">
            <div className="p-4 bg-gradient-to-br from-cyan-600 to-teal-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Gavel className="h-12 w-12 text-white" />
        </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white drop-shadow-lg">Virtual Assistant</h3>
            <p className="text-slate-700 dark:text-white/90 text-center leading-relaxed drop-shadow-md">24/7 AI assistant for clients and comprehensive case management</p>
            <div className="mt-4 px-3 py-1 bg-slate-100 dark:bg-white/15 text-slate-700 dark:text-white rounded-full text-sm font-medium">
              24/7 Support
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 mb-24 animate-fade-in-delay-6">
          <p className="text-sm text-slate-600 dark:text-white/80 mb-4 drop-shadow-md">Trusted by leading law firms worldwide</p>
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-slate-700 dark:text-white" />
              <span className="text-sm text-slate-700 dark:text-white/90 drop-shadow-sm">Bank-Level Security</span>
              </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-slate-700 dark:text-white" />
              <span className="text-sm text-slate-700 dark:text-white/90 drop-shadow-sm">Real-Time Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-slate-700 dark:text-white" />
              <span className="text-sm text-slate-700 dark:text-white/90 drop-shadow-sm">AI-Powered</span>
        </div>
      </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedIntro;