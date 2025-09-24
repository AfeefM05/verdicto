'use client';

import React, { useState, useEffect } from 'react';
import { Scale, Shield, Zap, Brain, CheckCircle, ArrowRight, Sparkles, Users, Clock, Award } from 'lucide-react';

const AuthShowcase = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze legal documents with 99.9% accuracy",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your sensitive legal data is protected with enterprise-grade encryption",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process complex legal documents in seconds, not hours",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Scale,
      title: "Legal Expertise",
      description: "Built by legal professionals and trained on millions of precedents",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const stats = [
    { number: "10M+", label: "Documents Processed", icon: Scale },
    { number: "99.9%", label: "Accuracy Rate", icon: CheckCircle },
    { number: "2.5s", label: "Average Response", icon: Clock },
    { number: "500+", label: "Law Firms", icon: Users }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="relative h-full flex flex-col justify-center px-8 lg:px-12">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10">
        {/* Logo and Brand */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-4 mb-6 mt-10">
           
          </div>
        </div>

        {/* Animated Feature Showcase */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="relative h-32 mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${features[currentFeature].color} rounded-2xl flex items-center justify-center shadow-2xl group hover:scale-110 transition-transform duration-500`}>
                  {React.createElement(features[currentFeature].icon, { className: "w-10 h-10 text-white group-hover:rotate-12 transition-transform" })}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {features[currentFeature].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {features[currentFeature].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Dots */}
        <div className="flex justify-center gap-2 mb-12">
          {features.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentFeature 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-400'
              }`}
            />
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${0.8 + index * 0.1}s` }}
            >
              <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {stat.number}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Enterprise Ready</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Shield className="w-4 h-4 text-blue-500" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Award className="w-4 h-4 text-purple-500" />
              <span>Industry Leader</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Join thousands of legal professionals who trust Verdicto
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-500">
              <Sparkles className="w-3 h-3" />
              <span>Start your free trial today</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthShowcase;
