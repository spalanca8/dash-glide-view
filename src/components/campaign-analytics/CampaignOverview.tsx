
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CostEfficiencyTrends } from "@/components/campaign-analytics/CostEfficiencyTrends";
import { CampaignInsightsCard } from "@/components/campaign-analytics/CampaignInsightsCard";
import { RevenueAndDemographicCharts } from "@/components/campaign-analytics/RevenueAndDemographicCharts";
import { CustomerJourneyMapping } from "@/components/campaign-analytics/CustomerJourneyMapping";
import { JourneyInsightsCard } from "@/components/campaign-analytics/JourneyInsightsCard";
import { CampaignOverviewInsights } from "@/components/campaign-analytics/CampaignOverviewInsights";
import type { CampaignSubPage } from "@/pages/CampaignAnalytics";

interface CampaignOverviewProps {
  activeSubPage: CampaignSubPage;
  dateRange: [Date, Date];
}

export const CampaignOverview = ({ activeSubPage, dateRange }: CampaignOverviewProps) => {
  // Create a wrapper Tabs component that will provide context for TabsContent
  return (
    <div className="space-y-6">
      <Tabs value={activeSubPage} className="w-full">
        <TabsContent value="totals" className={activeSubPage === "totals" ? "block" : "hidden"}>
          <CostEfficiencyTrends />
          <CampaignInsightsCard />
          <RevenueAndDemographicCharts />
        </TabsContent>

        <TabsContent value="journey" className={activeSubPage === "journey" ? "block" : "hidden"}>
          <CustomerJourneyMapping />
          <JourneyInsightsCard />
        </TabsContent>
      </Tabs>
      
      <CampaignOverviewInsights />
    </div>
  );
};
