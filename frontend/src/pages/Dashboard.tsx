"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileSearch, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const stats = [
    {
      title: "Contracts Analyzed",
      value: "1,247",
      change: "+12%",
      icon: FileSearch,
      color: "text-primary"
    },
    {
      title: "Active Cases", 
      value: "89",
      change: "+5%",
      icon: TrendingUp,
      color: "text-secondary"
    },
    {
      title: "Client Interactions",
      value: "3,451",
      change: "+23%", 
      icon: MessageSquare,
      color: "text-success"
    },
    {
      title: "Success Rate",
      value: "94.7%",
      change: "+2.1%",
      icon: CheckCircle,
      color: "text-success"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "contract",
      title: "High-risk liability clause detected",
      description: "Service Agreement - ABC Corp",
      time: "2 minutes ago",
      status: "critical",
      icon: AlertTriangle
    },
    {
      id: 2,
      type: "prediction",
      title: "Case outcome prediction completed",
      description: "Johnson vs. TechCorp - 85% win probability",
      time: "15 minutes ago", 
      status: "success",
      icon: TrendingUp
    },
    {
      id: 3,
      type: "assistant",
      title: "Client consultation scheduled",
      description: "Sarah Williams - Contract Review",
      time: "1 hour ago",
      status: "info",
      icon: Calendar
    }
  ];

  const quickActions = [
    {
      title: "Analyze New Contract",
      description: "Upload and analyze contract documents",
      icon: FileSearch,
      action: "/dashboard/contracts",
      color: "bg-gradient-primary"
    },
    {
      title: "Ask Legal Assistant",
      description: "Get instant legal research assistance",
      icon: MessageSquare,
      action: "/dashboard/assistant",
      color: "bg-gradient-secondary"
    },
    {
      title: "Predict Case Outcome",
      description: "Run predictive analysis on your case",
      icon: TrendingUp,
      action: "/dashboard/prediction",
      color: "bg-primary-dark"
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Welcome Back to LegalAI Pro
        </h1>
        <p className="text-xl text-muted-foreground">
          Your intelligent legal workspace
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card 
              key={stat.title} 
              className={`p-6 shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-in-delay-${index + 1} group cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-success font-medium mt-1">
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-primary group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold text-foreground animate-fade-in-left">
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Card 
                  key={action.title}
                  className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-elegant hover:-translate-y-2 animate-fade-in-delay-${index + 2} group`}
                >
                  <div className={`inline-flex p-4 rounded-2xl ${action.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {action.description}
                  </p>
                  <Button variant="ghost" className="w-full group-hover:bg-accent">
                    Get Started
                    <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </Card>
              );
            })}
          </div>

          {/* Performance Overview */}
          <Card className="p-6 animate-fade-in-left">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              AI Performance Overview
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Contract Analysis Accuracy</span>
                  <span className="text-sm font-bold text-success">98.5%</span>
                </div>
                <Progress value={98.5} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Case Prediction Confidence</span>
                  <span className="text-sm font-bold text-primary">85.2%</span>
                </div>
                <Progress value={85.2} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Client Satisfaction</span>
                  <span className="text-sm font-bold text-secondary">96.7%</span>
                </div>
                <Progress value={96.7} className="h-2" />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground animate-fade-in-right">
            Recent Activity
          </h2>
          
          <Card className="p-6 animate-fade-in-right">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const IconComponent = activity.icon;
                const statusColors = {
                  critical: "text-destructive bg-destructive/10",
                  success: "text-success bg-success/10", 
                  info: "text-primary bg-primary/10"
                };
                
                return (
                  <div 
                    key={activity.id}
                    className={`flex items-start gap-4 p-3 rounded-lg hover:bg-accent transition-colors animate-fade-in-delay-${index + 3}`}
                  >
                    <div className={`p-2 rounded-lg ${statusColors[activity.status as keyof typeof statusColors]}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* System Status */}
          <Card className="p-6 animate-fade-in-right">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              System Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">AI Models</span>
                <Badge className="bg-success/10 text-success">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Database</span>
                <Badge className="bg-success/10 text-success">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Security</span>
                <Badge className="bg-success/10 text-success">Secure</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">API Status</span>
                <Badge className="bg-success/10 text-success">99.9% Uptime</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;