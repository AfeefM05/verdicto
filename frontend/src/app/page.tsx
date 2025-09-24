import Navigation from "@/components/Navigation";
import { AdvancedTimeline } from "@/components/AdvancedTimeline";
import AnimatedIntro from "@/components/AnimatedIntro";
import AnimatedFeatures from "@/components/AnimatedFeatures";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern Background with Enhanced Animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Dynamic Floating Orbs */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full blur-3xl animate-float-gentle ${
                i % 4 === 0 ? 'w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-400/20' :
                i % 4 === 1 ? 'w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20' :
                i % 4 === 2 ? 'w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-400/20' :
                'w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-purple-400/20'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${15 + i * 2}s`,
              }}
            />
          ))}
          
          {/* Modern Grid Pattern */}
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'float-gentle 25s ease-in-out infinite'
          }}></div>
        </div>
      </div>
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/40 z-5" />
      
      <div className="relative z-10">
        <Navigation />
        {/* Improved spacing with proper navbar offset */}
        <main className="pt-20">
          <AnimatedIntro />
          <AnimatedFeatures />
          <AdvancedTimeline />
        </main>
      </div>
    </div>
  );
}