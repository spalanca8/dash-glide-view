import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  PieChart, 
  LineChart as LineChartIcon, 
  Filter, 
  ArrowDown, 
  ArrowUp, 
  Table as TableIcon, 
  Info, 
  Calendar, 
  TrendingUp, 
  Activity, 
  GitCompare, 
  AlertTriangle, 
  Lightbulb 
} from "lucide-react";
import { ChannelPerformanceTable } from "@/components/channels/ChannelPerformanceTable";
import { ChannelBreakdownChart } from "@/components/dashboard/ChannelBreakdownChart";
import { ChannelTrendsChart } from "@/components/channels/ChannelTrendsChart";
import { ChannelComparisonChart } from "@/components/channels/ChannelComparisonChart";
import { ChannelMetricsOverview } from "@/components/channels/ChannelMetricsOverview";
import { 
  generateChannelData, 
  generateChannelTrendsData, 
  channelColors, 
  channelNames, 
  generateYearOverYearData, 
  generateExternalFactorsYoYData, 
  generateMonthOverMonthData,
  mediaGroupColors 
} from "@/data/mockData";
import { FilterExportControls } from "@/components/channels/FilterExportControls";
import { ChannelDetailView } from "@/components/channels/ChannelDetailView";
import { RoasComparisonChart } from "@/components/channels/RoasComparisonChart";
import { CostRevenueComparisonChart } from "@/components/channels/CostRevenueComparisonChart";
import { IncrementalRevenueWaterfallChart } from "@/components/channels/IncrementalRevenueWaterfallChart";
import { YearOverYearComparisonChart } from "@/components/channels/YearOverYearComparisonChart";
import { MonthOverMonthComparisonChart } from "@/components/channels/MonthOverMonthComparisonChart";

export default function ChannelsPage() {
  const [mainTab, setMainTab] = useState("overview");
  const [activeTab, setActiveTab] = useState("performance");
  const [channelData, setChannelData] = useState<any[]>([]);
  const [trendsData, setTrendsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("Q4");
  const [selectedChannel, setSelectedChannel] = useState<string | null>(Object.keys(channelNames)[0]);
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
  const [monthOverMonthData, setMonthOverMonthData] = useState<any[]>([]);
  const [momSelectedChannel, setMomSelectedChannel] = useState("all");
  const [momSelectedFactor, setMomSelectedFactor] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const data = generateChannelData(timeframe);
      const trends = generateChannelTrendsData();
      
      const yoyData = generateYearOverYearData();
      const externalFactors = generateExternalFactorsYoYData();
      
      const momData = generateMonthOverMonthData();
      
      const fixedRevenueByFactor = yoyData.revenueByFactor.map(item => {
        if (item.name === "External Factors") {
          return { ...item, value: -12 }; // Change to negative 12%
        }
        if (item.name === "Pricing") {
          return { ...item, value: -8 }; // Change to negative 8%
        }
        return item;
      });
      
      const fixedExternalFactors = externalFactors.map(item => {
        if (item.name === "Market Conditions") {
          return { ...item, value: -12 }; // Change to negative 12%
        }
        if (item.name === "Competitor Activity") {
          return { ...item, value: -15 }; // Change to negative 15%
        }
        return item;
      });
      
      setChannelData(data);
      setTrendsData(trends);
      setYearOverYearData({
        revenueByFactor: fixedRevenueByFactor,
        revenueByChannel: yoyData.revenueByChannel,
        roasByChannel: yoyData.roasByChannel,
        externalFactors: fixedExternalFactors
      });
      setMonthOverMonthData(momData);
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

  const availableChannels = Object.keys(channelNames).map(id => ({
    id,
    name: channelNames[id as keyof typeof channelNames]
  }));

  const channelOptions = Object.keys(channelNames).map(id => ({
    value: id,
    label: channelNames[id as keyof typeof channelNames],
    color: channelColors[id as keyof typeof channelColors]
  }));

  const factorOptions = [
    { value: "paidMedia", label: "Paid Media" },
    { value: "ownedMedia", label: "Owned Media" },
    { value: "promotions", label: "Promotions" },
    { value: "external", label: "External Factors" },
    { value: "pricing", label: "Pricing" }
  ];

  const selectedChannelData = selectedChannel 
    ? channelData.find(channel => channel.id === selectedChannel)
    : null;

  const revenueFactorInsights = [
    "Paid Online Media shows a 24% increase, indicating effective digital investments",
    "Offline Media performance has declined by 2%, suggesting a shift in customer behavior",
    "Promotions have increased revenue by 14%, showing good campaign planning",
    "External Factors have negatively impacted revenue by 12%, highlighting market volatility"
  ];

  const revenueChannelInsights = [
    "Search and Social channels are your top performers with 30%+ growth",
    "Email marketing shows moderate growth at 15%, consistent with industry trends",
    "Display advertising has seen limited growth compared to other channels",
    "Consider reallocating budget from lower to higher performing channels"
  ];

  const roasChannelInsights = [
    "Search Ads ROAS improved by 22%, showing increased efficiency",
    "Social Media ROAS increase of 18% shows better targeting is working",
    "Email continues to be the most cost-effective channel with 25% ROAS improvement",
    "Video advertising efficiency has improved but still lags behind other channels"
  ];

  const externalFactorsInsights = [
    "Market conditions account for the biggest negative impact at -12%",
    "Competitor activity has intensified, causing a 15% negative impact",
    "Seasonal factors contributed positively with an 8% uplift",
    "Industry trends are favorable, contributing a 16% positive impact"
  ];

  const getBestAndWorstPerformers = (data: any[]) => {
    if (!data.length) return { best: "", worst: "" };
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    return {
      best: `${sortedData[0].name} (${sortedData[0].value > 0 ? "+" : ""}${sortedData[0].value}%)`,
      worst: `${sortedData[sortedData.length - 1].name} (${sortedData[sortedData.length - 1].value > 0 ? "+" : ""}${sortedData[sortedData.length - 1].value}%)`
    };
  };

  const revenueFactorPerformers = getBestAndWorstPerformers(yearOverYearData.revenueByFactor);
  const revenueChannelPerformers = getBestAndWorstPerformers(yearOverYearData.revenueByChannel);
  const roasChannelPerformers = getBestAndWorstPerformers(yearOverYearData.roasByChannel);
  const externalFactorsPerformers = getBestAndWorstPerformers(yearOverYearData.externalFactors);

  const getFilteredMomData = () => {
    let filtered = [...monthOverMonthData];
    
    if (momSelectedChannel !== "all") {
      filtered = filtered.filter(item => item.channel === momSelectedChannel);
    }
    
    if (momSelectedFactor !== "all") {
      filtered = filtered.filter(item => item.factor === momSelectedFactor);
    }
    
    return filtered;
  };

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

        <TabsContent value="overview" className="space-y-8 mt-8">
          <IncrementalRevenueWaterfallChart data={channelData} loading={loading} />
          
          <Card className="border-blue-100 bg-blue-50/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2 text-blue-800">
                <Lightbulb className="h-5 w-5 text-yellow-500" /> Key Takeaways
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium text-green-800">Top Performers</h3>
                  </div>
                  <ul className="ml-7 list-disc space-y-1 text-sm text-green-700">
                    <li>Search delivers highest ROAS at 5.2x, leading all channels</li>
                    <li>Social media shows consistent growth in Q4</li>
                    <li>Email marketing remains most cost-effective channel</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <h3 className="font-medium text-amber-800">Areas of Concern</h3>
                  </div>
                  <ul className="ml-7 list-disc space-y-1 text-sm text-amber-700">
                    <li>Display advertising ROAS falling below 2.0x threshold</li>
                    <li>Video shows high cost but moderate return</li>
                    <li>Affiliate network needs optimization</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium text-blue-800">Recommendations</h3>
                  </div>
                  <ul className="ml-7 list-disc space-y-1 text-sm text-blue-700">
                    <li>Reallocate 15% of display budget to search and social</li>
                    <li>Optimize video creative to improve engagement</li>
                    <li>Increase email frequency to capitalize on high ROAS</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
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
                <h3 className="text-lg font-medium mb-3">Revenue and Cost by Channel</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Compare both cost and incremental revenue across your marketing channels.
                </p>
                <CostRevenueComparisonChart channelData={channelData} loading={loading} />
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">ROAS by Channel</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Compare return on ad spend across your marketing channels. Higher values indicate more efficient spending.
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
                  <ChannelBreakdownChart 
                    data={channelData} 
                    loading={loading} 
                    bars={[
                      { dataKey: "revenue", color: "#4361ee", label: "Revenue" },
                      { dataKey: "cost", color: "#f72585", label: "Cost" },
                      { dataKey: "roas", color: "#8B5CF6", label: "ROAS" }
                    ]} 
                  />
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
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Q4 2023 vs Q4 2022
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium mb-1 text-blue-800">Executive Summary</h3>
                    <p className="text-sm text-blue-700">
                      Overall, your marketing performance has improved by 18% year-over-year, with Paid Online Media 
                      driving the strongest growth at 24%. Your most efficient channel is Email Marketing with a 25% 
                      increase in ROAS. Market conditions are creating a -12% headwind, suggesting the need to 
                      adjust strategies in challenging market segments.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <MonthOverMonthComparisonChart 
                  data={getFilteredMomData()} 
                  loading={loading} 
                  height={400} 
                  metric="Revenue"
                  hideChangeMetric={true}
                  channels={channelOptions}
                  factors={factorOptions}
                  onChannelChange={(channel) => setMomSelectedChannel(channel)}
                  onFactorChange={(factor) => setMomSelectedFactor(factor)}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-10">
                <div>
                  <YearOverYearComparisonChart
                    title="Percentage Change in Incremental Revenue by Factor"
                    description="How incremental revenue has changed since last year across different business factors"
                    data={yearOverYearData.revenueByFactor}
                    loading={loading}
                    height={400}
                    showInfo={true}
                    infoText="This chart shows how incremental revenue contributions have changed year-over-year across major business categories. Positive values indicate growth, while negative values show decline."
                    insights={revenueFactorInsights}
                    bestPerformer={revenueFactorPerformers.best}
                    worstPerformer={revenueFactorPerformers.worst}
                  />
                </div>
                
                <div>
                  <YearOverYearComparisonChart
                    title="Percentage Change in Incremental Revenue by Media Channel"
                    description="How each channel's contribution to incremental revenue has changed since last year"
                    data={yearOverYearData.revenueByChannel}
                    loading={loading}
                    height={400}
                    insights={revenueChannelInsights}
                    bestPerformer={revenueChannelPerformers.best}
                    worstPerformer={revenueChannelPerformers.worst}
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
                    insights={roasChannelInsights}
                    bestPerformer={roasChannelPerformers.best}
                    worstPerformer={roasChannelPerformers.worst}
                  />
                </div>
                
                <div className="mb-4">
                  <YearOverYearComparisonChart
                    title="Percentage Change in Incremental Revenue from External Factors"
                    description="Breakdown of how external factors have influenced incremental revenue year-over-year"
                    data={yearOverYearData.externalFactors}
                    loading={loading}
                    height={350}
                    showInfo={true}
                    infoText="External factors include market conditions, competitive landscape, seasonality, economic indicators, and other elements outside direct marketing control."
                    insights={externalFactorsInsights}
                    bestPerformer={externalFactorsPerformers.best}
                    worstPerformer={externalFactorsPerformers.worst}
                  />
                </div>
                
                <div className="p-6 bg-amber-50 border border-amber-100 rounded-lg mb-2">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-amber-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-amber-800 mb-2 text-lg">Key Recommendations</h3>
                      <ul className="list-disc pl-5 space-y-3 text-amber-700">
                        <li>
                          <strong>Reallocate Budget:</strong> Given the 30%+ growth in Search and Social channels, consider shifting 15-20% of your Display budget to these higher-performing channels.
                        </li>
                        <li>
                          <strong>Mitigate External Risks:</strong> Develop contingency plans for the -12% impact from market conditions, potentially through more resilient promotional strategies.
                        </li>
                        <li>
                          <strong>Optimize Email Marketing:</strong> With its 25% ROAS improvement, invest in expanding your email subscriber base and segmentation capabilities.
                        </li>
                        <li>
                          <strong>Review Offline Strategy:</strong> The -2% performance decline suggests a need to reassess your offline media approach and better integrate it with digital channels.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
