"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Archive, Search, Filter, Download, Eye, RotateCcw } from "lucide-react";

export default function ArchivePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const archivedItems = [
    {
      id: 1,
      name: "Old Contract - ABC Corp (2019)",
      type: "Contract",
      archivedDate: "2023-12-15",
      originalDate: "2019-03-20",
      status: "Completed"
    },
    {
      id: 2,
      name: "Legal Brief - Smith Case (2022)",
      type: "Legal Brief",
      archivedDate: "2023-11-30",
      originalDate: "2022-08-15",
      status: "Settled"
    },
    {
      id: 3,
      name: "Research Notes - IP Law",
      type: "Research",
      archivedDate: "2023-10-20",
      originalDate: "2021-05-10",
      status: "Superseded"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Archive</h1>
          <p className="text-muted-foreground">View and manage archived documents and cases</p>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter Archive
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search archived items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Archive className="mr-2 h-4 w-4" />
          Archive Stats
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {archivedItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow border-muted">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="p-2 bg-muted rounded-lg">
                  <Archive className="h-6 w-6 text-muted-foreground" />
                </div>
                <Badge variant="outline" className="text-muted-foreground">
                  {item.status}
                </Badge>
              </div>
              <CardTitle className="text-lg">{item.name}</CardTitle>
              <CardDescription>
                {item.type} • Archived: {item.archivedDate}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <div>Original Date: {item.originalDate}</div>
                <div>Archived: {item.archivedDate}</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="mr-1 h-3 w-3" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="mr-1 h-3 w-3" />
                  Download
                </Button>
                <Button size="sm" variant="outline">
                  <RotateCcw className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Archive Statistics</CardTitle>
          <CardDescription>Overview of your archived content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">247</div>
              <div className="text-sm text-muted-foreground">Total Archived</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">89</div>
              <div className="text-sm text-muted-foreground">Contracts</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">156</div>
              <div className="text-sm text-muted-foreground">Legal Briefs</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">2</div>
              <div className="text-sm text-muted-foreground">Research Docs</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
