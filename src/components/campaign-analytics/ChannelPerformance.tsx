
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROIMatrix } from "@/components/campaign-analytics/ROIMatrix";
import { AudienceSegmentChart } from "@/components/campaign-analytics/AudienceSegmentChart";
import { CreativeFormatAnalysis } from "@/components/campaign-analytics/CreativeFormatAnalysis";
import { CostEfficiencyChart } from "@/components/campaign-analytics/CostEfficiencyChart";
import { BudgetAllocationChart } from "@/components/campaign-analytics/BudgetAllocationChart";
import { CreativeFatigueChart } from "@/components/campaign-analytics/CreativeFatigueChart";
import { TrendingUp, DollarSign, Filter, Users, Image, PieChart } from "lucide-react";
import type { CampaignSubPage } from "@/pages/CampaignAnalytics";

interface ChannelPerformanceProps {
  activeSubPage: CampaignSubPage;
  dateRange: [Date, Date];
}

export const ChannelPerformance = ({ activeSubPage, dateRange }: ChannelPerformanceProps) => {
  const [selectedChannel, setSelectedChannel] = useState("all");
  
  return (
    <div className="space-y-6">
      <TabsContent value="revenue" className={activeSubPage === "revenue" ? "block" : "hidden"}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Incremental Revenue Drilldown
                </CardTitle>
                <CardDescription>
                  Performance analysis by channel, audience segment, and creative format
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Channel:</span>
                </div>
                <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Select Channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Channels</SelectItem>
                    <SelectItem value="social">Paid Social</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="search">Search</SelectItem>
                    <SelectItem value="display">Display</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" /> Campaign ROI Matrix
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Bubble chart showing the relationship between spend and revenue for each campaign
              </p>
              <ROIMatrix channel={selectedChannel} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" /> Audience Segment Performance
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Stacked bar chart by LTV bracket
                </p>
                <AudienceSegmentChart channel={selectedChannel} />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <Image className="h-5 w-5 text-primary" /> Creative Format Analysis
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Video vs Carousel vs Static comparison
                </p>
                <CreativeFormatAnalysis channel={selectedChannel} />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="cost" className={activeSubPage === "cost" ? "block" : "hidden"}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Cost Efficiency
                </CardTitle>
                <CardDescription>
                  Analysis of cost metrics, budget allocation, and creative performance
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Channel:</span>
                </div>
                <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Select Channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Channels</SelectItem>
                    <SelectItem value="social">Paid Social</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="search">Search</SelectItem>
                    <SelectItem value="display">Display</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">CPC/CPM/CPV Timeseries</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Interactive line chart with anomaly detection
              </p>
              <CostEfficiencyChart channel={selectedChannel} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-lg font-medium mb-2">Budget Allocation vs Actual Spend</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Donut + waterfall chart showing budget allocation and actual spend
                </p>
                <BudgetAllocationChart channel={selectedChannel} />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Creative Fatigue Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  CTR decay over impressions
                </p>
                <CreativeFatigueChart channel={selectedChannel} />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};
