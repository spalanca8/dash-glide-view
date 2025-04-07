
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { CampaignSidebar } from "@/components/campaign-analytics/CampaignSidebar";
import { PromotionAnalytics } from "@/components/campaign-analytics/PromotionAnalytics";
import { DateRangeSelector } from "@/components/campaign-analytics/DateRangeSelector";
import { Button } from "@/components/ui/button";
import { Activity, PieChart } from "lucide-react";

export type CampaignTab = "promotion";
// Update the CampaignSubPage type to include all possible subpages
export type CampaignSubPage = "impact" | "cost-analysis" | "totals" | "journey" | "revenue" | "cost";

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
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-3">Promotional Analytics</h1>
          <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
        </div>
        
        {/* Navigation Buttons Below Title */}
        <div className="flex gap-2 mb-6">
          <Button 
            variant={activeSubPage === "impact" ? "default" : "outline"}
            onClick={() => setActiveSubPage("impact")}
            className="flex items-center gap-2"
          >
            <Activity size={18} />
            Promotion Impact
          </Button>
          <Button 
            variant={activeSubPage === "cost-analysis" ? "default" : "outline"}
            onClick={() => setActiveSubPage("cost-analysis")}
            className="flex items-center gap-2"
          >
            <PieChart size={18} />
            Cost Analysis
          </Button>
        </div>
        
        <PromotionAnalytics activeSubPage={activeSubPage} dateRange={dateRange} />
      </div>
    </div>
  );
};

export default CampaignAnalytics;
