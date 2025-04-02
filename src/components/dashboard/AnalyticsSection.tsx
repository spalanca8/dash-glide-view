
import React from "react";
import { ChannelBreakdownChart } from "@/components/dashboard/ChannelBreakdownChart";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart } from "lucide-react";
import { Link } from "react-router-dom";

type AnalyticsSectionProps = {
  channelData: any[];
  loading: boolean;
  channelColors: Record<string, string>;
};

export function AnalyticsSection({
  channelData,
  loading,
  channelColors,
}: AnalyticsSectionProps) {
  return (
    <div className="dashboard-card animate-fade-in" style={{ animationDelay: "300ms" }}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">Channel Performance Analysis</h3>
          <p className="text-sm text-muted-foreground">Return on ad spend and performance by channel</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/channels">
              <BarChart className="h-4 w-4 mr-1" /> Channel analysis
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/budget">
              <LineChart className="h-4 w-4 mr-1" /> Budget optimizer
            </Link>
          </Button>
        </div>
      </div>
      
      <ChannelBreakdownChart
        data={channelData}
        bars={[
          { dataKey: "roas", color: channelColors.search, label: "ROAS" },
        ]}
        xAxisKey="name"
        loading={loading}
        height={300}
      />
    </div>
  );
}
