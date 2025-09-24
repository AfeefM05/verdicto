"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Zap, 
  Shield, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  Globe,
  Play,
  CheckCircle
} from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  emoji: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  gradient: string;
  features: string[];
  delay: number;
}

const timelineData: TimelineItem[] = [
  {
    id: 'neural-networks',
    title: 'Advanced Neural Networks',
    description: 'Cutting-edge AI powered by state-of-the-art neural networks for unparalleled legal analysis and prediction capabilities.',
    emoji: '🧠',
    icon: Brain,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-pink-500',
    features: ['Deep Learning Models', 'Natural Language Processing', 'Pattern Recognition', 'Predictive Analytics'],
    delay: 0
  },
  {
    id: 'real-time-processing',
    title: 'Real-time Data Processing',
    description: 'Lightning-fast processing capabilities that deliver instant insights and analysis for time-critical legal decisions.',
    emoji: '⚡',
    icon: Zap,
    color: 'text-yellow-600',
    gradient: 'from-yellow-500 to-orange-500',
    features: ['Instant Analysis', 'Live Updates', 'Stream Processing', 'Real-time Collaboration'],
    delay: 200
  },
  {
    id: 'enterprise-security',
    title: 'Enterprise Security',
    description: 'Bank-grade security infrastructure ensuring your sensitive legal data remains protected with military-level encryption.',
    emoji: '🛡️',
    icon: Shield,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
    features: ['End-to-End Encryption', 'SOC 2 Compliance', 'Zero Trust Architecture', 'Audit Trails'],
    delay: 400
  },
  {
    id: 'availability',
    title: '24/7 Availability',
    description: 'Round-the-clock service availability with high uptime guarantee, ensuring your legal operations never stop.',
    emoji: '🌐',
    icon: Globe,
    color: 'text-green-600',
    gradient: 'from-green-500 to-emerald-500',
    features: ['High Uptime SLA', 'Global CDN', 'Auto-scaling', 'Disaster Recovery'],
    delay: 600
  }
];

export function AdvancedTimeline() {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.getAttribute('data-item-id');
            if (itemId) {
              setTimeout(() => {
                setVisibleItems(prev => new Set([...prev, itemId]));
              }, parseInt(entry.target.getAttribute('data-delay') || '0'));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-timeline-item]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative py-20 px-6 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float-gentle"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse-glow-enhanced" style={{ animationDelay: '2s' }}></div>
        
        {/* Modern Geometric Elements */}
        <div className="absolute top-20 right-20 w-16 h-16 border border-purple-400/30 rounded-2xl rotate-12 animate-rotate-3d opacity-60" />
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full animate-wave opacity-50" />
        <div className="absolute top-1/3 left-10 w-8 h-8 border-2 border-yellow-400/40 rotate-45 animate-scale-bounce opacity-70" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-purple-600 animate-spin" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Powered by Innovation</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent mb-6">
            Next-Generation Legal Technology
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of legal practice with our cutting-edge platform that combines 
            artificial intelligence, real-time processing, and enterprise-grade security.
          </p>
        </div>

        {/* Enhanced Timeline */}
        <div className="relative">
          {/* Enhanced Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-pink-200 to-blue-200 dark:from-purple-800 dark:via-pink-800 dark:to-blue-800 transform md:-translate-x-0.5"></div>

          <div className="space-y-16">
            {timelineData.map((item, index) => {
              const isVisible = visibleItems.has(item.id);
              const isHovered = hoveredItem === item.id;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  data-timeline-item
                  data-item-id={item.id}
                  data-delay={item.delay}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Enhanced Timeline Dot */}
                  <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10 ${
                    isVisible ? 'animate-scale-in' : 'opacity-0'
                  }`}>
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${item.gradient} shadow-lg flex items-center justify-center transform transition-all duration-300 ${
                      isHovered ? 'scale-125 shadow-xl' : 'scale-100'
                    }`}>
                      <span className="text-white text-sm">{item.emoji}</span>
                    </div>
                  </div>

                  {/* Enhanced Content Card */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${
                    isEven ? 'md:pr-16' : 'md:pl-16'
                  }`}>
                    <Card className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                      isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'
                    } bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 hover-glow-enhanced`}>
                      {/* Enhanced Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                      
                      <CardContent className="p-8 relative">
                        {/* Enhanced Header */}
                        <div className="flex items-start gap-4 mb-6">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${item.gradient} shadow-lg transform transition-all duration-300 ${
                            isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
                          }`}>
                            <item.icon className="h-6 w-6 text-white" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                {item.title}
                              </h3>
                              <span className="text-2xl transform transition-all duration-300 ${
                                isHovered ? 'scale-125 rotate-12' : 'scale-100 rotate-0'
                              }">
                                {item.emoji}
                              </span>
                            </div>
                            
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Enhanced Features */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {item.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 transition-all duration-300 ${
                                isVisible ? 'animate-fade-in-up' : 'opacity-0'
                              }`}
                              style={{ animationDelay: `${item.delay + (featureIndex * 100)}ms` }}
                            >
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Enhanced Action Button */}
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="secondary" 
                            className={`px-4 py-2 bg-gradient-to-r ${item.gradient} text-white border-0 transform transition-all duration-300 ${
                              isHovered ? 'scale-105' : 'scale-100'
                            }`}
                          >
                            Learn More
                          </Badge>
                          
                          <ArrowRight className={`h-5 w-5 text-slate-400 transform transition-all duration-300 ${
                            isHovered ? 'translate-x-2 text-slate-600' : 'translate-x-0'
                          }`} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center mt-20">
          <div className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 cursor-pointer ${
            visibleItems.size > 0 ? 'animate-bounce-in' : 'opacity-0'
          }`}>
            <TrendingUp className="h-5 w-5" />
            Experience the Future Today
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 p-1">
            {/* Enhanced animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-3xl animate-pulse opacity-60"></div>
            
            <div className="relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-3xl p-12">
              {/* Enhanced floating particles */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/40 dark:bg-blue-300/40 rounded-full animate-pulse-glow-enhanced"
                  style={{
                    left: `${(i * 7.3) % 100}%`,
                    top: `${(i * 11.7) % 100}%`,
                    animationDelay: `${(i * 0.15) % 3}s`
                  }}
                />
              ))}
              
              <div className="max-w-4xl mx-auto space-y-8 relative z-10">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100/80 dark:bg-blue-900/30 backdrop-blur-sm rounded-full border border-blue-200/50 dark:border-blue-400/20 mb-6">
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin" />
                  <span className="text-blue-800 dark:text-blue-200 font-medium">Experience the Future of Legal AI</span>
                </div>
                
                <h3 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                  Join modern legal professionals using{' '}
                  <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    AI to transform
                  </span>{' '}
                  their practice
                </h3>
                
                <p className="text-xl text-slate-600 dark:text-white/80 leading-relaxed max-w-3xl mx-auto">
                  Discover how our AI platform revolutionizes legal practice with intelligent analysis, 
                  predictive insights, and comprehensive case management tools.
                </p>
                
                <div className="flex justify-center items-center pt-4">
                  <Button 
                    size="lg" 
                    className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 overflow-hidden hover-glow-enhanced"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Play className="w-7 h-7 mr-4 group-hover:scale-110 transition-transform duration-300" />
                    Begin Trip
                    <ArrowRight className="w-7 h-7 ml-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
                
                {/* Enhanced Bottom decoration */}
                <div className="pt-6">
                  <div className="inline-flex items-center gap-4 px-6 py-3 bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-sm rounded-full border border-blue-200/40 dark:border-blue-400/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse-glow-enhanced" />
                      <span className="text-blue-700 dark:text-blue-200 text-sm">Live Demo Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
