
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";

type PerformanceSectionProps = {
  performanceData: any[];
  loading: boolean;
  channelColors: Record<string, string>;
};

export function PerformanceSection({
  performanceData,
  loading,
  channelColors,
}: PerformanceSectionProps) {
  return (
    <div className="dashboard-card mb-8 animate-fade-in" style={{ animationDelay: "150ms" }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">Revenue Performance</h3>
          <p className="text-sm text-muted-foreground">Revenue by channel over time</p>
        </div>
        <Button variant="ghost" size="sm" className="gap-1" asChild>
          <a href="/data">
            View detailed data <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
      
      <PerformanceChart
        data={performanceData}
        lines={[
          { dataKey: "search", color: channelColors.search, label: "Search", yAxisId: "left" },
          { dataKey: "social", color: channelColors.social, label: "Social", yAxisId: "left" },
          { dataKey: "email", color: channelColors.email, label: "Email", yAxisId: "left" },
          { dataKey: "display", color: channelColors.display, label: "Display", yAxisId: "left" },
        ]}
        loading={loading}
        height={350}
      />
    </div>
  );
}
