import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileSearch, 
  Brain, 
  MessageSquare, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const PlatformModules = () => {
  const modules = [
    {
      id: "contract-analyzer",
      icon: FileSearch,
      title: "Smart Contract Analyzer",
      description: "AI-powered contract analysis with clause extraction, risk assessment, and multi-jurisdictional compliance checking.",
      features: [
        "Clause-level analysis with confidence scoring",
        "Multi-jurisdictional compliance engine", 
        "Anomaly detection and risk flagging",
        "Version comparison and change tracking"
      ],
      metrics: "98% accuracy in clause detection",
      gradient: "from-primary to-primary-light"
    },
    {
      id: "virtual-assistant",
      icon: MessageSquare,
      title: "Virtual Legal Assistant",
      description: "24/7 AI assistant providing client support, appointment scheduling, and intelligent legal research capabilities.",
      features: [
        "24/7 multi-language client support",
        "Intelligent appointment scheduling",
        "Automated client onboarding",
        "Legal research with citation verification"
      ],
      metrics: "90+ languages supported",
      gradient: "from-secondary to-secondary-light"
    },
    {
      id: "case-prediction",
      icon: TrendingUp,
      title: "Case Outcome Prediction",
      description: "Predictive analytics using machine learning models trained on millions of court documents and case records.",
      features: [
        "Outcome probability with 85% accuracy",
        "Settlement forecasting and timeline prediction",
        "Judge behavior pattern analysis",
        "Strategic recommendation engine"
      ],
      metrics: "85% accuracy in dismissal predictions",
      gradient: "from-primary-dark to-secondary-dark"
    }
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption with attorney-client privilege protection"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Sub-second response times for simple queries, <30s for complex analysis"
    },
    {
      icon: Brain,
      title: "Continuous Learning",
      description: "AI models that improve with every case and document processed"
    }
  ];

  return (
    <section id="platform" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Three Powerful AI Modules
            <span className="block text-2xl md:text-3xl text-muted-foreground font-normal mt-2">
              Revolutionizing Every Aspect of Legal Practice
            </span>
          </h2>
        </div>

        {/* Main Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Card key={module.id} className="relative p-8 bg-gradient-card shadow-card hover:shadow-elegant transition-smooth group cursor-pointer overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${module.gradient} mb-6`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {module.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {module.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {module.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${module.gradient} text-xs font-semibold text-white`}>
                      {module.metrics}
                    </div>
                    <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalFeatures.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.title} className="flex items-start gap-4 p-6 bg-card rounded-xl shadow-card">
                <div className="p-3 bg-gradient-primary rounded-xl flex-shrink-0">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="p-12 bg-gradient-hero shadow-elegant">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Legal Practice?
            </h3>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join leading law firms already using AI to deliver better outcomes, 
              reduce costs, and serve clients more effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
                Schedule Demo
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PlatformModules;