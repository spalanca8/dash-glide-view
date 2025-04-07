
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Share2, ArrowUpRight, BarChart, Sparkles } from "lucide-react";

interface KeyInsightsProps {
  metric1: string;
  metric2: string;
  formatMetricName: (metric: string) => string;
}

export const KeyInsights = ({ metric1, metric2, formatMetricName }: KeyInsightsProps) => {
  return (
    <div id="metrics-insights" className="eda-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Key Insights
          </h3>
          <p className="text-sm text-muted-foreground">
            Actionable findings from your marketing data
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1 hover:bg-primary/10 transition-colors">
          <Share2 className="h-4 w-4" /> Share insights
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="eda-metric-card animate-entry" style={{ '--entry-delay': '4' } as React.CSSProperties}>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4 text-primary" />
              {formatMetricName(metric1)} vs. {formatMetricName(metric2)}
            </CardTitle>
            <CardDescription className="font-medium text-green-600">Strong positive correlation (0.87)</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-muted-foreground">
              There is a strong relationship between these metrics, suggesting that 
              improvements in {formatMetricName(metric1)} tend to drive similar 
              improvements in {formatMetricName(metric2)}.
            </p>
          </CardContent>
        </Card>

        <Card className="eda-metric-card animate-entry" style={{ '--entry-delay': '5' } as React.CSSProperties}>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <BarChart className="h-4 w-4 text-primary" />
              Channel Efficiency
            </CardTitle>
            <CardDescription className="font-medium text-amber-600">Ranking by {formatMetricName(metric1)}/{formatMetricName(metric2)} ratio</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-muted-foreground">
              Search and Email channels show the highest efficiency when 
              measuring {formatMetricName(metric1)} relative to {formatMetricName(metric2)}.
              Consider optimizing budget allocation accordingly.
            </p>
          </CardContent>
        </Card>

        <Card className="eda-metric-card animate-entry" style={{ '--entry-delay': '6' } as React.CSSProperties}>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Actionable Insight
            </CardTitle>
            <CardDescription className="font-medium text-blue-600">Optimization opportunity</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-muted-foreground">
              Based on the {formatMetricName(metric1)}/{formatMetricName(metric2)} analysis, 
              an opportunity exists to reallocate budget from Display to Search 
              channels for a potential 15% efficiency gain.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
