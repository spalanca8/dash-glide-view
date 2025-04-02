
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  LineChart, 
  Database, 
  BarChart3, 
  TrendingUp, 
  MousePointerClick, 
  Eye, 
  Percent, 
  Target, 
  CreditCard, 
  Receipt, 
  Check 
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { advertisementMetrics } from "@/utils/metricUtils";

type SummaryMetricsCardsProps = {
  summaryMetrics: Record<string, any> | null;
  loading: boolean;
};

export function SummaryMetricsCards({ summaryMetrics, loading }: SummaryMetricsCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-10 w-10 rounded-full mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-6 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!summaryMetrics) return null;

  // Get icons for metrics
  const getIconForMetric = (iconName: string) => {
    switch (iconName) {
      case "BarChart": return <BarChart3 className="h-5 w-5 text-blue-600" />;
      case "DollarSign": return <Database className="h-5 w-5 text-red-600" />;
      case "TrendingUp": return <TrendingUp className="h-5 w-5 text-green-600" />;
      case "MousePointerClick": return <MousePointerClick className="h-5 w-5 text-purple-600" />;
      case "Eye": return <Eye className="h-5 w-5 text-indigo-600" />;
      case "Percent": return <Percent className="h-5 w-5 text-pink-600" />;
      case "Target": return <Target className="h-5 w-5 text-amber-600" />;
      case "CreditCard": return <CreditCard className="h-5 w-5 text-cyan-600" />;
      case "Receipt": return <Receipt className="h-5 w-5 text-emerald-600" />;
      case "Check": return <Check className="h-5 w-5 text-lime-600" />;
      default: return <LineChart className="h-5 w-5 text-gray-600" />;
    }
  };

  // Format metric values
  const formatMetricValue = (key: string, value: any) => {
    if (value === undefined || value === null) return "N/A";
    
    if (key === "revenue" || key === "cost" || key === "cpa" || key === "cpc") {
      return `$${value.toLocaleString()}`;
    }
    if (key === "ctr" || key === "conversionRate" || key === "bounceRate" || key === "engagementRate") {
      return `${typeof value === 'string' ? value : value.toFixed(2)}%`;
    }
    if (key === "roas") {
      return `${value.toFixed(2)}x`;
    }
    if (key === "avgSessionDuration") {
      const minutes = Math.floor(value / 60);
      const seconds = value % 60;
      return `${minutes}m ${seconds}s`;
    }
    return value.toLocaleString();
  };

  // Pick important metrics to display
  const displayMetrics = advertisementMetrics.filter(metric => 
    summaryMetrics[metric.key] !== undefined
  ).slice(0, 6);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
      {displayMetrics.map((metric) => (
        <Card key={metric.key}>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 mb-3">
              {getIconForMetric(metric.icon)}
            </div>
            <p className="text-sm text-muted-foreground mb-1" title={metric.description}>
              {metric.name}
            </p>
            <h3 className="text-xl font-bold">{formatMetricValue(metric.key, summaryMetrics[metric.key])}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
