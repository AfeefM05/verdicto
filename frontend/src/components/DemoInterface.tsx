"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileSearch, 
  MessageSquare, 
  TrendingUp, 
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  Brain,
  Send
} from "lucide-react";

const DemoInterface = ({ activeTab: initialTab }: { activeTab?: string }) => {
  const [activeTab, setActiveTab] = useState(initialTab || "contract");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Experience AI Legal Intelligence
            <span className="block text-2xl md:text-3xl text-muted-foreground font-normal mt-2">
              Interactive Demo of Core Platform Features
            </span>
          </h2>
        </div>

        <Card className="p-8 shadow-elegant bg-gradient-card">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/50">
              <TabsTrigger value="contract" className="flex items-center gap-2">
                <FileSearch className="h-4 w-4" />
                Contract Analyzer
              </TabsTrigger>
              <TabsTrigger value="assistant" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Legal Assistant
              </TabsTrigger>
              <TabsTrigger value="prediction" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Case Prediction
              </TabsTrigger>
            </TabsList>

            {/* Contract Analyzer Demo */}
            <TabsContent value="contract" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-foreground">Smart Contract Analysis</h3>
                  
                  <Card className="p-6 border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="text-center">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium text-foreground mb-2">
                        Upload Contract Document
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports PDF, DOCX, and scanned documents
                      </p>
                    </div>
                  </Card>

                  <Button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing}
                    className="w-full bg-gradient-primary text-white py-6 text-lg font-semibold"
                  >
                    {isAnalyzing ? (
                      <>
                        <Brain className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing Contract...
                      </>
                    ) : (
                      <>
                        <FileSearch className="mr-2 h-5 w-5" />
                        Analyze with AI
                      </>
                    )}
                  </Button>

                  {isAnalyzing && (
                    <div className="space-y-3">
                      <Progress value={65} className="w-full" />
                      <p className="text-sm text-muted-foreground text-center">
                        Processing clauses and assessing risks...
                      </p>
                    </div>
                  )}
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-foreground">Analysis Results</h4>
                  
                  <div className="space-y-4">
                    <Card className="p-4 border-l-4 border-l-destructive">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">High Risk Clause Detected</p>
                          <p className="text-sm text-muted-foreground">
                            Unlimited liability provision found in Section 8.2
                          </p>
                          <Badge variant="destructive" className="mt-2">Risk Score: 9/10</Badge>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 border-l-4 border-l-warning">
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-warning mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Termination Notice Period</p>
                          <p className="text-sm text-muted-foreground">
                            90-day notice required - above industry standard
                          </p>
                          <Badge variant="outline" className="mt-2">Risk Score: 5/10</Badge>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 border-l-4 border-l-success">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Governing Law Compliant</p>
                          <p className="text-sm text-muted-foreground">
                            Delaware law jurisdiction - standard and acceptable
                          </p>
                          <Badge variant="outline" className="mt-2 border-success text-success">Risk Score: 2/10</Badge>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Virtual Assistant Demo */}
            <TabsContent value="assistant" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-foreground">AI Legal Assistant</h3>
                  
                  <Card className="p-6 h-96 overflow-y-auto space-y-4 bg-muted/30">
                    <div className="flex justify-start">
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-bl-sm px-4 py-2 max-w-xs">
                        <p className="text-sm">
                          Hello! I&apos;m your AI legal assistant. How can I help you today?
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-secondary text-secondary-foreground rounded-2xl rounded-br-sm px-4 py-2 max-w-xs">
                        <p className="text-sm">
                          Can you help me find similar cases involving contract disputes in Delaware?
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-start">
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-bl-sm px-4 py-2 max-w-md">
                        <p className="text-sm">
                          I found 247 relevant cases in Delaware involving contract disputes. Here are the top 5 most similar to your situation:
                          <br/><br/>
                          1. <strong>ABC Corp v. XYZ Inc.</strong> (2023) - Similar liability clause
                          2. <strong>Smith v. Johnson</strong> (2022) - Termination dispute
                          3. <strong>TechCorp v. StartupInc</strong> (2023) - Breach of contract
                        </p>
                      </div>
                    </div>
                  </Card>

                  <div className="flex gap-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Ask me anything about your legal matters..."
                      className="flex-1"
                    />
                    <Button className="bg-gradient-secondary text-white">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-foreground">Assistant Capabilities</h4>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <Card className="p-4">
                      <h5 className="font-medium text-foreground mb-2">Legal Research</h5>
                      <p className="text-sm text-muted-foreground">
                        Search through millions of case laws, statutes, and regulations
                      </p>
                    </Card>
                    
                    <Card className="p-4">
                      <h5 className="font-medium text-foreground mb-2">Client Support</h5>
                      <p className="text-sm text-muted-foreground">
                        24/7 automated client communication and appointment scheduling
                      </p>
                    </Card>
                    
                    <Card className="p-4">
                      <h5 className="font-medium text-foreground mb-2">Document Drafting</h5>
                      <p className="text-sm text-muted-foreground">
                        Generate legal documents from templates and firm playbooks
                      </p>
                    </Card>
                    
                    <Card className="p-4">
                      <h5 className="font-medium text-foreground mb-2">Compliance Monitoring</h5>
                      <p className="text-sm text-muted-foreground">
                        Track regulatory changes and assess impact on your practice
                      </p>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Case Prediction Demo */}
            <TabsContent value="prediction" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-foreground">Case Outcome Prediction</h3>
                  
                  <Card className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Case Type
                      </label>
                      <Input value="Contract Dispute" readOnly />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Jurisdiction
                      </label>
                      <Input value="Delaware State Court" readOnly />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Judge
                      </label>
                      <Input value="Hon. Sarah Mitchell" readOnly />
                    </div>
                    
                    <Button className="w-full bg-gradient-primary text-white py-4">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      Predict Outcome
                    </Button>
                  </Card>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-foreground">Prediction Results</h4>
                  
                  <div className="space-y-4">
                    <Card className="p-6 bg-gradient-to-r from-success/10 to-success/5 border-success/20">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="font-semibold text-foreground">Win Probability</h5>
                        <Badge className="bg-success text-success-foreground">High Confidence</Badge>
                      </div>
                      <div className="text-4xl font-bold text-success mb-2">78%</div>
                      <Progress value={78} className="mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Based on 1,247 similar cases and Judge Mitchell&apos;s ruling patterns
                      </p>
                    </Card>

                    <Card className="p-4">
                      <h5 className="font-medium text-foreground mb-3">Key Factors</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Case precedent strength</span>
                          <Badge variant="outline" className="border-success text-success">+12%</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Judge ruling tendency</span>
                          <Badge variant="outline" className="border-success text-success">+8%</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Evidence quality</span>
                          <Badge variant="outline" className="border-warning text-warning">-3%</Badge>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h5 className="font-medium text-foreground mb-2">Settlement Recommendation</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Based on similar cases, settlement range: $450K - $780K
                      </p>
                      <Badge className="bg-secondary text-secondary-foreground">
                        Recommended: Proceed to trial
                      </Badge>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
};

export default DemoInterface;