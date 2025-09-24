"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, FileSearch, Gavel, Sparkles, Zap, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import heroBg from "@/assets/hero-bg-enhanced.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Light mode: Enhanced image with better visibility */}
        <Image 
          src={heroBg} 
          alt="AI Legal Technology Background" 
          fill
          priority
          className="object-cover animate-fade-in dark:hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/30 to-primary/40 dark:hidden" />
        
        {/* Dark mode: Enhanced gradient background */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/90 to-purple-900/70" />
        
        {/* Enhanced Animated Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating Particles with Modern Animation */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-secondary-light rounded-full animate-particle-dance opacity-70" />
          <div className="absolute top-40 right-20 w-3 h-3 bg-white rounded-full animate-float-gentle opacity-60" />
          <div className="absolute top-60 left-1/4 w-2 h-2 bg-primary-light rounded-full animate-wave opacity-90" />
          <div className="absolute bottom-40 right-10 w-5 h-5 bg-secondary rounded-full animate-scale-bounce opacity-70" />
          <div className="absolute bottom-20 left-20 w-3 h-3 bg-white rounded-full animate-particle-dance opacity-80" />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-primary rounded-full animate-float-gentle opacity-60" />
          <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-secondary-light rounded-full animate-wave opacity-50" />
          
          {/* Geometric Shapes with Enhanced Animation */}
          <div className="absolute top-32 right-1/4 w-8 h-8 border-2 border-white/40 rotate-45 animate-rotate-3d opacity-70" />
          <div className="absolute bottom-32 left-1/3 w-6 h-6 border-2 border-secondary-light/50 animate-wave opacity-60" />
          <div className="absolute top-1/2 left-10 w-4 h-4 border border-primary-light/40 rounded-full animate-pulse-glow-enhanced opacity-50" />
          
          {/* Circuit-like connecting lines */}
          <div className="absolute top-1/4 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-enhanced" />
          <div className="absolute bottom-1/4 right-1/4 w-32 h-px bg-gradient-to-r from-transparent via-secondary-light/40 to-transparent animate-shimmer-enhanced" />
          
          {/* Larger decorative elements */}
          <div className="absolute top-16 right-16 w-16 h-16 border border-white/20 rounded-2xl rotate-12 animate-float-gentle opacity-30" />
          <div className="absolute bottom-16 left-16 w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-pulse-glow-enhanced opacity-40" />
        </div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        {/* Animated Badge */}
        <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl animate-pulse-glow-enhanced">
            <Brain className="h-8 w-8 text-secondary-light" />
          </div>
          <span className="text-lg font-medium tracking-wider uppercase text-white drop-shadow-lg">
            AI-Powered Legal Platform
          </span>
          <Sparkles className="h-6 w-6 text-white animate-spin" />
        </div>
        
        {/* Main Heading with Staggered Animation */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="block animate-fade-in-up">The Future of</span>
          <span className="block bg-gradient-to-r from-secondary-light via-white to-primary-light bg-clip-text text-transparent animate-fade-in-up animation-delay-1000">
            Legal Intelligence
          </span>
        </h1>
        
        {/* Subtitle with Enhanced Typography */}
        <div className="animate-fade-in-up animation-delay-2000">
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-white drop-shadow-lg">
            Transform your legal practice with AI-powered contract analysis, 
            predictive case outcomes, and intelligent virtual assistance. 
            <span className="font-semibold text-white">Built for modern law firms who demand excellence.</span>
          </p>
        </div>
        
        {/* CTA Buttons with Enhanced Animation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up animation-delay-3000">
          <Button 
            asChild
            size="lg" 
            className="bg-secondary hover:bg-secondary-dark text-white px-8 py-4 text-lg font-semibold shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-xl group hover-glow-enhanced"
          >
            <Link href="/dashboard">
              Enter AI Platform
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="bg-white/20 dark:bg-white/10 border-white/50 dark:border-white/30 text-white hover:bg-white/30 dark:hover:bg-white/20 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 group shadow-lg hover-glow-enhanced"
          >
            <Zap className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            Watch Demo
          </Button>
        </div>
        
        {/* Feature Highlights with Honest Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-glow group animate-fade-in-up animation-delay-4000">
            <div className="p-4 bg-gradient-primary rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <FileSearch className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-lg">Smart Contract Analysis</h3>
            <p className="text-white/90 text-center leading-relaxed drop-shadow-md">AI-powered clause extraction and risk assessment with advanced machine learning</p>
            <div className="mt-4 px-3 py-1 bg-success/20 text-success rounded-full text-sm font-medium">
              Advanced ML
            </div>
          </div>
          
          <div className="flex flex-col items-center p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-glow group animate-fade-in-up animation-delay-5000">
            <div className="p-4 bg-gradient-secondary rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Brain className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-lg">Case Prediction</h3>
            <p className="text-white/90 text-center leading-relaxed drop-shadow-md">Predict outcomes using advanced ML models trained on legal precedents</p>
            <div className="mt-4 px-3 py-1 bg-secondary/20 text-secondary-light rounded-full text-sm font-medium">
              ML Models
            </div>
          </div>
          
          <div className="flex flex-col items-center p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-glow group animate-fade-in-up animation-delay-6000">
            <div className="p-4 bg-primary-dark rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Gavel className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-lg">Virtual Assistant</h3>
            <p className="text-white/90 text-center leading-relaxed drop-shadow-md">AI assistant for clients and comprehensive case management tools</p>
            <div className="mt-4 px-3 py-1 bg-primary/20 text-primary-light rounded-full text-sm font-medium">
              AI Assistant
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 mb-24 animate-fade-in-up animation-delay-7000">
          <p className="text-sm text-white/80 mb-4 drop-shadow-md">Built for modern legal professionals</p>
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-white" />
              <span className="text-sm text-white/90 drop-shadow-sm">Secure Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-white" />
              <span className="text-sm text-white/90 drop-shadow-sm">Fast Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-white" />
              <span className="text-sm text-white/90 drop-shadow-sm">AI-Powered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;