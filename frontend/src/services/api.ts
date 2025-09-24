// API service for case prediction and document processing

export interface CasePredictionRequest {
  case: string;
}

export interface CasePredictionResponse {
  prediction: {
    probability: number;
    timeline: string;
    feature_points: string[];
    related_records?: Array<{
      title: string;
      url: string;
      snippet?: string;
    }>;
  };
}

export interface DocumentUploadResponse {
  success: boolean;
  extracted_text?: string;
  error?: string;
}

export interface ContractAnalysisRequest {
  file: File;
}

export interface ContractRisk {
  risk_id: string;
  score: number;
  description: string;
}

export interface ContractClause {
  clause_number: number;
  text: string;
  risks: ContractRisk[];
  suggestion?: string;
}

export interface ContractAnalysisResponse {
  file_name: string;
  language: string;
  contract_type: string;
  final_risk_score: number;
  clauses: ContractClause[];
}

class ApiService {
  private baseUrl: string;

  constructor() {
    // Use Next.js API routes
    this.baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  }

  async predictCaseOutcome(caseDetails: string): Promise<CasePredictionResponse> {
    console.log('Making request to:', `${this.baseUrl}/api/predict`);
    console.log('Request payload:', { case: caseDetails });
    
    try {
      const response = await fetch(`${this.baseUrl}/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ case: caseDetails }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error predicting case outcome:', error);
      throw error;
    }
  }

  async extractTextFromDocument(file: File): Promise<DocumentUploadResponse> {
    console.log('Making request to:', `${this.baseUrl}/api/extract-text`);
    console.log('File:', file.name, file.size, file.type);
    
    try {
      const formData = new FormData();
      formData.append('document', file);

      const response = await fetch(`${this.baseUrl}/api/extract-text`, {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error extracting text from document:', error);
      throw error;
    }
  }

  /**
   * Uploads a document to the Rapid Extractor backend and returns extracted text.
   * Chooses endpoint based on file type: /extract-pdf or /extract-image.
   * The extractor base URL is read from NEXT_PUBLIC_EXTRACTOR_BASE.
   */
  async extractTextViaExtractor(file: File): Promise<DocumentUploadResponse> {
    const winEnv = typeof window !== 'undefined' ? (window as unknown as { env?: Record<string, unknown> }).env : undefined;
    const procEnv = typeof process !== 'undefined' ? (process as unknown as { env?: Record<string, unknown> }).env : undefined;
    const configuredBase = [winEnv?.NEXT_PUBLIC_EXTRACTOR_BASE, procEnv?.NEXT_PUBLIC_EXTRACTOR_BASE]
      .find((v): v is unknown => typeof v !== 'undefined');
    const extractorBase = (typeof configuredBase === 'string' ? configuredBase : undefined)
      || 'https://Rivalcoder-Rapid-Extractor.hf.space';

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImage = file.type.startsWith('image/') || /(png|jpe?g|webp|gif|bmp|tiff)$/i.test(file.name);
    const path = isPdf ? '/extract-pdf' : (isImage ? '/extract-image' : '/extract-pdf');
    const url = `${extractorBase.replace(/\/$/, '')}${path}`;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(url, { method: 'POST', body: formData });
      const rawText = await response.text();
      let parsed: unknown;
      try {
        parsed = JSON.parse(rawText);
      } catch {
        parsed = { raw: rawText } as const;
      }

      // Attempt to find extracted text in common fields safely
      const extracted = (() => {
        if (typeof parsed === 'string') return parsed;
        if (typeof (parsed as { extracted_text?: unknown }).extracted_text === 'string') {
          return (parsed as { extracted_text: string }).extracted_text;
        }
        if (typeof (parsed as { text?: unknown }).text === 'string') {
          return (parsed as { text: string }).text;
        }
        if (typeof (parsed as { content?: unknown }).content === 'string') {
          return (parsed as { content: string }).content;
        }
        const maybeData = (parsed as { data?: { text?: unknown } }).data;
        if (maybeData && typeof maybeData.text === 'string') {
          return maybeData.text;
        }
        if (typeof (parsed as { raw?: unknown }).raw === 'string') {
          return (parsed as { raw: string }).raw;
        }
        return '';
      })();

      if (!response.ok) {
        return { success: false, error: `HTTP ${response.status}: ${extracted?.slice?.(0, 200) || 'Extractor error'}` };
      }

      if (typeof extracted !== 'string' || extracted.trim().length === 0) {
        return { success: false, error: 'No text extracted from document' };
      }

      return { success: true, extracted_text: extracted };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Network error';
      return { success: false, error: message };
    }
  }

  async uploadDocumentToUrl(file: File): Promise<{ url: string }> {
    try {
      const formData = new FormData();
      formData.append('document', file);

      const response = await fetch(`${this.baseUrl}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  }

  async analyzeContract(file: File): Promise<ContractAnalysisResponse> {
    console.log('Making request to contract analysis API');
    console.log('File:', file.name, file.size, file.type);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${this.baseUrl}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error analyzing contract:', error);
      throw error;
    }
  }

  async checkHealth(): Promise<{ status: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
