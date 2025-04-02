
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { channelColors } from "@/data/mockData";

type ChannelMetricsOverviewProps = {
  data: any[];
  loading: boolean;
};

export function ChannelMetricsOverview({ data, loading }: ChannelMetricsOverviewProps) {
  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-2/3 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Handle empty data array to prevent calculation errors
  if (!data || data.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-muted-foreground">No channel data available</p>
      </div>
    );
  }

  // Calculate metrics
  const metrics = [
    {
      name: "Revenue",
      property: "revenue",
      format: (val: number | undefined | null) => {
        if (val === undefined || val === null) return "$0";
        return `$${val.toLocaleString()}`;
      },
      average: data.reduce((sum, item) => sum + (item.revenue || 0), 0) / data.length,
      best: data.reduce((best, item) => (item.revenue || 0) > (best?.revenue || 0) ? item : best, data[0]),
      worst: data.reduce((worst, item) => (item.revenue || 0) < (worst?.revenue || 0) ? item : worst, data[0])
    },
    {
      name: "Cost",
      property: "cost",
      format: (val: number | undefined | null) => {
        if (val === undefined || val === null) return "$0";
        return `$${val.toLocaleString()}`;
      },
      average: data.reduce((sum, item) => sum + (item.cost || 0), 0) / data.length,
      // For cost, lower is better
      best: data.reduce((best, item) => (item.cost || 0) < (best?.cost || 0) ? item : best, data[0]),
      worst: data.reduce((worst, item) => (item.cost || 0) > (worst?.cost || 0) ? item : worst, data[0])
    },
    {
      name: "ROAS",
      property: "roas",
      format: (val: number | undefined | null) => {
        if (val === undefined || val === null) return "0.00x";
        return `${val.toFixed(2)}x`;
      },
      average: data.reduce((sum, item) => sum + (item.roas || 0), 0) / data.length,
      best: data.reduce((best, item) => (item.roas || 0) > (best?.roas || 0) ? item : best, data[0]),
      worst: data.reduce((worst, item) => (item.roas || 0) < (worst?.roas || 0) ? item : worst, data[0])
    },
    {
      name: "Conversion",
      property: "conversion",
      format: (val: number | undefined | null) => {
        if (val === undefined || val === null) return "0.00%";
        return `${val.toFixed(2)}%`;
      },
      average: data.reduce((sum, item) => {
        // Use convRate if conversion is not present, fallback to 0
        const convValue = item.conversion || item.convRate || 0;
        return sum + convValue;
      }, 0) / data.length,
      best: data.reduce((best, item) => {
        const bestConv = best?.conversion || best?.convRate || 0;
        const itemConv = item.conversion || item.convRate || 0;
        return itemConv > bestConv ? item : best;
      }, data[0]),
      worst: data.reduce((worst, item) => {
        const worstConv = worst?.conversion || worst?.convRate || 0;
        const itemConv = item.conversion || item.convRate || 0;
        return itemConv < worstConv ? item : worst;
      }, data[0])
    }
  ];

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.name} className="overflow-hidden border hover:shadow-md transition-shadow">
          <div className="bg-primary/10 py-3 px-6">
            <h3 className="text-lg font-medium">{metric.name} Overview</h3>
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <span className="text-sm font-medium text-muted-foreground">Average:</span>
              <span className="text-xl font-bold">{metric.format(metric.average)}</span>
            </div>
            
            <div className="space-y-5">
              <div className="group relative overflow-hidden rounded-md p-3 transition-all hover:bg-primary/5">
                <div className="absolute left-0 top-0 h-full w-1 bg-green-500"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowUp className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">Best:</span>
                  </div>
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ 
                      backgroundColor: channelColors[metric.best?.id as keyof typeof channelColors] || "#888" 
                    }}
                  />
                </div>
                <div className="mt-1 flex justify-between items-center">
                  <span className="font-medium text-sm">{metric.best?.name || "N/A"}</span>
                  <span className="font-bold">
                    {metric.format(metric.best?.[metric.property])}
                  </span>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-md p-3 transition-all hover:bg-primary/5">
                <div className="absolute left-0 top-0 h-full w-1 bg-red-500"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowDown className="h-5 w-5 text-red-500" />
                    <span className="text-sm font-medium">Worst:</span>
                  </div>
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ 
                      backgroundColor: channelColors[metric.worst?.id as keyof typeof channelColors] || "#888" 
                    }}
                  />
                </div>
                <div className="mt-1 flex justify-between items-center">
                  <span className="font-medium text-sm">{metric.worst?.name || "N/A"}</span>
                  <span className="font-bold">
                    {metric.format(metric.worst?.[metric.property])}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
