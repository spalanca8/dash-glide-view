
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitCompare, BarChart, LineChartIcon } from "lucide-react";
import { ChannelBreakdownChart } from "@/components/channels/ChannelBreakdownChart";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { channelColors } from "@/data/mockData";

interface MetricComparisonProps {
  channelData: any[];
  performanceData: any[];
  loading: boolean;
  compareMetrics: string;
  setCompareMetrics: (value: string) => void;
  timeframe: string;
  setTimeframe: (value: string) => void;
}

export const MetricComparison = ({ 
  channelData, 
  performanceData, 
  loading, 
  compareMetrics, 
  setCompareMetrics,
  timeframe,
  setTimeframe
}: MetricComparisonProps) => {
  // Parse the comparison metrics
  const [metric1, metric2] = compareMetrics.split("-");

  // Format metric display names
  const formatMetricName = (metric: string) => {
    return {
      revenue: "Revenue",
      cost: "Cost",
      roas: "ROAS",
      conversion: "Conversion Rate",
    }[metric] || metric;
  };

  return (
    <div id="metrics-comparison" className="eda-card mb-8 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2 animate-entry" style={{ '--entry-delay': '0' } as React.CSSProperties}>
          <GitCompare className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Metric Comparison</h3>
        </div>

        <div className="flex flex-wrap gap-3 animate-entry" style={{ '--entry-delay': '1' } as React.CSSProperties}>
          <Tabs
            defaultValue="revenue-cost"
            value={compareMetrics}
            onValueChange={setCompareMetrics}
            className="w-[300px]"
          >
            <TabsList className="grid w-full grid-cols-3 bg-muted/50">
              <TabsTrigger value="revenue-cost" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Revenue vs. Cost</TabsTrigger>
              <TabsTrigger value="revenue-conversion" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Revenue vs. Conv.</TabsTrigger>
              <TabsTrigger value="cost-roas" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Cost vs. ROAS</TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs
            defaultValue="30d"
            value={timeframe}
            onValueChange={setTimeframe}
            className="w-[240px]"
          >
            <TabsList className="grid w-full grid-cols-3 bg-muted/50">
              <TabsTrigger value="7d" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">7D</TabsTrigger>
              <TabsTrigger value="30d" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">30D</TabsTrigger>
              <TabsTrigger value="90d" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">90D</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="animate-entry eda-gradient-bg" style={{ '--entry-delay': '2' } as React.CSSProperties}>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <BarChart className="h-4 w-4 text-primary" />
              By Channel
            </CardTitle>
            <CardDescription>
              Comparing {formatMetricName(metric1)} and {formatMetricName(metric2)} across channels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChannelBreakdownChart
              data={channelData}
              bars={[
                {
                  dataKey: metric1,
                  color: "#4361ee",
                  label: formatMetricName(metric1),
                },
                {
                  dataKey: metric2,
                  color: "#f72585",
                  label: formatMetricName(metric2),
                },
              ]}
              xAxisKey="name"
              loading={loading}
              height={300}
            />
          </CardContent>
        </Card>

        <Card className="animate-entry eda-gradient-bg" style={{ '--entry-delay': '3' } as React.CSSProperties}>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <LineChartIcon className="h-4 w-4 text-primary" />
              Over Time
            </CardTitle>
            <CardDescription>
              Comparing {formatMetricName(metric1)} and {formatMetricName(metric2)} trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceChart
              data={performanceData}
              lines={[
                {
                  dataKey: "google",
                  color: channelColors.google,
                  label: "Google",
                  yAxisId: "left"
                },
                {
                  dataKey: "facebook",
                  color: channelColors.facebook,
                  label: "Facebook",
                  yAxisId: "left"
                },
                {
                  dataKey: "email",
                  color: channelColors.email,
                  label: "Email",
                  yAxisId: "left"
                },
                {
                  dataKey: "tiktok",
                  color: channelColors.tiktok,
                  label: "TikTok",
                  yAxisId: "left"
                },
              ]}
              loading={loading}
              height={300}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
