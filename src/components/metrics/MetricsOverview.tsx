
import React from "react";
import { Sparkles } from "lucide-react";
import { ChannelMetricsCards } from "@/components/channels/ChannelMetricsCards";

interface MetricsOverviewProps {
  channelData: any[];
  loading: boolean;
  timeframe: string;
}

export const MetricsOverview = ({ channelData, loading, timeframe }: MetricsOverviewProps) => {
  return (
    <div id="metrics-overview" className="mb-8 w-full bg-gradient-to-br from-primary/5 to-transparent p-6 rounded-lg border border-primary/10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          Key Metrics Overview
        </h2>
        <div className="text-sm text-muted-foreground bg-background/70 px-3 py-1 rounded-full border shadow-sm">
          {timeframe === "7d" ? "Last 7 days" : timeframe === "30d" ? "Last 30 days" : "Last 90 days"}
        </div>
      </div>
      <ChannelMetricsCards data={channelData} loading={loading} />
    </div>
  );
};
