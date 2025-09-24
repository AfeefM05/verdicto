"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileSearch, Upload, AlertTriangle, CheckCircle, Clock, TrendingUp, X } from "lucide-react";
import { apiService, type ContractAnalysisResponse } from "@/services/api";

const ContractAnalyzer = () => {
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ContractAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isHealthCheckPassed, setIsHealthCheckPassed] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const checkServiceHealth = async () => {
    try {
      await apiService.checkHealth();
      setIsHealthCheckPassed(true);
      setError(null);
    } catch {
      setIsHealthCheckPassed(false);
      setError('Service is currently unavailable. Please try again later.');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please select a valid file type (PDF, DOC, or DOCX)');
        return;
      }
      
      // Validate file size (50MB limit)
      if (file.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB');
        return;
      }
      
      setSelectedFile(file);
      setError(null);
      setAnalysisResult(null);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setError(null);
    setAnalysisResult(null);
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          return prev; // Stop at 90% until API call completes
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    try {
      const result = await apiService.analyzeContract(selectedFile);
      setAnalysisResult(result);
      setAnalysisProgress(100);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during analysis');
      setAnalysisProgress(0);
    } finally {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
    }
  };

  const clearAnalysis = () => {
    setSelectedFile(null);
    setAnalysisResult(null);
    setError(null);
    setAnalysisProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getRiskLevel = (score: number) => {
    if (score >= 7) return { level: 'High', variant: 'destructive' as const, color: 'text-destructive' };
    if (score >= 4) return { level: 'Medium', variant: 'secondary' as const, color: 'text-warning' };
    return { level: 'Low', variant: 'outline' as const, color: 'text-success' };
  };

  const getOverallRiskLevel = (score: number) => {
    if (score >= 7) return { level: 'High', variant: 'destructive' as const };
    if (score >= 4) return { level: 'Medium', variant: 'secondary' as const };
    return { level: 'Low', variant: 'outline' as const };
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2 animate-fade-in-up">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          Smart Contract Analyzer
        </h1>
        <p className="text-muted-foreground text-lg">
          AI-powered contract analysis with 98% accuracy in clause extraction and risk assessment
        </p>
        
        {/* Service Health Check */}
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={checkServiceHealth}
            disabled={isHealthCheckPassed === null}
          >
            Check Service Status
          </Button>
          {isHealthCheckPassed === true && (
            <Badge variant="outline" className="text-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              Service Online
            </Badge>
          )}
          {isHealthCheckPassed === false && (
            <Badge variant="destructive">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Service Offline
            </Badge>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in-delay-1">
        <Card className="border-0 shadow-card hover:shadow-glow transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current File</p>
                <p className="text-lg font-bold text-primary truncate">
                  {selectedFile ? selectedFile.name : 'No file selected'}
                </p>
              </div>
              <FileSearch className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-card hover:shadow-glow transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Issues Found</p>
                <p className="text-2xl font-bold text-destructive">
                  {analysisResult ? analysisResult.clauses.reduce((acc, clause) => acc + clause.risks.length, 0) : '0'}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-card hover:shadow-glow transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Clauses Analyzed</p>
                <p className="text-2xl font-bold text-success">
                  {analysisResult ? analysisResult.clauses.length : '0'}
                </p>
              </div>
              <Clock className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-card hover:shadow-glow transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Risk Score</p>
                <p className="text-2xl font-bold text-secondary">
                  {analysisResult ? `${analysisResult.final_risk_score}/10` : 'N/A'}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="animate-fade-in">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Main Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card className="border-0 shadow-card animate-fade-in-delay-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Contract
            </CardTitle>
            <CardDescription>
              Upload your contract for AI-powered analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium">Drop your contract here</p>
              <p className="text-sm text-muted-foreground mb-4">Supports PDF, DOC, DOCX up to 50MB</p>
              <div className="space-y-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button 
                  onClick={() => fileInputRef.current?.click()} 
                  className="bg-gradient-primary"
                  disabled={isAnalyzing}
                >
                  Choose File
                </Button>
                {selectedFile && (
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm truncate">{selectedFile.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAnalysis}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {selectedFile && (
              <Button 
                onClick={handleFileUpload} 
                className="w-full bg-gradient-primary"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Contract'}
              </Button>
            )}
            
            {isAnalyzing && (
              <div className="space-y-2 animate-fade-in">
                <div className="flex justify-between text-sm">
                  <span>Analyzing contract...</span>
                  <span>{Math.round(analysisProgress)}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <Card className="border-0 shadow-card animate-fade-in-delay-3">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              {analysisResult ? 'AI-powered insights and risk assessment' : 'Upload a contract to see analysis results'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {analysisResult ? (
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="risks">Risks</TabsTrigger>
                  <TabsTrigger value="clauses">Clauses</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-muted-foreground/10">
                      <span className="text-sm font-medium">Overall Risk Score</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          analysisResult.final_risk_score >= 7 ? 'bg-destructive' : 
                          analysisResult.final_risk_score >= 4 ? 'bg-warning' : 'bg-success'
                        }`}></div>
                        <Badge variant={getOverallRiskLevel(analysisResult.final_risk_score).variant} className="font-semibold">
                          {getOverallRiskLevel(analysisResult.final_risk_score).level} ({analysisResult.final_risk_score}/10)
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-muted/10">
                      <span className="text-sm font-medium">Contract Type</span>
                      <Badge variant="outline">{analysisResult.contract_type}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-muted/10">
                      <span className="text-sm font-medium">Language</span>
                      <Badge variant="outline">{analysisResult.language}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-muted/10">
                      <span className="text-sm font-medium">File Name</span>
                      <span className="text-sm text-muted-foreground truncate max-w-[200px]">{analysisResult.file_name}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-muted/10">
                      <span className="text-sm font-medium">Total Clauses</span>
                      <span className="font-semibold text-primary">{analysisResult.clauses.length}</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="risks" className="space-y-3">
                  <div className="space-y-3">
                    {analysisResult.clauses.flatMap(clause => clause.risks).length > 0 ? (
                      analysisResult.clauses.flatMap(clause => 
                        clause.risks.map(risk => ({ ...risk, clauseNumber: clause.clause_number }))
                      ).map((risk, index) => {
                        const riskLevel = getRiskLevel(risk.score);
                        return (
                          <div key={index} className={`flex items-start gap-3 p-3 rounded-lg border ${
                            risk.score >= 7 ? 'bg-destructive/5 border-destructive/20' : 
                            risk.score >= 4 ? 'bg-warning/5 border-warning/20' : 'bg-success/5 border-success/20'
                          }`}>
                            <AlertTriangle className={`h-4 w-4 mt-0.5 ${riskLevel.color}`} />
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                {riskLevel.level} Risk: {risk.risk_id}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Clause {risk.clauseNumber} - {risk.description}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Risk Score: {risk.score}/10
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">No High-Risk Issues Found</p>
                          <p className="text-xs text-muted-foreground">This contract appears to have standard risk levels</p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="clauses" className="space-y-3">
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {analysisResult.clauses.map((clause, index) => (
                      <div key={index} className="p-3 rounded-lg bg-muted/30 border border-muted-foreground/10 hover:bg-muted/40 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium">Clause {clause.clause_number}</span>
                          <Badge variant={clause.risks.length > 0 ? "destructive" : "outline"}>
                            {clause.risks.length > 0 ? `${clause.risks.length} Risk${clause.risks.length > 1 ? 's' : ''}` : 'No Risks'}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-3">
                          {clause.text}
                        </p>
                        {clause.suggestion && (
                          <div className="mt-2 p-2 bg-muted/40 border border-muted-foreground/20 rounded text-xs">
                            <strong>💡 Suggestion:</strong> {clause.suggestion}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileSearch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No analysis results yet</p>
                <p className="text-sm">Upload a contract to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContractAnalyzer;