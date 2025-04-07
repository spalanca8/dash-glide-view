import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, LineChart, Target, Users, DollarSign, BarChart3, Filter, ChevronRight, PercentIcon, Calendar } from "lucide-react";
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
import { CostRevenueComparisonChart } from "@/components/channels/CostRevenueComparisonChart";
import { CampaignTimeline } from "@/components/campaigns/CampaignTimeline";

import { IncrementalRevenueCounter } from "@/components/campaign-analytics/IncrementalRevenueCounter";
import { PromotionLiftChart } from "@/components/campaign-analytics/PromotionLiftChart";
import { PromotionCalendar } from "@/components/campaign-analytics/PromotionCalendar";
import { PromotionCostChart } from "@/components/campaign-analytics/PromotionCostChart";
import { EfficiencyRatioChart } from "@/components/campaign-analytics/EfficiencyRatioChart";
import { PromotionTypeChart } from "@/components/campaign-analytics/PromotionTypeChart";

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

  const campaigns = [
    { id: "camp1", name: "Summer Sale 2023" },
    { id: "camp2", name: "Holiday Promotion" },
    { id: "camp3", name: "Back to School" },
    { id: "camp4", name: "Spring Collection" },
    { id: "camp5", name: "Black Friday" },
  ];

  const generateCampaignMetricsData = () => {
    return campaigns.map(campaign => {
      const revenue = Math.round(50000 + Math.random() * 300000);
      const cost = Math.round(20000 + Math.random() * 100000);
      const conversionRate = parseFloat((1 + Math.random() * 8).toFixed(2));
      const incremental = revenue - cost;
      
      return {
        id: campaign.id,
        name: campaign.name,
        revenue: revenue,
        cost: cost,
        incremental: incremental,
        roas: parseFloat((revenue / cost).toFixed(2)),
        conversionRate: conversionRate
      };
    });
  };

  const [campaignMetricsData, setCampaignMetricsData] = useState<any[]>([]);

  useEffect(() => {
    const loadChannelData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const channelsData = generateChannelData(timeframe === "7d" ? "Q1" : timeframe === "30d" ? "Q2" : "Q3");
      
      const enhancedChannelsData = channelsData.map(channel => ({
        ...channel,
        incremental: Math.round(channel.revenue - channel.cost)
      }));
      
      const channel = enhancedChannelsData.find((c) => c.id === channelId) || enhancedChannelsData[0];
      
      const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90;
      const allPerformance = generatePerformanceData(days);
      
      const channelPerformance = allPerformance.map(day => ({
        name: day.name,
        date: day.date,
        revenue: day[channelId] || 0,
        clicks: Math.round((day[channelId] || 0) / (5 + Math.random() * 15)),
        impressions: Math.round((day[channelId] || 0) / (1 + Math.random() * 3) * 100),
        ctr: parseFloat((Math.random() * 5).toFixed(2)),
      }));
      
      setChannelData(channel);
      setPerformanceData(channelPerformance);
      
      const attributionChannels = ["Paid Search", "Organic Search", "Social Media", "Display", "Email", "Direct"];
      
      const attributionData = Array.from({ length: days }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - i - 1));
        
        return {
          date: date.toISOString().split('T')[0],
          value: Math.round(10000 + Math.random() * 50000),
          conversions: Math.round(50 + Math.random() * 200),
        };
      });
      
      const channelContribution = attributionChannels.map(channelName => {
        const contributionValue = parseFloat((8 + Math.random() * 25).toFixed(1));
        
        return {
          channel: channelName,
          contribution: contributionValue,
          color: getChannelColor(channelName)
        };
      });
      
      const totalContribution = channelContribution.reduce((sum, item) => sum + item.contribution, 0);
      channelContribution.forEach(item => {
        item.contribution = parseFloat(((item.contribution / totalContribution) * 100).toFixed(1));
      });
      
      channelContribution.sort((a, b) => b.contribution - a.contribution);
      
      setAttributionData(attributionData);
      setChannelContribution(channelContribution);
      
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
            
            const cpc = cost / Math.max(clicks, 1);
            const cpm = (cost / Math.max(impressions, 1)) * 1000;
            const cpv = cost / Math.max(impressions * 0.4, 1);
            
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
            { region: "New York", value: Math.round(30 + Math.random() * 40) },
            { region: "Los Angeles", value: Math.round(20 + Math.random() * 30) },
            { region: "Chicago", value: Math.round(10 + Math.random() * 20) },
            { region: "Miami", value: Math.round(5 + Math.random() * 15) },
            { region: "Houston", value: Math.round(2 + Math.random() * 8) },
            { region: "San Francisco", value: Math.round(1 + Math.random() * 5) },
          ]
        };
        
        setCampaignData(campaignPerformance);
      } else {
        setCampaignData(null);
      }
      
      const campaignMetrics = generateCampaignMetricsData();
      setCampaignMetricsData(campaignMetrics);
      
      const journeyChannels = [
        {
          id: "google",
          name: channelNames.google,
          colorClass: `bg-[${channelColors.google}]`,
          conversions: 171850,
          journeyContribution: {
            awareness: 31,
            consideration: 12,
            conversion: 8,
            advocacy: 4
          }
        },
        {
          id: "facebook",
          name: channelNames.facebook,
          colorClass: `bg-[${channelColors.facebook}]`,
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
          id: "tiktok",
          name: channelNames.tiktok,
          colorClass: `bg-[${channelColors.tiktok}]`,
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
        }
      ];
      
      setJourneyData({ channels: journeyChannels });
      
      setLoading(false);
    };
    
    loadChannelData();
  }, [channelId, timeframe, selectedCampaign]);
  
  const totalRevenue = !loading && attributionData.length
    ? attributionData.reduce((sum, day) => sum + day.value, 0)
    : 0;
    
  const totalConversions = !loading && attributionData.length
    ? attributionData.reduce((sum, day) => sum + day.conversions, 0)
    : 0;
    
  const avgOrderValue = totalConversions > 0
    ? totalRevenue / totalConversions
    : 0;
  
  const conversionRate = 5.2;

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
  
  const channelName = channelNames[channelId as keyof typeof channelNames] || "Channel";
  const channelColor = channelColors[channelId as keyof typeof channelColors] || "#4361ee";

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

      <Tabs 
        defaultValue="overview" 
        value={mainTab} 
        onValueChange={setMainTab} 
        className="mb-6"
      >
        <TabsList className="w-full md:w-auto bg-white shadow-sm">
          <TabsTrigger value="overview" className="data-[state=active]:shadow-sm">
            <LineChart className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="detailed" className="data-[state=active]:shadow-sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Detailed Analytics
          </TabsTrigger>
          <TabsTrigger value="promotional" className="data-[state=active]:shadow-sm">
            <Target className="w-4 h-4 mr-2" />
            Promotional Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 mt-6">
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
          
          <Card className="mb-6 overflow-hidden border-border/40 shadow-sm">
            <div className="h-1 bg-gradient-to-r from-primary/80 to-primary/40"></div>
            <CardHeader>
              <CardTitle>Campaign Insights</CardTitle>
              <CardDescription>Performance metrics by campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <CostRevenueComparisonChart 
                    channelData={campaignMetricsData} 
                    loading={loading}
                    title="Cost and Incremental Revenue by Campaign"
                    description="Comparing marketing spend versus incremental outcomes across campaigns"
                  />
                </div>
                <div>
                  <RoasComparisonChart 
                    channelData={campaignMetricsData} 
                    loading={loading}
                    title="Return on Ad Spend (ROAS) by Campaign"
                    description="Comparing efficiency of marketing spend across campaigns"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
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
            </CardContent>
          </Card>

          <div className="space-y-6 mb-6">
            {journeyData && (
              <ChannelJourneyComparison 
                data={journeyData || { channels: [] }} 
                loading={loading} 
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-8 mt-6">
          <Card className="shadow-sm overflow-hidden border-border/40">
            <div className="h-1 bg-gradient-to-r from-[#f72585] to-[#4361ee]"></div>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Filter className="h-5 w-5 text-primary" />
                    Campaign Filter
                  </CardTitle>
                  <CardDescription>Select a specific campaign to view detailed analytics</CardDescription>
                </div>
                <FilterExportControls 
                  filterOptions={{ 
                    channels: false,
                    metrics: true
                  }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedCampaign || campaigns[0]?.id}
                onValueChange={handleCampaignChange}
              >
                <SelectTrigger className="w-full md:w-[320px] border-border/60">
                  <SelectValue placeholder={campaigns[0]?.name || "Select campaign"} />
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

          <div className="mt-6">
            <CampaignBreakdownTab 
              campaignData={campaignData} 
              loading={loading} 
              campaign={campaigns.find(c => c.id === (selectedCampaign || campaigns[0]?.id)) || { id: "", name: "" }}
            />
          </div>
        </TabsContent>

        <TabsContent value="promotional" className="space-y-8 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Promotion Analytics
                  </CardTitle>
                  <CardDescription>
                    Detailed analysis of promotion performance and impact
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="col-span-3 md:col-span-1">
                  <CardContent className="pt-6">
                    <IncrementalRevenueCounter />
                  </CardContent>
                </Card>
                <Card className="col-span-3 md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Average Promotion Lift Analysis</CardTitle>
                    <CardDescription>
                      Baseline vs Actual revenue comparison
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PromotionLiftChart />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Cost Analysis
                  </CardTitle>
                  <CardDescription>
                    Detailed breakdown of promotion costs and efficiency
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" /> Promotion Cost Timeseries
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Area chart with cohort overlays
                </p>
                <PromotionCostChart />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" /> Promotion Efficiency Ratio
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Revenue per $1 spent histogram
                  </p>
                  <EfficiencyRatioChart />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <PercentIcon className="h-5 w-5 text-primary" /> Promotion Type Breakdown
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Flash Sale vs BOGO vs %-Off comparison
                  </p>
                  <PromotionTypeChart />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

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
