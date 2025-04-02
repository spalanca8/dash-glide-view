
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, PercentIcon, TrendingDown, TrendingUp, Activity, BarChart3, Users, ArrowUpRight } from "lucide-react";

type ChannelMetricsCardsProps = {
  data: any[];
  loading: boolean;
};

export function ChannelMetricsCards({ data, loading }: ChannelMetricsCardsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex flex-col gap-3">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Calculate total metrics from all channels
  const totalRevenue = data.reduce((sum, channel) => sum + channel.revenue, 0);
  const totalCost = data.reduce((sum, channel) => sum + channel.cost, 0);
  const avgRoas = totalRevenue / totalCost || 0;
  const avgConversion = data.reduce((sum, channel) => sum + channel.conversion, 0) / data.length || 0;
  
  // Calculate standard deviations for each metric
  const revenueValues = data.map(c => c.revenue);
  const costValues = data.map(c => c.cost);
  const roasValues = data.map(c => c.roas);
  const conversionValues = data.map(c => c.conversion);
  
  const stdDevRevenue = calculateStdDev(revenueValues);
  const stdDevCost = calculateStdDev(costValues);
  const stdDevRoas = calculateStdDev(roasValues);
  const stdDevConversion = calculateStdDev(conversionValues);

  // Calculate median values
  const medianRevenue = calculateMedian(revenueValues);
  const medianCost = calculateMedian(costValues);
  const medianRoas = calculateMedian(roasValues);
  const medianConversion = calculateMedian(conversionValues);

  // Calculate min and max values
  const minRevenue = Math.min(...revenueValues);
  const maxRevenue = Math.max(...revenueValues);
  const minCost = Math.min(...costValues);
  const maxCost = Math.max(...costValues);
  const minRoas = Math.min(...roasValues);
  const maxRoas = Math.max(...roasValues);
  const minConversion = Math.min(...conversionValues);
  const maxConversion = Math.max(...conversionValues);

  const metrics = [
    {
      title: "Revenue Summary",
      value: `$${totalRevenue.toLocaleString()}`,
      trend: totalRevenue > 500000 ? 12.5 : -5.2,
      icon: DollarSign,
      details: [
        { label: "Mean", value: `$${Math.round(totalRevenue / data.length).toLocaleString()}` },
        { label: "Median", value: `$${medianRevenue.toLocaleString()}` },
        { label: "Std Dev", value: `$${stdDevRevenue.toLocaleString()}` },
        { label: "Range", value: `$${minRevenue.toLocaleString()} - $${maxRevenue.toLocaleString()}` }
      ]
    },
    {
      title: "Cost Summary",
      value: `$${totalCost.toLocaleString()}`,
      trend: totalCost > 200000 ? 8.3 : -3.1,
      icon: BarChart3,
      details: [
        { label: "Mean", value: `$${Math.round(totalCost / data.length).toLocaleString()}` },
        { label: "Median", value: `$${medianCost.toLocaleString()}` },
        { label: "Std Dev", value: `$${stdDevCost.toLocaleString()}` },
        { label: "Range", value: `$${minCost.toLocaleString()} - $${maxCost.toLocaleString()}` }
      ]
    },
    {
      title: "ROAS Summary",
      value: `${avgRoas.toFixed(2)}x`,
      trend: avgRoas > 2.5 ? 5.7 : -2.4,
      icon: ArrowUpRight,
      details: [
        { label: "Mean", value: `${avgRoas.toFixed(2)}x` },
        { label: "Median", value: `${medianRoas.toFixed(2)}x` },
        { label: "Std Dev", value: `${stdDevRoas.toFixed(2)}x` },
        { label: "Range", value: `${minRoas.toFixed(2)}x - ${maxRoas.toFixed(2)}x` }
      ]
    },
    {
      title: "Conversion Summary",
      value: `${avgConversion.toFixed(2)}%`,
      trend: avgConversion > 2 ? 9.2 : -4.1,
      icon: Users,
      details: [
        { label: "Mean", value: `${avgConversion.toFixed(2)}%` },
        { label: "Median", value: `${medianConversion.toFixed(2)}%` },
        { label: "Std Dev", value: `${stdDevConversion.toFixed(2)}%` },
        { label: "Range", value: `${minConversion.toFixed(2)}% - ${maxConversion.toFixed(2)}%` }
      ]
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">{metric.title}</span>
                <span className="text-2xl font-bold">{metric.value}</span>
                <div className="flex items-center gap-1 mt-1">
                  {metric.trend > 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-green-500">+{metric.trend}% vs prev.</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 text-red-500" />
                      <span className="text-xs text-red-500">{metric.trend}% vs prev.</span>
                    </>
                  )}
                </div>
              </div>
              <div className="rounded-full bg-muted p-3">
                <metric.icon className="h-5 w-5 text-foreground" />
              </div>
            </div>
            
            <div className="space-y-2 pt-2 border-t border-border">
              {metric.details.map((detail, j) => (
                <div key={j} className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">{detail.label}:</span>
                  <span className="font-medium">{detail.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Helper function to calculate standard deviation
function calculateStdDev(values: number[]): number {
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
  return Math.sqrt(variance);
}

// Helper function to calculate median
function calculateMedian(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  
  return sorted[middle];
}
