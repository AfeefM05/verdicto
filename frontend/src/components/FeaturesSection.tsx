import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileSearch, 
  Brain, 
  TrendingUp, 
  Shield, 
  Zap, 
  Clock,
  Users,
  Search,
  BarChart3,
  ArrowRight
} from "lucide-react";

const FeaturesSection = () => {
  const mainFeatures = [
    {
      icon: FileSearch,
      title: "Smart Contract Analyzer",
      description: "AI-powered clause extraction and risk assessment with 98% accuracy. Analyze thousands of contracts in minutes.",
      benefits: ["98% Accuracy", "Multi-Jurisdiction", "Real-time Analysis", "Risk Scoring"],
      gradient: "bg-gradient-primary"
    },
    {
      icon: Brain,
      title: "Virtual Legal Assistant",
      description: "24/7 AI assistant for client support, research, and case management. Never miss a deadline or client query.",
      benefits: ["24/7 Availability", "90+ Languages", "Client Onboarding", "Automated Scheduling"],
      gradient: "bg-gradient-secondary"
    },
    {
      icon: TrendingUp,
      title: "Case Prediction Engine",
      description: "Predict outcomes with 85% accuracy using ML models trained on 20+ years of case data.",
      benefits: ["85% Accuracy", "Settlement Forecasting", "Timeline Prediction", "Judge Analytics"],
      gradient: "bg-primary-dark"
    }
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption with GDPR, CCPA compliance"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Process thousands of documents simultaneously"
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Automated billable hours and productivity analytics"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Secure sharing and collaborative workflow management"
    },
    {
      icon: Search,
      title: "Legal Research",
      description: "AI-powered case law search and citation verification"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive insights and performance dashboards"
    }
  ];

  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16 animate-fade-in">
          <Badge className="bg-gradient-primary text-white px-4 py-2 text-sm">
            Core Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Revolutionary AI Tools
            </span>
            <br />
            <span className="text-foreground">for Modern Law Firms</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your legal practice with cutting-edge AI technology designed specifically 
            for the legal industry&apos;s unique challenges and requirements.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <Card 
              key={feature.title}
              className={`border-0 shadow-elegant hover:shadow-glow transition-all duration-500 animate-fade-in-delay-${index + 1} group cursor-pointer overflow-hidden relative bg-gradient-card hover:bg-gradient-subtle`}
            >
              {/* Card Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />
              
              <CardHeader className="space-y-4 relative z-10">
                <div className={`p-4 ${feature.gradient} rounded-2xl w-fit group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl animate-bounce-gentle`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors duration-300">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {feature.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="grid grid-cols-2 gap-2">
                  {feature.benefits.map((benefit, idx) => (
                    <Badge 
                      key={benefit} 
                      variant="secondary" 
                      className={`text-xs justify-center bg-muted/50 hover:bg-muted transition-all duration-300 animate-fade-in-delay-${idx + 3} group-hover:scale-105 group-hover:shadow-md`}
                    >
                      {benefit}
                    </Badge>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="space-y-12">
          <div className="text-center animate-fade-in-delay-4">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Everything You Need for
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"> Legal Excellence</span>
            </h3>
            <p className="text-muted-foreground text-lg">
              Comprehensive tools designed to streamline every aspect of your legal practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-delay-5">
            {additionalFeatures.map((feature, index) => (
              <div 
                key={feature.title}
                className={`flex items-start gap-4 p-6 rounded-xl bg-card/70 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-card/90 transition-all duration-500 group animate-fade-in-delay-${index + 4} hover:scale-105 hover:shadow-elegant`}
              >
                <div className="p-3 bg-gradient-primary rounded-xl group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg animate-wiggle">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Section */}
        
      </div>
    </section>
  );
};

export default FeaturesSection;