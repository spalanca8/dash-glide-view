
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { CampaignSidebar } from "@/components/campaign-analytics/CampaignSidebar";
import { PromotionAnalytics } from "@/components/campaign-analytics/PromotionAnalytics";
import { DateRangeSelector } from "@/components/campaign-analytics/DateRangeSelector";

export type CampaignTab = "promotion";
export type CampaignSubPage = "impact" | "cost-analysis";

const CampaignAnalytics = () => {
  const [activeTab, setActiveTab] = useState<CampaignTab>("promotion");
  const [activeSubPage, setActiveSubPage] = useState<CampaignSubPage>("impact");
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    new Date() // today
  ]);

  return (
    <div className="flex h-full">
      <Helmet>
        <title>Promotional Analytics Dashboard</title>
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
          <h1 className="text-2xl font-bold">Promotional Analytics</h1>
          <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
        </div>
        
        <PromotionAnalytics activeSubPage={activeSubPage} dateRange={dateRange} />
      </div>
    </div>
  );
};

export default CampaignAnalytics;
