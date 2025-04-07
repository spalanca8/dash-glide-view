
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { PromotionAnalytics } from "@/components/campaign-analytics/PromotionAnalytics";
import { DateRangeSelector } from "@/components/campaign-analytics/DateRangeSelector";
import { Button } from "@/components/ui/button";
import { Activity, PieChart } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";

export type CampaignTab = "promotion";
// Update the CampaignSubPage type to include all possible subpages
export type CampaignSubPage = "impact" | "cost-analysis" | "totals" | "journey" | "revenue" | "cost";

const CampaignAnalytics = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const viewParam = searchParams.get("view");
  
  const [activeTab, setActiveTab] = useState<CampaignTab>("promotion");
  const [activeSubPage, setActiveSubPage] = useState<CampaignSubPage>(
    (viewParam === "impact" || viewParam === "cost-analysis") 
      ? (viewParam as CampaignSubPage) 
      : "impact"
  );
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    new Date() // today
  ]);

  // Update URL when subpage changes
  useEffect(() => {
    setSearchParams({ view: activeSubPage });
  }, [activeSubPage, setSearchParams]);

  // Update state when URL changes
  useEffect(() => {
    if (viewParam === "impact" || viewParam === "cost-analysis") {
      setActiveSubPage(viewParam as CampaignSubPage);
    }
  }, [viewParam]);

  const handleSubPageChange = (subPage: CampaignSubPage) => {
    setActiveSubPage(subPage);
  };

  return (
    <div className="h-full bg-background">
      <Helmet>
        <title>Promotional Analytics Dashboard</title>
      </Helmet>

      {/* Main Content Area */}
      <div className="p-6 overflow-y-auto">
        {/* Header Section */}
        <div className="mb-6">
          <PageHeader
            title="Promotional Analytics"
            description="Analyze the performance of your promotional campaigns"
            className="mb-4"
          />
          <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
        </div>
        
        {/* Navigation Buttons Below Title */}
        <div className="flex gap-2 mb-6">
          <Button 
            variant={activeSubPage === "impact" ? "default" : "outline"}
            onClick={() => handleSubPageChange("impact")}
            className="flex items-center gap-2"
          >
            <Activity size={18} />
            Promotion Impact
          </Button>
          <Button 
            variant={activeSubPage === "cost-analysis" ? "default" : "outline"}
            onClick={() => handleSubPageChange("cost-analysis")}
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
