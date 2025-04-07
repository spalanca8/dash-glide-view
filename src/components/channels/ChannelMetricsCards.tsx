
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, BarChart3, ArrowUpRight, Users } from "lucide-react";

type ChannelMetricsCardsProps = {
  data: any[];
  loading: boolean;
};

export function ChannelMetricsCards({ data, loading }: ChannelMetricsCardsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex flex-col gap-3">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-10 w-3/4" />
              </div>
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
  const totalRevenue = data.reduce((sum, channel) => sum + (channel.revenue || 0), 0);
  const totalCost = data.reduce((sum, channel) => sum + (channel.cost || 0), 0);
  const avgRoas = totalRevenue / totalCost || 0;
  const avgConversion = data.reduce((sum, channel) => sum + (channel.conversion || 0), 0) / data.length || 0;

  // Find best performing channel for each metric with null checks
  const bestRevenue = data.reduce((best, item) => (item.revenue || 0) > (best?.revenue || 0) ? item : best, data[0]);
  const lowestCost = data.reduce((best, item) => (item.cost || 0) < (best?.cost || 0) ? item : best, data[0]);
  const bestRoas = data.reduce((best, item) => (item.roas || 0) > (best?.roas || 0) ? item : best, data[0]);
  const bestConversion = data.reduce((best, item) => {
    const bestConv = best?.conversion || 0;
    const itemConv = item.conversion || 0;
    return itemConv > bestConv ? item : best;
  }, data[0]);

  // Format values safely with null checks
  const formatValue = (value: number | undefined, decimals = 2): string => {
    if (value === undefined || value === null) return "N/A";
    return value.toFixed(decimals);
  };

  const metrics = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      bestChannel: bestRevenue?.name || "N/A",
      bestValue: bestRevenue?.revenue !== undefined ? `$${bestRevenue.revenue.toLocaleString()}` : "N/A"
    },
    {
      title: "Total Cost",
      value: `$${totalCost.toLocaleString()}`,
      icon: BarChart3,
      bestChannel: lowestCost?.name || "N/A",
      bestValue: lowestCost?.cost !== undefined ? `$${lowestCost.cost.toLocaleString()}` : "N/A"
    },
    {
      title: "Average ROAS",
      value: `${formatValue(avgRoas)}x`,
      icon: ArrowUpRight,
      bestChannel: bestRoas?.name || "N/A",
      bestValue: bestRoas?.roas !== undefined ? `${formatValue(bestRoas.roas)}x` : "N/A"
    },
    {
      title: "Avg Conversion",
      value: `${formatValue(avgConversion)}%`,
      icon: Users,
      bestChannel: bestConversion?.name || "N/A",
      bestValue: bestConversion?.conversion !== undefined ? `${formatValue(bestConversion.conversion)}%` : "N/A"
    }
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{metric.title}</span>
              <div className="rounded-full bg-muted p-2">
                <metric.icon className="h-4 w-4 text-foreground" />
              </div>
            </div>
            
            <div className="mb-3">
              <span className="text-2xl font-bold">{metric.value}</span>
            </div>
            
            <div className="border-t pt-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Best Channel:</span>
                <span className="font-medium">{metric.bestChannel}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-muted-foreground">Value:</span>
                <span className="font-medium">{metric.bestValue}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
