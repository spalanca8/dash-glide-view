
import React from "react";
import { ResponsiveContainer, Sankey, Tooltip, Layer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type SankeyNode = {
  name: string;
  value?: number;
  fill?: string;
};

type SankeyLink = {
  source: number;
  target: number;
  value: number;
  fill?: string;
};

type SankeyData = {
  nodes: SankeyNode[];
  links: SankeyLink[];
};

interface SankeyDiagramProps {
  data: SankeyData;
  loading?: boolean;
  height?: number;
  className?: string;
}

export function SankeyDiagram({
  data,
  loading = false,
  height = 400,
  className,
}: SankeyDiagramProps) {
  if (loading) {
    return (
      <div className={cn("w-full animate-pulse", className)} style={{ height }}>
        <div className="h-full w-full bg-muted rounded-md"></div>
      </div>
    );
  }

  // Check if data is valid
  if (!data?.nodes?.length || !data?.links?.length) {
    return (
      <div className={cn("w-full flex items-center justify-center", className)} style={{ height }}>
        <p className="text-muted-foreground">No data available for visualization</p>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={data}
          nodeWidth={20}
          nodePadding={50}
          link={{ 
            stroke: "#d0d5dd", 
            opacity: 0.6,
            fill: "url(#gradient)" // Using gradient for links
          }}
          margin={{
            top: 20,
            right: 180,
            bottom: 20,
            left: 40,
          }}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4361ee" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.8}/>
            </linearGradient>
          </defs>
          <Layer>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-border/50 bg-background px-3 py-2 text-sm shadow-xl">
                      <p className="font-medium">
                        {data.source?.name || 'Unknown'} → {data.target?.name || 'Unknown'}
                      </p>
                      <p className="text-muted-foreground pt-1">
                        Value: ${data.value ? Number(data.value).toLocaleString() : 'N/A'}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </Layer>
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
}
