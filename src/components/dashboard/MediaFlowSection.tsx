
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { SankeyDiagram } from "@/components/dashboard/SankeyDiagram";

interface MediaFlowSectionProps {
  data: any;
  loading: boolean;
}

export function MediaFlowSection({ data, loading }: MediaFlowSectionProps) {
  // Add validation check for the data structure
  const isValidData = data && 
                      data.nodes && 
                      Array.isArray(data.nodes) && 
                      data.links && 
                      Array.isArray(data.links);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Media Flow Analysis</CardTitle>
        <CardDescription>
          Flow of revenue through media categories to individual channels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SankeyDiagram
          data={isValidData ? data : { nodes: [], links: [] }}
          loading={loading}
          height={350}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" /> 
            This diagram shows how revenue flows from media categories to individual channels, with wider connections indicating higher revenue flow.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
