'use client';

import { 
  Brain, 
  Shield, 
  Zap, 
  Scale, 
  FileSearch, 
  MessageSquare, 
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const AnimatedFeatures = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze legal documents with intelligent pattern recognition and natural language processing",
      color: "from-blue-500 to-cyan-500",
      delay: 0.1
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security with end-to-end encryption ensures your sensitive legal data remains completely protected",
      color: "from-green-500 to-emerald-500",
      delay: 0.2
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized AI engine processes complex legal documents in seconds with real-time analysis and instant insights",
      color: "from-yellow-500 to-orange-500",
      delay: 0.3
    },
    {
      icon: Scale,
      title: "Legal Expertise",
      description: "Built by legal professionals and trained on comprehensive legal precedents for accurate analysis",
      color: "from-purple-500 to-pink-500",
      delay: 0.4
    },
    {
      icon: FileSearch,
      title: "Smart Search",
      description: "Intelligent search system finds relevant cases and precedents with semantic understanding and context awareness",
      color: "from-indigo-500 to-blue-500",
      delay: 0.5
    },
    {
      icon: MessageSquare,
      title: "AI Assistant",
      description: "Virtual legal assistant provides instant answers to legal questions with comprehensive case management tools",
      color: "from-teal-500 to-cyan-500",
      delay: 0.6
    }
  ];

  return (
    <div className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 animate-float-gentle" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10 animate-float-gentle" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse-glow-enhanced" style={{ animationDelay: '2s' }} />
        
        {/* Modern Geometric Elements */}
        <div className="absolute top-20 right-20 w-16 h-16 border border-blue-400/30 rounded-2xl rotate-12 animate-rotate-3d opacity-60" />
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full animate-wave opacity-50" />
        <div className="absolute top-1/3 left-10 w-8 h-8 border-2 border-cyan-400/40 rotate-45 animate-scale-bounce opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-blue-600 animate-spin" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Advanced Features</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Experience the future of legal technology with our cutting-edge AI-powered platform designed for modern legal professionals
          </p>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover-glow-enhanced"
              style={{ animationDelay: `${feature.delay}s` }}
            >
              {/* Enhanced Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
              
              {/* Modern Icon */}
              <div className={`relative w-16 h-16 mb-6 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500 `}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Enhanced Content */}
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Modern Feature Indicators */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Advanced Technology</span>
              </div>

              {/* Enhanced Hover Arrow */}
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Modern CTA Section */}
        <div className="text-center animate-fade-in-up animation-delay-1000">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-full border border-blue-200/50 dark:border-blue-800/50 hover:border-blue-300/70 dark:hover:border-blue-700/70 transition-all duration-300 hover:scale-105 cursor-pointer group">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-glow-enhanced" />
            <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg">Ready to Transform Your Legal Practice?</span>
            <Sparkles className="w-5 h-5 text-blue-600 group-hover:rotate-180 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedFeatures;