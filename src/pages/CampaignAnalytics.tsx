
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Card } from "@/components/ui/card";
import { CampaignSidebar } from "@/components/campaign-analytics/CampaignSidebar";
import { CampaignOverview } from "@/components/campaign-analytics/CampaignOverview";
import { ChannelPerformance } from "@/components/campaign-analytics/ChannelPerformance";
import { PromotionAnalytics } from "@/components/campaign-analytics/PromotionAnalytics";
import { DateRangeSelector } from "@/components/campaign-analytics/DateRangeSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type CampaignTab = "overview" | "channel" | "promotion";
export type CampaignSubPage = 
  | "totals" | "journey" 
  | "revenue" | "cost" 
  | "impact" | "cost-analysis";

const CampaignAnalytics = () => {
  const [activeTab, setActiveTab] = useState<CampaignTab>("overview");
  const [activeSubPage, setActiveSubPage] = useState<CampaignSubPage>("totals");
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    new Date() // today
  ]);

  return (
    <div className="flex h-full">
      <Helmet>
        <title>Campaign Analytics Dashboard</title>
      </Helmet>

      {/* Left Sidebar Navigation */}
      <div className="w-64 border-r border-border bg-card min-h-[calc(100vh-65px)]">
        <CampaignSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          activeSubPage={activeSubPage}
          setActiveSubPage={setActiveSubPage}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-background overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Campaign Analytics</h1>
          <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
        </div>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as CampaignTab)}>
          <TabsContent value="overview">
            <CampaignOverview activeSubPage={activeSubPage} dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="channel">
            <ChannelPerformance activeSubPage={activeSubPage} dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="promotion">
            <PromotionAnalytics activeSubPage={activeSubPage} dateRange={dateRange} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CampaignAnalytics;
