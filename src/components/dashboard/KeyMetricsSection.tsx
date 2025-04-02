
import React, { useState } from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Layers, DollarSign, Compass, CreditCard, Archive, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { channelColors, channelNames } from "@/data/mockData";

interface KeyMetricsSectionProps {
  loading: boolean;
  latestPeriodData: {
    total: number;
    paid: number;
    organic: number;
    nonPaid: number;
    baseline: number;
  };
}

// Channel breakdown data
const channelBreakdown = {
  paid: [
    { name: channelNames.google, value: 382500, color: channelColors.google },
    { name: channelNames.facebook, value: 245000, color: channelColors.facebook },
    { name: channelNames.youtube, value: 175000, color: channelColors.youtube },
    { name: channelNames.tiktok, value: 97500, color: channelColors.tiktok }
  ],
  organic: [
    { name: channelNames.organicSearch, value: 325000, color: channelColors.organicSearch },
    { name: channelNames.organicSocial, value: 180000, color: channelColors.organicSocial },
    { name: channelNames.email, value: 95000, color: channelColors.email }
  ],
  nonPaid: [
    { name: channelNames.direct, value: 215000, color: channelColors.direct },
    { name: channelNames.referral, value: 145000, color: channelColors.referral },
    { name: channelNames.affiliate, value: 240000, color: channelColors.affiliate }
  ],
  baseline: [
    { name: "Brand Equity", value: 380000, color: "#F59E0B" },
    { name: "Existing Customers", value: 270000, color: "#FBBF24" },
    { name: "Market Momentum", value: 150000, color: "#FCD34D" }
  ]
};

export function KeyMetricsSection({ loading, latestPeriodData }: KeyMetricsSectionProps) {
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

  // Calculate sums from channel data
  const paidTotal = channelBreakdown.paid.reduce((sum, channel) => sum + channel.value, 0);
  const organicTotal = channelBreakdown.organic.reduce((sum, channel) => sum + channel.value, 0);
  const nonPaidTotal = channelBreakdown.nonPaid.reduce((sum, channel) => sum + channel.value, 0);
  const baselineTotal = channelBreakdown.baseline.reduce((sum, channel) => sum + channel.value, 0);
  
  // Update total based on the sum of all channels plus baseline
  const calculatedTotal = paidTotal + organicTotal + nonPaidTotal + baselineTotal;

  // Calculate percentages
  const calculatePercentage = (value: number, total: number): string => {
    if (total <= 0) return "0";
    const percentage = (value / total) * 100;
    return percentage < 100 ? percentage.toFixed(1) : "100";
  };
  
  const paidPct = calculatePercentage(paidTotal, calculatedTotal);
  const organicPct = calculatePercentage(organicTotal, calculatedTotal);
  const nonPaidPct = calculatePercentage(nonPaidTotal, calculatedTotal);
  const baselinePct = calculatePercentage(baselineTotal, calculatedTotal);

  const toggleExpand = (metricName: string) => {
    setExpandedMetric(expandedMetric === metricName ? null : metricName);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <MetricCard
          title="Total Revenue"
          value={loading ? "-" : `$${calculatedTotal.toLocaleString()}`}
          icon={<Layers className="h-4 w-4" />}
          loading={loading}
          className="bg-gradient-to-br from-primary/10 to-primary/5 border-l-4 border-l-primary lg:col-span-1"
        />
        <MetricCard
          title="Baseline"
          value={loading ? "-" : `$${baselineTotal.toLocaleString()}`}
          description={`${baselinePct}% of total`}
          icon={<Archive className="h-4 w-4" />}
          loading={loading}
          className="bg-gradient-to-br from-amber-50 to-amber-50/50 border-l-4 border-l-amber-400 lg:col-span-1 cursor-pointer hover:shadow-md transition-shadow"
          onMetricClick={() => toggleExpand("baseline")}
          action={
            <Button variant="ghost" size="icon" className="h-6 w-6">
              {expandedMetric === "baseline" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          }
        />
        <MetricCard
          title="Paid Media"
          value={loading ? "-" : `$${paidTotal.toLocaleString()}`}
          description={`${paidPct}% of total`}
          icon={<DollarSign className="h-4 w-4" />}
          loading={loading}
          className="bg-gradient-to-br from-blue-50 to-blue-50/50 border-l-4 border-l-blue-400 lg:col-span-1 cursor-pointer hover:shadow-md transition-shadow"
          onMetricClick={() => toggleExpand("paid")}
          action={
            <Button variant="ghost" size="icon" className="h-6 w-6">
              {expandedMetric === "paid" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          }
        />
        <MetricCard
          title="Organic Media"
          value={loading ? "-" : `$${organicTotal.toLocaleString()}`}
          description={`${organicPct}% of total`}
          icon={<Compass className="h-4 w-4" />}
          loading={loading}
          className="bg-gradient-to-br from-green-50 to-green-50/50 border-l-4 border-l-green-400 lg:col-span-1 cursor-pointer hover:shadow-md transition-shadow"
          onMetricClick={() => toggleExpand("organic")}
          action={
            <Button variant="ghost" size="icon" className="h-6 w-6">
              {expandedMetric === "organic" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          }
        />
        <MetricCard
          title="Non-Paid Media"
          value={loading ? "-" : `$${nonPaidTotal.toLocaleString()}`}
          description={`${nonPaidPct}% of total`}
          icon={<CreditCard className="h-4 w-4" />}
          loading={loading}
          className="bg-gradient-to-br from-purple-50 to-purple-50/50 border-l-4 border-l-purple-400 lg:col-span-1 cursor-pointer hover:shadow-md transition-shadow"
          onMetricClick={() => toggleExpand("nonPaid")}
          action={
            <Button variant="ghost" size="icon" className="h-6 w-6">
              {expandedMetric === "nonPaid" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          }
        />
      </div>

      {/* Channel breakdown expansion */}
      {expandedMetric && (
        <Card className="mb-4 animate-fade-in overflow-hidden">
          <CardContent className="p-4">
            <div className="mb-2">
              <h3 className="text-sm font-semibold mb-2 flex items-center">
                {expandedMetric === "paid" && "Paid Media"}
                {expandedMetric === "organic" && "Organic Media"}
                {expandedMetric === "nonPaid" && "Non-Paid Media"}
                {expandedMetric === "baseline" && "Baseline Revenue"}
                <span className="text-xs ml-2 text-muted-foreground"> - Channel Breakdown</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {channelBreakdown[expandedMetric as keyof typeof channelBreakdown]?.map((channel, i) => {
                const mediaTypeTotal = expandedMetric === "paid" 
                  ? paidTotal 
                  : expandedMetric === "organic" 
                    ? organicTotal 
                    : expandedMetric === "nonPaid" 
                      ? nonPaidTotal
                      : baselineTotal;
                
                const percentage = ((channel.value / mediaTypeTotal) * 100).toFixed(1);
                
                return (
                  <div 
                    key={i}
                    className="rounded-md border bg-card p-3 flex flex-col gap-2"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }}></div>
                        <span className="text-sm font-medium">{channel.name}</span>
                      </div>
                      <span className="text-sm font-semibold">${channel.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full" 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: channel.color 
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-right text-muted-foreground">
                      {percentage}% of {expandedMetric === "baseline" ? "baseline" : expandedMetric}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
