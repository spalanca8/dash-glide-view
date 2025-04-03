
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROILeaderboard } from "@/components/campaign-analytics/ROILeaderboard";
import { DemographicChart } from "@/components/campaign-analytics/DemographicChart";

export const RevenueAndDemographicCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
  );
};
