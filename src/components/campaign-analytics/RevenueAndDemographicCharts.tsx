
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROILeaderboard } from "@/components/campaign-analytics/ROILeaderboard";
import { DemographicChart } from "@/components/campaign-analytics/DemographicChart";
import { CostRevenueComparisonChart } from "@/components/channels/CostRevenueComparisonChart";
import { RoasComparisonChart } from "@/components/channels/RoasComparisonChart";

// Sample campaign data for the charts
const campaignData = [
  { id: 'summer', name: 'Summer Flash Sale', cost: 29760, revenue: 125000, incremental: 37500, roas: 4.2 },
  { id: 'school', name: 'Back to School', cost: 25920, revenue: 98500, incremental: 29550, roas: 3.8 },
  { id: 'acquisition', name: 'New Customer Acquisition', cost: 24000, revenue: 84000, incremental: 25200, roas: 3.5 },
  { id: 'loyalty', name: 'Loyalty Program', cost: 20000, revenue: 64000, incremental: 19200, roas: 3.2 },
  { id: 'launch', name: 'Product Launch', cost: 20000, revenue: 56000, incremental: 16800, roas: 2.8 },
];

export const RevenueAndDemographicCharts = () => {
  return (
    <div className="grid grid-cols-1 gap-6 mt-6">
      {/* Cost and Incremental Revenue Chart - Now full width and above ROAS */}
      <Card>
        <CardHeader>
          <CardTitle>Cost and Incremental Revenue by Campaign</CardTitle>
          <CardDescription>Comparing campaign costs against their incremental revenue contribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <CostRevenueComparisonChart 
              channelData={campaignData} 
              loading={false} 
              height={400}
              title=""
              description=""
            />
          </div>
        </CardContent>
      </Card>

      {/* ROAS Chart - Now below and full width */}
      <Card>
        <CardHeader>
          <CardTitle>Return on Ad Spend (ROAS) by Campaign</CardTitle>
          <CardDescription>Campaign effectiveness measured by return on investment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <RoasComparisonChart 
              channelData={campaignData} 
              loading={false} 
              height={400}
              title=""
              description=""
            />
          </div>
        </CardContent>
      </Card>

      {/* Original grid with leaderboard and demographic chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Incremental Revenue Leaderboard</CardTitle>
            <CardDescription>Top 5 campaigns by ROI</CardDescription>
          </CardHeader>
          <CardContent>
            <ROILeaderboard />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audience Breakdown</CardTitle>
            <CardDescription>Demographic pyramid chart</CardDescription>
          </CardHeader>
          <CardContent>
            <DemographicChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
