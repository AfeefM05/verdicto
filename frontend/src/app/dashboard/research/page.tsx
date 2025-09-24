"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, FileText, ExternalLink, Filter, TrendingUp } from "lucide-react";

export default function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const researchResults = [
    {
      id: 1,
      title: "Contract Law Precedents - Delaware",
      type: "Case Law",
      jurisdiction: "Delaware",
      relevance: 95,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Employment Law Regulations - Federal",
      type: "Regulation",
      jurisdiction: "Federal",
      relevance: 87,
      date: "2024-01-14"
    },
    {
      id: 3,
      title: "Intellectual Property Cases - Recent",
      type: "Case Law",
      jurisdiction: "Federal",
      relevance: 92,
      date: "2024-01-13"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Legal Research</h1>
          <p className="text-muted-foreground">Search case law, regulations, and legal precedents</p>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Advanced Filters
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Research Query
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Enter your legal research query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-gradient-primary text-white">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Research Results</h2>
        </div>

        {researchResults.map((result) => (
          <Card key={result.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{result.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {result.type}
                    </span>
                    <span>{result.jurisdiction}</span>
                    <span>{result.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {result.relevance}% Match
                  </Badge>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Relevant legal precedent and case law analysis for your research query...
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <FileText className="mr-1 h-3 w-3" />
                  View Full Text
                </Button>
                <Button size="sm" variant="outline">
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Open Source
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
