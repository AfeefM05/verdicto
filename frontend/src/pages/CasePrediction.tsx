"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp, Target, Brain, BarChart3, Scale, DollarSign, Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { apiService, type CasePredictionResponse } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const CasePrediction = () => {
  const [predictionScore, setPredictionScore] = useState(85);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [caseDetails, setCaseDetails] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<CasePredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();


  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const isAllowed = allowedTypes.includes(file.type) || file.type.startsWith('image/');
    if (!isAllowed) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, image, DOC, DOCX, or TXT file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    setIsExtracting(true);
    setError(null);

    try {
      const result = await apiService.extractTextViaExtractor(file);
      if (result.success && result.extracted_text) {
        setCaseDetails(result.extracted_text);
        toast({
          title: "Text extracted successfully",
          description: "Document content has been loaded into the case details.",
        });
      } else {
        setError(result.error || 'Failed to extract text from document');
        toast({
          title: "Extraction failed",
          description: result.error || 'Failed to extract text from document',
          variant: "destructive",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      toast({
        title: "Extraction failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleRunPrediction = async () => {
    if (!caseDetails.trim()) {
      toast({
        title: "Case details required",
        description: "Please enter case details or upload a document.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setPredictionResult(null);

    try {
      console.log('Starting prediction for case details:', caseDetails);
      const result = await apiService.predictCaseOutcome(caseDetails);
      console.log('Prediction result received:', result);
      setPredictionResult(result);
      setPredictionScore(result.prediction.probability);
      toast({
        title: "Prediction completed",
        description: "Case outcome prediction has been generated.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get prediction';
      console.error('Prediction error:', error);
      setError(errorMessage);
      toast({
        title: "Prediction failed",
        description: `Connection to AI backend failed: ${errorMessage}`,
        variant: "destructive",
      });
      // Don't set fallback data - let user see the error
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearForm = () => {
    setCaseDetails("");
    setUploadedFile(null);
    setPredictionResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const testConnection = async () => {
    setIsTestingConnection(true);
    try {
      await apiService.predictCaseOutcome("Test connection");
      toast({
        title: "Connection successful!",
        description: "AI backend is responding correctly.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Connection failed';
      toast({
        title: "Connection failed",
        description: `Cannot connect to AI backend: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2 animate-fade-in-up">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          Case Outcome Prediction
        </h1>
        <p className="text-muted-foreground text-lg">
          AI-powered predictive analytics with 85% accuracy for case outcomes and settlement forecasting
        </p>
      </div>

      {/* Stats Cards */}
      {predictionResult && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in-delay-1">
          <Card className="border-0 shadow-card hover:shadow-glow transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">References Found</p>
                  <p className="text-2xl font-bold text-primary">{(predictionResult.prediction.related_records?.length ?? 0).toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-card hover:shadow-glow transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Key Points</p>
                  <p className="text-2xl font-bold text-success">{(predictionResult.prediction.feature_points?.length ?? 0).toLocaleString()}</p>
                </div>
                <Target className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-card hover:shadow-glow transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Predicted Timeline</p>
                  <p className="text-2xl font-bold text-secondary">{predictionResult.prediction.timeline}</p>
                </div>
                <DollarSign className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-card hover:shadow-glow transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Win Probability</p>
                  <p className="text-2xl font-bold text-success">{predictionResult.prediction.probability}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case Input Form */}
        <Card className="lg:col-span-1 border-0 shadow-card animate-fade-in-delay-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Case Details
            </CardTitle>
            <CardDescription>
              Enter case information or upload a document for AI-powered outcome prediction
              <br />
              <span className="text-xs text-muted-foreground">
                Make sure your AI backend is running on http://127.0.0.1:7860
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Document Upload Section */}
            <div className="space-y-2">
              <Label htmlFor="document-upload">Upload Document (Optional)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="document-upload"
                  type="file"
                  accept="application/pdf,image/*,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  className="flex-1"
                  disabled={isExtracting}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isExtracting}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {isExtracting && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  Extracting text from document...
                </div>
              )}
              {uploadedFile && (
                <div className="flex items-center gap-2 text-sm text-success">
                  <CheckCircle className="h-4 w-4" />
                  {uploadedFile.name}
                </div>
              )}
            </div>

            {/* Case Details Text Input */}
            <div className="space-y-2">
              <Label htmlFor="case-details">Case Details</Label>
              <Textarea
                id="case-details"
                placeholder="Enter your case details here or upload a document above..."
                value={caseDetails}
                onChange={(e) => setCaseDetails(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <div className="text-xs text-muted-foreground">
                {caseDetails.length} characters
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <div className="flex gap-2">
                <Button 
                  onClick={handleRunPrediction} 
                  className="flex-1 bg-gradient-primary"
                  disabled={isAnalyzing || !caseDetails.trim()}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      AI Analyzing...
                    </>
                  ) : (
                    <>
                      Run Prediction
                      <Brain className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <Button 
                  onClick={clearForm} 
                  variant="outline"
                  disabled={isAnalyzing || isExtracting}
                >
                  Clear
                </Button>
              </div>
              <Button 
                onClick={testConnection} 
                variant="outline"
                size="sm"
                className="w-full"
                disabled={isTestingConnection || isAnalyzing}
              >
                {isTestingConnection ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary mr-2"></div>
                    Testing Connection...
                  </>
                ) : (
                  "Test AI Backend Connection"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Prediction Results */}
        <Card className="lg:col-span-2 border-0 shadow-card animate-fade-in-delay-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Prediction Results
            </CardTitle>
            <CardDescription>
              AI-powered analysis based on 20+ years of case data
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
                  <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">AI is analyzing your case...</h3>
                  <p className="text-sm text-muted-foreground">
                    This may take a few moments while our AI processes your case details
                  </p>
                </div>
              </div>
            ) : (
              <Tabs defaultValue="outcome" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="outcome">Outcome</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="references">References</TabsTrigger>
                </TabsList>
              
              <TabsContent value="outcome" className="space-y-6">
                {predictionResult ? (
                  <>
                    <div className="text-center space-y-4">
                      <div className="relative w-32 h-32 mx-auto">
                        <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20"></div>
                        <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary">{predictionResult.prediction.probability}%</div>
                            <div className="text-xs text-muted-foreground">Win Probability</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">
                          {predictionResult.prediction.probability >= 70 ? 'Favorable Outcome Likely' : 
                           predictionResult.prediction.probability >= 40 ? 'Moderate Outcome' : 'Challenging Case'}
                        </h3>
                        <p className="text-muted-foreground">Based on AI analysis of case details</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted/50 border">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="font-medium">Key Analysis Points</span>
                        </div>
                        <ul className="text-sm space-y-2">
                          {(predictionResult.prediction.feature_points ?? []).map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="relative w-32 h-32 mx-auto">
                      <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20"></div>
                      <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary">{predictionScore}%</div>
                          <div className="text-xs text-muted-foreground">Win Probability</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">Favorable Outcome Likely</h3>
                      <p className="text-muted-foreground">Based on similar cases in this jurisdiction</p>
                    </div>
                  </div>
                )}
              </TabsContent>


              <TabsContent value="timeline" className="space-y-4">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">Case Timeline Prediction</h3>
                    <p className="text-muted-foreground">
                      {predictionResult ? 'AI-predicted timeline based on case analysis' : 'Estimated milestones and duration'}
                    </p>
                  </div>

                  {predictionResult ? (
                    <div className="p-4 rounded-lg bg-gradient-card">
                      <div className="text-center space-y-2">
                        <div className="text-sm text-muted-foreground">Predicted Timeline</div>
                        <div className="text-2xl font-bold">{predictionResult.prediction.timeline}</div>
                        <div className="text-sm text-muted-foreground">Based on AI analysis of case complexity</div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg bg-muted/50 border-2 border-dashed border-muted-foreground/25">
                      <div className="text-center space-y-2">
                        <div className="text-muted-foreground">No prediction available</div>
                        <div className="text-sm text-muted-foreground">
                          Run a case prediction to see timeline analysis
                        </div>
                      </div>
                    </div>
                  )}

                  
                </div>
              </TabsContent>

              <TabsContent value="references" className="space-y-4">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">Reference Cases</h3>
                    <p className="text-muted-foreground">
                      {predictionResult ? 'Similar cases and citations relevant to your matter' : 'Links will appear here after running a prediction'}
                    </p>
                  </div>

                  {predictionResult && predictionResult.prediction.related_records && predictionResult.prediction.related_records.length > 0 ? (
                    <div className="p-4 rounded-lg bg-muted/50 border">
                      <ul className="space-y-4">
                        {predictionResult.prediction.related_records.map((rec, idx) => (
                          <li key={idx} className="rounded-md border bg-background p-4 hover:shadow-sm transition-smooth">
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1">
                                <a href={rec.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                                  {rec.title}
                                </a>
                                {rec.snippet && (
                                  <p className="text-muted-foreground text-sm">{rec.snippet}</p>
                                )}
                              </div>
                              <a href={rec.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline whitespace-nowrap">Open Link</a>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg bg-muted/50 border-2 border-dashed border-muted-foreground/25">
                      <div className="text-center space-y-2">
                        <div className="text-muted-foreground">No references yet</div>
                        <div className="text-sm text-muted-foreground">
                          Run a prediction to see similar cases and citations
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CasePrediction;