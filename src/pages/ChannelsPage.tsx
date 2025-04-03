import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, PieChart, LineChart as LineChartIcon, Filter, ArrowDown, ArrowUp, Table as TableIcon, Info, Calendar, TrendingUp, Activity, GitCompare } from "lucide-react";
import { ChannelPerformanceTable } from "@/components/channels/ChannelPerformanceTable";
import { ChannelBreakdownChart } from "@/components/dashboard/ChannelBreakdownChart";
import { ChannelTrendsChart } from "@/components/channels/ChannelTrendsChart";
import { ChannelComparisonChart } from "@/components/channels/ChannelComparisonChart";
import { ChannelMetricsOverview } from "@/components/channels/ChannelMetricsOverview";
import { generateChannelData, generateChannelTrendsData, channelColors, channelNames, generateYearOverYearData, generateExternalFactorsYoYData, mediaGroupColors } from "@/data/mockData";
import { FilterExportControls } from "@/components/channels/FilterExportControls";
import { ChannelDetailView } from "@/components/channels/ChannelDetailView";
import { RoasComparisonChart } from "@/components/channels/RoasComparisonChart";
import { IncrementalRevenueWaterfallChart } from "@/components/channels/IncrementalRevenueWaterfallChart";
import { YearOverYearComparisonChart } from "@/components/channels/YearOverYearComparisonChart";

export default function ChannelsPage() {
  const [mainTab, setMainTab] = useState("overview");
  const [activeTab, setActiveTab] = useState("performance");
  const [channelData, setChannelData] = useState<any[]>([]);
  const [trendsData, setTrendsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("Q4");
  const [selectedChannel, setSelectedChannel] = useState<string | null>(Object.keys(channelNames)[0]); // Default to first channel
  const [yearOverYearData, setYearOverYearData] = useState<{
    revenueByFactor: any[];
    revenueByChannel: any[];
    roasByChannel: any[];
    externalFactors: any[];
  }>({
    revenueByFactor: [],
    revenueByChannel: [],
    roasByChannel: [],
    externalFactors: []
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Generate data with incremental outcomes included
      const data = generateChannelData(timeframe);
      const trends = generateChannelTrendsData();
      
      // Generate Year-over-Year comparison data
      const yoyData = generateYearOverYearData();
      const externalFactors = generateExternalFactorsYoYData();
      
      setChannelData(data);
      setTrendsData(trends);
      setYearOverYearData({
        revenueByFactor: yoyData.revenueByFactor,
        revenueByChannel: yoyData.revenueByChannel,
        roasByChannel: yoyData.roasByChannel,
        externalFactors: externalFactors
      });
      setLoading(false);
    };

    loadData();
  }, [timeframe]);

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
  };

  const handleChannelSelect = (value: string) => {
    setSelectedChannel(value);
  };

  // Get the list of available channels for the filter
  const availableChannels = Object.keys(channelNames).map(id => ({
    id,
    name: channelNames[id as keyof typeof channelNames]
  }));

  // Get the selected channel data
  const selectedChannelData = selectedChannel 
    ? channelData.find(channel => channel.id === selectedChannel)
    : null;

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col">
        <PageHeader title="Channels" description="Analyze campaign performance by channel">
          <div className="flex items-center gap-2">
            <Select onValueChange={handleTimeframeChange} defaultValue="Q4">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Q1">Q1 2023</SelectItem>
                <SelectItem value="Q2">Q2 2023</SelectItem>
                <SelectItem value="Q3">Q3 2023</SelectItem>
                <SelectItem value="Q4">Q4 2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </PageHeader>
      </div>

      <ChannelMetricsOverview data={channelData} loading={loading} />
      
      {/* Main Tabs */}
      <Tabs value={mainTab} onValueChange={setMainTab} defaultValue="overview" className="space-y-6">
        <TabsList className="justify-start">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="detailed" className="flex items-center gap-2">
            <TableIcon className="h-4 w-4" /> Detailed Analysis
          </TabsTrigger>
          <TabsTrigger value="yoy" className="flex items-center gap-2">
            <Calendar className="h-5 w-5" /> Year-over-Year
          </TabsTrigger>
        </TabsList>

        {/* Channel Overview Tab Content */}
        <TabsContent value="overview" className="space-y-8 mt-8">
          {/* New Waterfall Chart Component */}
          <IncrementalRevenueWaterfallChart data={channelData} loading={loading} />
          
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center">
              <div className="flex flex-col space-y-1.5">
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" /> Channel Overview
                </CardTitle>
                <CardDescription>
                  Compare performance metrics across channels
                </CardDescription>
              </div>
              <div className="ml-auto">
                <FilterExportControls />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium mb-1">About Channel Overview</h3>
                    <p className="text-sm text-muted-foreground">
                      This dashboard provides a comprehensive view of your marketing channel performance. 
                      ROAS (Return on Ad Spend) is the primary metric used to evaluate efficiency across channels.
                      Use the tabs below to explore different visualizations and insights about your marketing mix.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">ROAS by Channel</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Compare the return on ad spend across your marketing channels. Higher values indicate more efficient spending.
                </p>
                <RoasComparisonChart channelData={channelData} loading={loading} />
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full md:w-auto">
                  <TabsTrigger value="performance" className="flex items-center gap-1">
                    <BarChart className="h-4 w-4" /> Performance
                  </TabsTrigger>
                  <TabsTrigger value="breakdown" className="flex items-center gap-1">
                    <PieChart className="h-4 w-4" /> Breakdown
                  </TabsTrigger>
                  <TabsTrigger value="trends" className="flex items-center gap-1">
                    <LineChartIcon className="h-4 w-4" /> Trends
                  </TabsTrigger>
                  <TabsTrigger value="comparison" className="flex items-center gap-1">
                    <BarChart className="h-4 w-4" /> Comparison
                  </TabsTrigger>
                </TabsList>
                
                <div className="mt-2 mb-4">
                  {activeTab === "performance" && (
                    <p className="text-sm text-muted-foreground">
                      View detailed performance metrics for each channel in a tabular format.
                    </p>
                  )}
                  {activeTab === "breakdown" && (
                    <p className="text-sm text-muted-foreground">
                      Visualize the contribution of each channel to your overall marketing performance.
                    </p>
                  )}
                  {activeTab === "trends" && (
                    <p className="text-sm text-muted-foreground">
                      Track how channel performance has evolved over time to identify patterns and opportunities.
                    </p>
                  )}
                  {activeTab === "comparison" && (
                    <p className="text-sm text-muted-foreground">
                      Compare multiple metrics across channels to understand relative strengths and weaknesses.
                    </p>
                  )}
                </div>
                
                <TabsContent value="performance" className="border-none p-0 pt-4">
                  <ChannelPerformanceTable data={channelData} loading={loading} />
                </TabsContent>
                <TabsContent value="breakdown" className="border-none p-0 pt-4">
                  <ChannelBreakdownChart data={channelData} loading={loading} />
                </TabsContent>
                <TabsContent value="trends" className="border-none p-0 pt-4">
                  <ChannelTrendsChart data={trendsData} loading={loading} />
                </TabsContent>
                <TabsContent value="comparison" className="border-none p-0 pt-4">
                  <ChannelComparisonChart data={channelData} loading={loading} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Channel Details Tab Content */}
        <TabsContent value="detailed" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TableIcon className="h-5 w-5" /> 
                    Channel Details
                  </CardTitle>
                  <CardDescription>
                    Select a specific channel to view detailed performance insights
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium mb-1">About Channel Details</h3>
                    <p className="text-sm text-muted-foreground">
                      This section provides in-depth analysis for individual marketing channels. 
                      Select a specific channel from the options below to view its detailed metrics, performance trends, 
                      and saturation analysis. Use these insights to optimize your strategy for each channel.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Channel Filter Section */}
              <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                <h3 className="text-sm font-medium mb-3">Channel Filter</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {availableChannels.map((channel) => (
                    <Button
                      key={channel.id}
                      variant={selectedChannel === channel.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => handleChannelSelect(channel.id)}
                      style={{ borderColor: selectedChannel === channel.id ? "transparent" : channelColors[channel.id as keyof typeof channelColors] }}
                    >
                      {channel.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Show Channel Detail View when a channel is selected */}
              {selectedChannel && selectedChannelData ? (
                <ChannelDetailView 
                  channelData={selectedChannelData} 
                  trendsData={trendsData}
                  loading={loading} 
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Select a channel above to view detailed performance data
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Year-over-Year Tab Content */}
        <TabsContent value="yoy" className="space-y-6 mt-6">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" /> 
                    Year-over-Year Performance
                  </CardTitle>
                  <CardDescription>
                    Compare this period's performance to the same period last year
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium mb-1">About Year-over-Year Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      This analysis compares current period metrics with the same period from last year,
                      showing percentage changes across different dimensions. Use these insights to identify
                      trends, improvements, and areas needing attention in your marketing strategy.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                <div>
                  <YearOverYearComparisonChart
                    title="Percentage Change in Incremental Revenue by Factor"
                    description="How incremental revenue has changed since last year across different business factors"
                    data={yearOverYearData.revenueByFactor}
                    loading={loading}
                    height={400}
                    showInfo={true}
                    infoText="This chart shows how incremental revenue contributions have changed year-over-year across major business categories. Positive values indicate growth, while negative values show decline."
                  />
                </div>
                
                <div>
                  <YearOverYearComparisonChart
                    title="Percentage Change in Incremental Revenue by Media Channel"
                    description="How each channel's contribution to incremental revenue has changed since last year"
                    data={yearOverYearData.revenueByChannel}
                    loading={loading}
                    height={400}
                  />
                </div>
                
                <div>
                  <YearOverYearComparisonChart
                    title="Percentage Change in ROAS by Media Channel"
                    description="How return on ad spend has evolved since last year for each channel"
                    data={yearOverYearData.roasByChannel}
                    loading={loading}
                    height={400}
                    showInfo={true}
                    infoText="Return on Ad Spend (ROAS) changes show how efficiently your marketing spend is converting to revenue compared to the same period last year."
                  />
                </div>
                
                <div>
                  <YearOverYearComparisonChart
                    title="Percentage Change in Incremental Revenue from External Factors"
                    description="Breakdown of how external factors have influenced incremental revenue year-over-year"
                    data={yearOverYearData.externalFactors}
                    loading={loading}
                    height={350}
                    showInfo={true}
                    infoText="External factors include market conditions, competitive landscape, seasonality, economic indicators, and other elements outside direct marketing control."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
