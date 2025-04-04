
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChannelPerformanceTable } from "@/components/channels/ChannelPerformanceTable";
import { ChannelBreakdownChart } from "@/components/channels/ChannelBreakdownChart";
import { ChannelTrendsChart } from "@/components/channels/ChannelTrendsChart";
import { ChannelComparisonChart } from "@/components/channels/ChannelComparisonChart";
import { YearOverYearComparisonChart } from "@/components/channels/YearOverYearComparisonChart";
import { ChannelMetricsOverview } from "@/components/channels/ChannelMetricsOverview";
import { ChannelDetailView } from "@/components/channels/ChannelDetailView";
import { MonthOverMonthComparisonChart } from "@/components/channels/MonthOverMonthComparisonChart";
import { IncrementalRevenueWaterfallChart } from "@/components/channels/IncrementalRevenueWaterfallChart";
import { IncrementalRevenueByFactorChart } from "@/components/channels/IncrementalRevenueByFactorChart";
import { RoasComparisonChart } from "@/components/channels/RoasComparisonChart";
import { EuropeRoasHeatmap } from "@/components/channels/EuropeRoasHeatmap";
import { CostRevenueComparisonChart } from "@/components/channels/CostRevenueComparisonChart";
import { generateChannelData, generatePerformanceData, channelColors } from "@/data/mockData";
import { useDataProcessor } from "@/hooks/useDataProcessor";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const ChannelsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const { toast } = useToast();
  
  const { 
    channelData, 
    trendsData, 
    processingError,
    yearOverYearData,
    monthOverMonthData,
    loading: dataLoading
  } = useDataProcessor({
    dataGeneratorFn: generateChannelData,
    timeSeriesFn: generatePerformanceData,
    onError: (error) => {
      toast({
        title: "Data Processing Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 700));
      
      setLoading(false);
    };
    
    loadData();
  }, []);

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannel(channelId);
    setActiveTab("details");
  };

  const selectedChannelData = channelData.find(
    (channel) => channel.id === selectedChannel
  );

  // External factors data for YoY comparison
  const externalFactorsYoYData = [
    {
      name: "Economic Growth",
      value: 8.5,
      color: "#4ade80",
    },
    {
      name: "Competitor Activity",
      value: -4.5,
      color: "#f87171",
    },
    {
      name: "Platform Algorithm Changes",
      value: -3.5,
      color: "#f87171",
    },
    {
      name: "Seasonal Effects",
      value: 12.0,
      color: "#4ade80",
    },
    {
      name: "Privacy Regulations",
      value: -2.5,
      color: "#f87171",
    },
  ];

  // Contextual information for external factors
  const externalFactorsContextualInfo = {
    "Economic Growth": "Overall market expansion has driven increased consumer spending, creating a positive lift of 8.5% in year-over-year revenue performance.",
    "Competitor Activity": "Major competitor campaigns and pricing strategies have created headwinds resulting in approximately 4.5% decrease in potential revenue growth.",
    "Platform Algorithm Changes": "Updates to search engines and social media algorithms have reduced organic reach by approximately 3.5%, affecting visibility and engagement.",
    "Seasonal Effects": "Holiday and promotional periods have generated a 12% lift compared to typical baseline performance due to increased consumer intent.",
    "Privacy Regulations": "GDPR, CCPA and iOS updates have reduced targeting capabilities and attribution accuracy by approximately 2.5% as more users opt out of tracking."
  };

  // Creative performance data for YoY comparison
  const creativeYoYData = [
    {
      name: "Video Assets",
      value: 14.2,
      color: "#4ade80",
    },
    {
      name: "Static Banners",
      value: -2.7,
      color: "#f87171",
    },
    {
      name: "Interactive Ads",
      value: 18.5,
      color: "#4ade80",
    },
    {
      name: "Native Content",
      value: 7.3,
      color: "#4ade80",
    },
    {
      name: "Text Ads",
      value: -5.1,
      color: "#f87171",
    },
  ];

  // Combined loading state
  const isLoading = loading || dataLoading;

  return (
    <div className="animate-fade-in space-y-8">
      <PageHeader
        title="Channel Analysis"
        description="Analyze performance across marketing channels"
      />

      <ChannelMetricsOverview data={channelData} loading={isLoading} />
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="yoy">Year-Over-Year</TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedChannel}>
            {selectedChannel
              ? `${channelData.find((ch) => ch.id === selectedChannel)?.name} Details`
              : "Channel Details"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Channel Performance</h3>
                <ChannelPerformanceTable
                  data={channelData}
                  loading={isLoading}
                  onRowClick={handleChannelSelect}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Channel Breakdown</h3>
                <ChannelBreakdownChart
                  data={channelData}
                  bars={[
                    { dataKey: "revenue", color: "#4361ee", label: "Revenue" },
                    { dataKey: "cost", color: "#f72585", label: "Cost" },
                  ]}
                  xAxisKey="name"
                  loading={isLoading}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <IncrementalRevenueWaterfallChart 
              data={channelData} 
              loading={isLoading} 
            />
          </div>
          
          <div className="space-y-6">
            <IncrementalRevenueByFactorChart loading={isLoading} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CostRevenueComparisonChart
              channelData={channelData}
              loading={isLoading}
            />
            <RoasComparisonChart 
              channelData={channelData}
              loading={isLoading}
            />
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6 pt-6">
          <ChannelComparisonChart data={channelData} loading={isLoading} />
          <EuropeRoasHeatmap loading={isLoading} />
        </TabsContent>

        <TabsContent value="trends" className="space-y-6 pt-6">
          <ChannelTrendsChart data={trendsData} loading={isLoading} />
        </TabsContent>

        <TabsContent value="yoy" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <YearOverYearComparisonChart
              data={yearOverYearData}
              title="Year-Over-Year Channel Performance"
              description="Percentage change in revenue compared to previous year"
              loading={isLoading}
              insights={[
                "Search shows the strongest YoY growth at +15.2%",
                "Display shows concerning decline of -5.8%",
                "Email remains stable with moderate growth"
              ]}
              bestPerformer="Search"
              worstPerformer="Display"
            />
            
            <MonthOverMonthComparisonChart
              data={monthOverMonthData}
              loading={isLoading}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <YearOverYearComparisonChart
              data={externalFactorsYoYData}
              title="External Factors Impact on Revenue"
              description="Percentage change in incremental revenue from external market factors"
              loading={isLoading}
              contextualInfo={externalFactorsContextualInfo}
              insights={[
                "Seasonal effects provide the biggest positive impact at +12.0%",
                "Competitor activity is the largest negative factor at -4.5%",
                "Net impact of all external factors is positive at +10.0%"
              ]}
              bestPerformer="Seasonal Effects"
              worstPerformer="Competitor Activity"
            />
            
            <YearOverYearComparisonChart
              data={creativeYoYData}
              title="Creative Performance Year-Over-Year"
              description="Percentage change in performance by creative type"
              loading={isLoading}
              insights={[
                "Interactive ads show the strongest performance improvements",
                "Video assets consistently outperform static assets",
                "Text ads continue to decline in effectiveness"
              ]}
              bestPerformer="Interactive Ads"
              worstPerformer="Text Ads"
            />
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6 pt-6">
          {selectedChannelData ? (
            <ChannelDetailView
              channelData={selectedChannelData}
              trendsData={trendsData}
              loading={isLoading}
            />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Select a channel from the overview tab to see detailed insights.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChannelsPage;
