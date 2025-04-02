
import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, LineChart, Target, Users, DollarSign, BarChart3, Filter, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterExportControls } from "@/components/channels/FilterExportControls";
import {
  generateChannelData,
  generatePerformanceData,
  channelColors,
  channelNames,
} from "@/data/mockData";
import { CampaignBreakdownTab } from "@/components/campaigns/CampaignBreakdownTab";
import { Cpu, Database, BarChart4, Info } from "lucide-react";
import { ChannelJourneyComparison } from "@/components/campaigns/ChannelJourneyComparison";
import { KeyMetricsGrid } from "@/components/dashboard/KeyMetricsGrid";
import { RoasComparisonChart } from "@/components/channels/RoasComparisonChart";
import { CampaignTimeline } from "@/components/campaigns/CampaignTimeline";

const ChannelDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const channelId = searchParams.get("id") || "search"; // Default to search if no ID

  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState<any | null>(null);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState("30d");
  const [attributionData, setAttributionData] = useState<any[]>([]);
  const [channelContribution, setChannelContribution] = useState<any[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [campaignData, setCampaignData] = useState<any | null>(null);
  const [journeyData, setJourneyData] = useState<any | null>(null);
  const [mainTab, setMainTab] = useState("overview"); // For main tab navigation

  // Mock campaigns for the filter
  const campaigns = [
    { id: "all", name: "All Campaigns" },
    { id: "camp1", name: "Summer Sale 2023" },
    { id: "camp2", name: "Holiday Promotion" },
    { id: "camp3", name: "Back to School" },
    { id: "camp4", name: "Spring Collection" },
    { id: "camp5", name: "Black Friday" },
  ];

  // Generate mock campaign metrics data
  const generateCampaignMetricsData = () => {
    return campaigns.map(campaign => {
      const revenue = Math.round(50000 + Math.random() * 300000);
      const cost = Math.round(20000 + Math.random() * 100000);
      const conversionRate = parseFloat((1 + Math.random() * 8).toFixed(2));
      
      return {
        id: campaign.id,
        name: campaign.name,
        revenue: revenue,
        cost: cost,
        roas: parseFloat((revenue / cost).toFixed(2)),
        conversionRate: conversionRate
      };
    });
  };

  const [campaignMetricsData, setCampaignMetricsData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate data loading
    const loadChannelData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const channelsData = generateChannelData(timeframe === "7d" ? "Q1" : timeframe === "30d" ? "Q2" : "Q3");
      
      // Add incremental outcomes for each channel (a derived metric based on revenue minus cost)
      const enhancedChannelsData = channelsData.map(channel => ({
        ...channel,
        incremental: Math.round(channel.revenue - channel.cost)
      }));
      
      const channel = enhancedChannelsData.find((c) => c.id === channelId) || enhancedChannelsData[0];
      
      const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90;
      const allPerformance = generatePerformanceData(days);
      
      // Extract just this channel's data for the performance chart
      const channelPerformance = allPerformance.map(day => ({
        name: day.name,
        date: day.date,
        revenue: day[channelId] || 0,
        // Add some made up metrics for the channel details
        clicks: Math.round((day[channelId] || 0) / (5 + Math.random() * 15)),
        impressions: Math.round((day[channelId] || 0) / (1 + Math.random() * 3) * 100),
        ctr: parseFloat((Math.random() * 5).toFixed(2)),
      }));
      
      setChannelData(channel);
      setPerformanceData(channelPerformance);
      
      // Generate attribution data
      const attributionChannels = ["Paid Search", "Organic Search", "Social Media", "Display", "Email", "Direct"];
      
      // Generate date range based on timeframe
      const attributionData = Array.from({ length: days }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - i - 1));
        
        return {
          date: date.toISOString().split('T')[0],
          value: Math.round(10000 + Math.random() * 50000),
          conversions: Math.round(50 + Math.random() * 200),
        };
      });
      
      // Generate channel contribution data for data-driven attribution
      const channelContribution = attributionChannels.map(channelName => {
        // Data-driven attribution gives more nuanced distribution based on model output
        const contributionValue = parseFloat((8 + Math.random() * 25).toFixed(1));
        
        return {
          channel: channelName,
          contribution: contributionValue,
          color: getChannelColor(channelName)
        };
      });
      
      // Normalize contributions to sum to 100%
      const totalContribution = channelContribution.reduce((sum, item) => sum + item.contribution, 0);
      channelContribution.forEach(item => {
        item.contribution = parseFloat(((item.contribution / totalContribution) * 100).toFixed(1));
      });
      
      // Sort by contribution value (descending)
      channelContribution.sort((a, b) => b.contribution - a.contribution);
      
      setAttributionData(attributionData);
      setChannelContribution(channelContribution);
      
      // Generate campaign-specific data if a campaign is selected
      if (selectedCampaign !== "all") {
        const campaign = campaigns.find(c => c.id === selectedCampaign);
        const campaignPerformance = {
          name: campaign?.name || "Campaign",
          revenue: Math.round(20000 + Math.random() * 80000),
          cost: Math.round(5000 + Math.random() * 30000),
          impressions: Math.round(500000 + Math.random() * 2000000),
          clicks: Math.round(15000 + Math.random() * 50000),
          conversions: Math.round(500 + Math.random() * 2000),
          targetAudience: ["25-34", "35-44", Math.random() > 0.5 ? "18-24" : "45-54"],
          topCreatives: [
            {
              id: "cr1",
              name: "Creative 1",
              performance: Math.round(80 + Math.random() * 20),
              impressions: Math.round(100000 + Math.random() * 400000),
              clicks: Math.round(5000 + Math.random() * 15000),
              ctr: parseFloat((2 + Math.random() * 5).toFixed(2)),
            },
            {
              id: "cr2",
              name: "Creative 2",
              performance: Math.round(60 + Math.random() * 30),
              impressions: Math.round(80000 + Math.random() * 300000),
              clicks: Math.round(3000 + Math.random() * 12000),
              ctr: parseFloat((1.5 + Math.random() * 4).toFixed(2)),
            },
            {
              id: "cr3",
              name: "Creative 3",
              performance: Math.round(50 + Math.random() * 40),
              impressions: Math.round(60000 + Math.random() * 200000),
              clicks: Math.round(2000 + Math.random() * 8000),
              ctr: parseFloat((1 + Math.random() * 3).toFixed(2)),
            }
          ],
          dailyData: Array.from({ length: days }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (days - i - 1));
            const impressions = Math.round(10000 + Math.random() * 30000);
            const clicks = Math.round(300 + Math.random() * 1500);
            const cost = Math.round(300 + Math.random() * 1500);
            
            // Calculate derived cost metrics
            const cpc = cost / Math.max(clicks, 1); // Cost per click
            const cpm = (cost / Math.max(impressions, 1)) * 1000; // Cost per mille (1000 impressions)
            const cpv = cost / Math.max(impressions * 0.4, 1); // Cost per view (assuming 40% view rate)
            
            return {
              date: date.toISOString().split('T')[0],
              impressions: impressions,
              clicks: clicks,
              conversions: Math.round(10 + Math.random() * 50),
              revenue: Math.round(1000 + Math.random() * 5000),
              cost: cost,
              cpc: cpc,
              cpm: cpm,
              cpv: cpv
            };
          }),
          geographicData: [
            { region: "North America", value: Math.round(30 + Math.random() * 40) },
            { region: "Europe", value: Math.round(20 + Math.random() * 30) },
            { region: "Asia", value: Math.round(10 + Math.random() * 20) },
            { region: "South America", value: Math.round(5 + Math.random() * 15) },
            { region: "Africa", value: Math.round(2 + Math.random() * 8) },
            { region: "Oceania", value: Math.round(1 + Math.random() * 5) },
          ]
        };
        
        setCampaignData(campaignPerformance);
      } else {
        setCampaignData(null);
      }
      
      // Generate campaign metrics data
      const campaignMetrics = generateCampaignMetricsData();
      setCampaignMetricsData(campaignMetrics);
      
      // Generate journey analysis data
      const journeyChannels = [
        {
          id: "search",
          name: channelNames.search,
          colorClass: `bg-[${channelColors.search}]`,
          conversions: 171850,
          journeyContribution: {
            awareness: 31,
            consideration: 12,
            conversion: 8,
            advocacy: 4
          }
        },
        {
          id: "social",
          name: channelNames.social,
          colorClass: `bg-[${channelColors.social}]`,
          conversions: 56205,
          journeyContribution: {
            awareness: 32,
            consideration: 18,
            conversion: 9,
            advocacy: 8
          }
        },
        {
          id: "video",
          name: channelNames.video,
          colorClass: `bg-[${channelColors.video}]`,
          conversions: 13824,
          journeyContribution: {
            awareness: 42,
            consideration: 27,
            conversion: 24,
            advocacy: 47
          }
        },
        {
          id: "display",
          name: channelNames.display,
          colorClass: `bg-[${channelColors.display}]`,
          conversions: 28470,
          journeyContribution: {
            awareness: 24,
            consideration: 24,
            conversion: 8,
            advocacy: 12
          }
        },
        {
          id: "affiliate",
          name: channelNames.affiliate,
          colorClass: `bg-[${channelColors.affiliate}]`,
          conversions: 12340,
          journeyContribution: {
            awareness: 23,
            consideration: 15,
            conversion: 6,
            advocacy: 16
          }
        },
        {
          id: "email",
          name: channelNames.email,
          colorClass: `bg-[${channelColors.email}]`,
          conversions: 14350,
          journeyContribution: {
            awareness: 12,
            consideration: 12,
            conversion: 38,
            advocacy: 23
          }
        },
        {
          id: "direct",
          name: channelNames.direct,
          colorClass: `bg-[${channelColors.direct}]`,
          conversions: 8230,
          journeyContribution: {
            awareness: 15,
            consideration: 21,
            conversion: 32,
            advocacy: 48
          }
        },
        {
          id: "referral",
          name: channelNames.referral,
          colorClass: `bg-[${channelColors.referral}]`,
          conversions: 5290,
          journeyContribution: {
            awareness: 10,
            consideration: 9,
            conversion: 22,
            advocacy: 35
          }
        }
      ];
      
      setJourneyData({ channels: journeyChannels });
      
      setLoading(false);
    };
    
    loadChannelData();
  }, [channelId, timeframe, selectedCampaign]);
  
  // Calculate totals for attribution metrics
  const totalRevenue = !loading && attributionData.length
    ? attributionData.reduce((sum, day) => sum + day.value, 0)
    : 0;
    
  const totalConversions = !loading && attributionData.length
    ? attributionData.reduce((sum, day) => sum + day.conversions, 0)
    : 0;
    
  const avgOrderValue = totalConversions > 0
    ? totalRevenue / totalConversions
    : 0;
  
  const conversionRate = 5.2; // Dummy value

  // Helper function to get channel colors
  const getChannelColor = (channel: string) => {
    const colors: Record<string, string> = {
      "Paid Search": "#4361ee",
      "Organic Search": "#3a0ca3",
      "Social Media": "#7209b7",
      "Display": "#f72585",
      "Email": "#4cc9f0",
      "Direct": "#560bad"
    };
    
    return colors[channel] || "#888888";
  };
  
  // Calculate channel metrics for current data
  const channelName = channelNames[channelId as keyof typeof channelNames] || "Channel";
  const channelColor = channelColors[channelId as keyof typeof channelColors] || "#4361ee";

  // Handle campaign change
  const handleCampaignChange = (campaignId: string) => {
    setSelectedCampaign(campaignId);
    setLoading(true);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Campaign Analysis"
        description="Advanced campaign performance analysis with data-driven attribution"
      >
        <Tabs
          defaultValue="30d"
          value={timeframe}
          onValueChange={setTimeframe}
          className="w-[240px]"
        >
          <TabsList className="grid w-full grid-cols-3 shadow-sm">
            <TabsTrigger value="7d">7D</TabsTrigger>
            <TabsTrigger value="30d">30D</TabsTrigger>
            <TabsTrigger value="90d">90D</TabsTrigger>
          </TabsList>
        </Tabs>
      </PageHeader>

      {/* Key metrics section - Removed the Card wrapper */}
      <div className="mb-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
        ) : (
          <KeyMetricsGrid
            totalRevenue={totalRevenue}
            totalCost={totalRevenue * 0.4}
            totalRoas={2.5}
            totalConversions={totalConversions}
            revenueChange={5.2}
            costChange={3.1}
            roasChange={2.1}
            conversionChange={4.3}
            loading={loading}
            campaignData={campaignMetricsData}
          />
        )}
      </div>

      {/* Main Tabs for Campaign Overview and Campaign Detailed */}
      <Tabs 
        defaultValue="overview" 
        value={mainTab} 
        onValueChange={setMainTab} 
        className="mb-6"
      >
        <TabsList className="w-full md:w-auto bg-white shadow-sm">
          <TabsTrigger value="overview" className="data-[state=active]:shadow-sm">
            Campaign Overview
          </TabsTrigger>
          <TabsTrigger value="detailed" className="data-[state=active]:shadow-sm">
            Campaign Detailed
          </TabsTrigger>
        </TabsList>

        {/* Campaign Overview Tab Content */}
        <TabsContent value="overview" className="space-y-8 mt-6">
          {/* Campaign Overview Section - Key Metrics */}
          <Card className="mb-6 overflow-hidden border-border/40 shadow-sm">
            <div className="h-1 bg-gradient-to-r from-primary/80 to-primary/40"></div>
            <CardHeader className="pb-3">
              <CardTitle>Campaign Overview</CardTitle>
              <CardDescription>Key performance metrics across all marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Skeleton className="h-28 w-full" />
                  <Skeleton className="h-28 w-full" />
                  <Skeleton className="h-28 w-full" />
                  <Skeleton className="h-28 w-full" />
                </div>
              ) : (
                <KeyMetricsGrid
                  totalRevenue={totalRevenue}
                  totalCost={totalRevenue * 0.4}
                  totalRoas={2.5}
                  totalConversions={totalConversions}
                  revenueChange={5.2}
                  costChange={3.1}
                  roasChange={2.1}
                  conversionChange={4.3}
                  loading={loading}
                />
              )}
            </CardContent>
          </Card>

          {/* ROAS vs Cost and Incremental Outcome Chart */}
          <div className="mb-6">
            <RoasComparisonChart 
              channelData={generateChannelData("Q2").map(channel => ({
                ...channel,
                incremental: Math.round(channel.revenue - channel.cost)
              }))} 
              loading={loading} 
            />
          </div>
          
          {/* Data-Driven Attribution Section */}
          <Card className="mb-6 overflow-hidden shadow-sm border-border/40">
            <div className="h-1 bg-gradient-to-r from-[#4361ee] to-[#7209b7]"></div>
            <CardHeader>
              <div className="flex flex-row items-center gap-2 mb-1">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Data-Driven Attribution</CardTitle>
              </div>
              <CardDescription>
                Powered by deep learning LSTM and Temporal Fusion Transformer models 
                that analyze touchpoint sequences to determine true contribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" /> 
                    How It Works
                  </h3>
                  <div className="p-5 bg-muted/30 rounded-xl space-y-5 border border-border/40">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                        <Database className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Data Collection</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Captures complete customer journey touchpoints across all channels and devices
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                        <Cpu className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Deep Learning Models</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          LSTM networks analyze sequential patterns while Temporal Fusion Transformers identify key interactions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                        <BarChart4 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Advanced Analytics</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Algorithms identify true incremental impact of each touchpoint based on conversion probability
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" /> 
                    Model Advantages
                  </h3>
                  <ul className="space-y-3 text-sm bg-muted/30 p-5 rounded-xl border border-border/40">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#4361ee]"></div>
                      <span>Captures complex non-linear relationships between touchpoints</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#7209b7]"></div>
                      <span>Accounts for time delays between marketing activities and conversions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#f72585]"></div>
                      <span>Identifies channel synergies and diminishing returns</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#4cc9f0]"></div>
                      <span>Continuously improves attribution accuracy with new data</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#560bad]"></div>
                      <span>Personalizes attribution based on customer segments</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Key metrics */}
              <h3 className="text-sm font-medium mb-6 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-primary" /> 
                Channel Contribution Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                  title="Attributed Revenue"
                  value={loading ? "-" : `$${totalRevenue.toLocaleString()}`}
                  change={5.2}
                  description="vs. previous period"
                  icon={<DollarSign className="h-4 w-4" />}
                  loading={loading}
                />
                <MetricCard
                  title="Attributed Conversions"
                  value={loading ? "-" : totalConversions.toLocaleString()}
                  change={3.8}
                  description="vs. previous period"
                  icon={<Users className="h-4 w-4" />}
                  loading={loading}
                />
                <MetricCard
                  title="Average Order Value"
                  value={loading ? "-" : `$${avgOrderValue.toFixed(2)}`}
                  change={1.5}
                  description="vs. previous period"
                  icon={<BarChart3 className="h-4 w-4" />}
                  loading={loading}
                />
                <MetricCard
                  title="Conversion Rate"
                  value={loading ? "-" : `${conversionRate}%`}
                  change={0.3}
                  description="vs. previous period"
                  icon={<LineChart className="h-4 w-4" />}
                  loading={loading}
                />
              </div>

              {/* Attribution chart */}
              <div className="bg-white p-5 rounded-xl border border-border/40 shadow-sm">
                {loading ? (
                  <Skeleton className="w-full h-[400px]" />
                ) : (
                  <div className="h-[400px]">
                    <AttributionChart data={channelContribution} />
                  </div>
                )}
                <div className="mt-4 text-sm text-muted-foreground border-t border-border/30 pt-4">
                  <p className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" /> 
                    Showing data-driven attribution results from neural network models trained on your marketing data.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overview Section - Journey Analysis */}
          <div className="space-y-6 mb-6">
            {journeyData && (
              <ChannelJourneyComparison 
                data={journeyData || { channels: [] }} 
                loading={loading} 
              />
            )}
          </div>
        </TabsContent>
        
        {/* Campaign Detailed Tab Content */}
        <TabsContent value="detailed" className="space-y-8 mt-6">
          {/* Campaign Filter Section */}
          <div className="space-y-8">
            {/* Campaign Selector */}
            <Card className="shadow-sm overflow-hidden border-border/40">
              <div className="h-1 bg-gradient-to-r from-[#f72585] to-[#4361ee]"></div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-primary/10">
                      <Filter className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Campaign Filter</CardTitle>
                  </div>
                  <FilterExportControls 
                    filterOptions={{ 
                      channels: false,
                      metrics: true
                    }}
                  />
                </div>
                <CardDescription>Select a specific campaign to view detailed analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedCampaign}
                  onValueChange={handleCampaignChange}
                >
                  <SelectTrigger className="w-full md:w-[320px] border-border/60">
                    <SelectValue placeholder="Select campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    {campaigns.map((campaign) => (
                      <SelectItem key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Attribution over time */}
            <Card className="shadow-sm overflow-hidden border-border/40">
              <div className="h-1 bg-gradient-to-r from-[#4361ee] to-[#f72585]"></div>
              <CardHeader>
                <CardTitle>Campaign Performance Over Time</CardTitle>
                <CardDescription>
                  Visualize attributed revenue and conversions across the selected time period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart 
                  data={attributionData} 
                  lines={[
                    {
                      dataKey: "value",
                      color: "#4361ee",
                      label: "Attributed Revenue",
                      yAxisId: "left"
                    },
                    {
                      dataKey: "conversions",
                      color: "#f72585",
                      label: "Conversions",
                      yAxisId: "right"
                    },
                  ]}
                  loading={loading}
                  height={350}
                />
              </CardContent>
            </Card>

            {/* Campaign Breakdown - Only shown when a specific campaign is selected */}
            {selectedCampaign !== "all" && (
              <div className="mt-6">
                <CampaignBreakdownTab 
                  campaignData={campaignData} 
                  loading={loading} 
                  campaign={campaigns.find(c => c.id === selectedCampaign) || { id: "", name: "" }}
                />
              </div>
            )}
            
            {/* Campaign Timeline - Only shown in Campaign Detailed tab */}
            <div className="mt-6">
              <CampaignTimeline loading={loading} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper component for the attribution chart
const AttributionChart: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="w-full h-full flex">
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="w-full max-w-2xl mx-auto">
            <div className="relative pt-1">
              {data.map((item, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="font-medium text-sm">{item.channel}</span>
                    </div>
                    <span className="font-medium text-sm">{item.contribution}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-2.5 rounded-full transition-all duration-1000 animate-[expandWidth_1s_ease-out]"
                      style={{
                        width: `${item.contribution}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelDetailsPage;
