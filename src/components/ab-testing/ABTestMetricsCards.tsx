
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ABTest } from "@/hooks/useMockABTestData";
import { ArrowUp, ArrowDown, CheckSquare, BarChart, LineChart, TrendingUp } from "lucide-react";

interface ABTestMetricsCardsProps {
  test: ABTest;
  loading: boolean;
}

export function ABTestMetricsCards({ test, loading }: ABTestMetricsCardsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
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

  // Find control and winning variant
  const controlVariant = test.variants.find(v => v.isControl);
  const winningVariant = test.winner 
    ? test.variants.find(v => v.id === test.winner) 
    : test.variants.reduce((prev, current) => 
        (current.conversionRate > prev.conversionRate) ? current : prev
      );

  // Calculate metrics
  const totalVisitors = test.variants.reduce((sum, v) => sum + v.visitors, 0);
  const totalConversions = test.variants.reduce((sum, v) => sum + v.conversions, 0);
  const overallConversionRate = (totalConversions / totalVisitors) * 100;
  const improvementPercent = controlVariant && winningVariant && !winningVariant.isControl 
    ? ((winningVariant.conversionRate - controlVariant.conversionRate) / controlVariant.conversionRate) * 100
    : 0;

  const metrics = [
    {
      title: "Total Visitors",
      value: totalVisitors.toLocaleString(),
      icon: BarChart,
      footer: `${test.variants.length} variants tested`
    },
    {
      title: "Total Conversions",
      value: totalConversions.toLocaleString(),
      icon: CheckSquare,
      footer: `${overallConversionRate.toFixed(2)}% overall conversion rate`
    },
    {
      title: "Top Performing Variant",
      value: winningVariant?.name || "N/A",
      icon: TrendingUp,
      footer: `${winningVariant?.conversionRate.toFixed(2)}% conversion rate`
    },
    {
      title: "Improvement",
      value: `${improvementPercent.toFixed(1)}%`,
      icon: improvementPercent > 0 ? ArrowUp : ArrowDown,
      footer: test.confidenceLevel ? `${test.confidenceLevel}% confidence` : "vs. control variant",
      positive: improvementPercent > 0
    }
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {metrics.map((metric, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">{metric.title}</span>
                <span className="text-2xl font-bold">{metric.value}</span>
                <div className="flex items-center gap-1 mt-1">
                  {metric.hasOwnProperty('positive') ? (
                    <span className={`text-xs ${metric.positive ? "text-green-500" : "text-red-500"}`}>
                      {metric.footer}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">{metric.footer}</span>
                  )}
                </div>
              </div>
              <div className="rounded-full bg-muted p-3">
                <metric.icon className="h-5 w-5 text-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
