
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Filter } from "lucide-react";
import { FilterExportControls } from "@/components/channels/FilterExportControls";
import { generateChannelData, generatePerformanceData } from "@/data/mockData";
import { MetricsOverview } from "@/components/metrics/MetricsOverview";
import { DataExploration } from "@/components/metrics/DataExploration";
import { MetricComparison } from "@/components/metrics/MetricComparison";
import { KeyInsights } from "@/components/metrics/KeyInsights";

const MetricsPage = () => {
  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState<any[]>([]);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [compareMetrics, setCompareMetrics] = useState("revenue-cost");
  const [timeframe, setTimeframe] = useState("30d");
  const [edaTab, setEdaTab] = useState("distribution");

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 700));

      const channels = generateChannelData(timeframe === "7d" ? "Q1" : timeframe === "30d" ? "Q2" : "Q3");
      const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90;
      const performance = generatePerformanceData(days);
      
      setChannelData(channels);
      setPerformanceData(performance);
      setLoading(false);
    };

    loadData();
  }, [timeframe]);

  // Parse the comparison metrics
  const [metric1, metric2] = compareMetrics.split("-");

  // Format metric display names
  const formatMetricName = (metric: string) => {
    return {
      revenue: "Revenue",
      cost: "Cost",
      roas: "ROAS",
      conversion: "Conversion Rate",
    }[metric] || metric;
  };

  return (
    <div className="animate-fade-in space-y-8">
      <PageHeader
        title="Exploratory Data Analysis"
        description="Discover hidden patterns, correlations, and insights across your marketing channels and metrics"
      >
        <div className="flex flex-wrap gap-2">
          <FilterExportControls 
            filterOptions={{ metrics: true, channels: false }}
            data={channelData}
            exportFileName="metrics-analysis"
            contentId="metrics-content"
          />
        </div>
      </PageHeader>

      {/* Key Metrics Overview */}
      <MetricsOverview 
        channelData={channelData} 
        loading={loading} 
        timeframe={timeframe} 
      />

      {/* Exploratory Data Analysis Section */}
      <DataExploration 
        channelData={channelData} 
        loading={loading} 
        timeframe={timeframe} 
        edaTab={edaTab} 
        setEdaTab={setEdaTab} 
      />

      {/* Metric Comparison */}
      <MetricComparison 
        channelData={channelData}
        performanceData={performanceData}
        loading={loading}
        compareMetrics={compareMetrics}
        setCompareMetrics={setCompareMetrics}
        timeframe={timeframe}
        setTimeframe={setTimeframe}
      />

      {/* Key Insights */}
      <KeyInsights 
        metric1={metric1} 
        metric2={metric2}
        formatMetricName={formatMetricName}
      />
    </div>
  );
};

export default MetricsPage;
