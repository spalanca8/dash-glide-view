import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Filter, BarChart, PieChart, LineChart as LineChartIcon, GitCompare, FileBarChart, InfoIcon, Share2, Sparkles, AlertCircle, ArrowUpRight } from "lucide-react";
import { ChannelPerformanceTable } from "@/components/channels/ChannelPerformanceTable";
import { ChannelBreakdownChart } from "@/components/channels/ChannelBreakdownChart";
import { ChannelTrendsChart } from "@/components/channels/ChannelTrendsChart";
import { ChannelComparisonChart } from "@/components/channels/ChannelComparisonChart";
import { ChannelMetricsCards } from "@/components/channels/ChannelMetricsCards";
import { generateChannelData, generatePerformanceData, channelColors } from "@/data/mockData";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { CorrelationMatrix } from "@/components/channels/CorrelationMatrix";
import { MetricDistributionChart } from "@/components/channels/MetricDistributionChart";
import { MetricScatterPlot } from "@/components/channels/MetricScatterPlot";
import { FilterExportControls } from "@/components/channels/FilterExportControls";

const MetricsPage = () => {
  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState<any[]>([]);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [compareMetrics, setCompareMetrics] = useState("revenue-cost");
  const [timeframe, setTimeframe] = useState("30d");
  const [edaTab, setEdaTab] = useState("distribution");

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 700));

      const channels = generateChannelData(timeframe === "7d" ? "Q1" : timeframe === "30d" ? "Q2" : "Q3");
      const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90;
      const performance = generatePerformanceData(days);
      
      setChannelData(channels);
      setPerformanceData(performance);
      setLoading(false);
    };

    loadData();
  }, [timeframe]);

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
    <div className="animate-fade-in space-y-8">
      <PageHeader
        title="Exploratory Data Analysis"
        description="Discover hidden patterns, correlations, and insights across your marketing channels and metrics"
      >
        <div className="flex flex-wrap gap-2">
          <FilterExportControls 
            filterOptions={{ metrics: true, channels: false }}
            data={channelData}
            exportFileName="metrics-analysis"
            contentId="metrics-content"
          />
        </div>
      </PageHeader>

      {/* Key Metrics Overview - Enhanced with better styling */}
      <div id="metrics-overview" className="mb-8 w-full bg-gradient-to-br from-primary/5 to-transparent p-6 rounded-lg border border-primary/10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            Key Metrics Overview
          </h2>
          <div className="text-sm text-muted-foreground bg-background/70 px-3 py-1 rounded-full border shadow-sm">
            {timeframe === "7d" ? "Last 7 days" : timeframe === "30d" ? "Last 30 days" : "Last 90 days"}
          </div>
        </div>
        <ChannelMetricsCards data={channelData} loading={loading} />
      </div>

      {/* Exploratory Data Analysis Section - Enhanced with eda-card class */}
      <div id="metrics-content" className="eda-card mb-8 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <FileBarChart className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Data Exploration</h3>
          </div>
          <Button variant="outline" size="sm" className="gap-1 transition-all duration-300 hover:bg-primary/10">
            <InfoIcon className="h-4 w-4" /> 
            About EDA
          </Button>
        </div>

        <Tabs
          defaultValue="distribution"
          value={edaTab}
          onValueChange={setEdaTab}
        >
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 p-1">
            <TabsTrigger value="distribution" className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
              <BarChart className="h-4 w-4 mr-2" /> Distribution Analysis
            </TabsTrigger>
            <TabsTrigger value="correlation" className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
              <GitCompare className="h-4 w-4 mr-2" /> Correlation Analysis
            </TabsTrigger>
            <TabsTrigger value="scatter" className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
              <PieChart className="h-4 w-4 mr-2" /> Scatter Analysis
            </TabsTrigger>
          </TabsList>
          
          <div className="bg-white/50 p-4 rounded-lg border border-white/30 shadow-sm">
            <TabsContent value="distribution" className="mt-0">
              <div className="mb-3 flex justify-between">
                <h4 className="font-medium flex items-center text-primary">
                  <BarChart className="h-4 w-4 mr-2" /> 
                  Metric Distribution Across Channels
                </h4>
                <span className="text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded-full border border-border/30">
                  Showing data for {timeframe === "7d" ? "past week" : timeframe === "30d" ? "past month" : "past quarter"}
                </span>
              </div>
              <MetricDistributionChart data={channelData} loading={loading} />
            </TabsContent>
            
            <TabsContent value="correlation" className="mt-0">
              <div className="mb-3 flex justify-between">
                <h4 className="font-medium flex items-center text-primary">
                  <GitCompare className="h-4 w-4 mr-2" /> 
                  Metric Correlation Heatmap
                </h4>
                <span className="text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded-full border border-border/30">
                  {channelData.length} data points analyzed
                </span>
              </div>
              <CorrelationMatrix data={channelData} loading={loading} />
            </TabsContent>
            
            <TabsContent value="scatter" className="mt-0">
              <div className="mb-3 flex justify-between">
                <h4 className="font-medium flex items-center text-primary">
                  <PieChart className="h-4 w-4 mr-2" /> 
                  Metric Relationship Analysis
                </h4>
                <span className="text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded-full border border-border/30">
                  Interactive scatter visualization
                </span>
              </div>
              <MetricScatterPlot data={channelData} loading={loading} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Comparison controls - Enhanced with animated entries */}
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
                    dataKey: "search",
                    color: channelColors.search,
                    label: "Search",
                    yAxisId: "left"
                  },
                  {
                    dataKey: "social",
                    color: channelColors.social,
                    label: "Social",
                    yAxisId: "left"
                  },
                  {
                    dataKey: "email",
                    color: channelColors.email,
                    label: "Email",
                    yAxisId: "left"
                  },
                  {
                    dataKey: "display",
                    color: channelColors.display,
                    label: "Display",
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

      {/* Correlation Analysis - Enhanced with improved card styling */}
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
    </div>
  );
};

export default MetricsPage;
