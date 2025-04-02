
import React, { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDataProcessor } from "@/hooks/useDataProcessor";
import { formatValue, getMetricDisplayName, getMetricColor, availableMetrics } from "@/utils/metricUtils";
import { SummaryMetricsCards } from "@/components/data/SummaryMetricsCards";
import { DateRangeInfo } from "@/components/data/DateRangeInfo";
import { MetricsSelector } from "@/components/data/MetricsSelector";
import { DataVisualization } from "@/components/data/DataVisualization";
import { FilterExportControls } from "@/components/channels/FilterExportControls";

const DataPage = () => {
  const [timeframe, setTimeframe] = useState("30d");
  const [view, setView] = useState("chart");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["revenue"]);
  const [showAllMetrics, setShowAllMetrics] = useState(false);

  const { loading, aggregatedData, summaryMetrics, dateInfo } = useDataProcessor(timeframe);

  // Handle metric selection/deselection
  const toggleMetric = (metricKey: string) => {
    if (metricKey === "all") {
      setShowAllMetrics(true);
      return;
    }
    
    setShowAllMetrics(false);
    setSelectedMetrics(prev => {
      // If already selected, remove it
      if (prev.includes(metricKey)) {
        // Don't allow removing the last metric
        if (prev.length === 1) return prev;
        return prev.filter(m => m !== metricKey);
      }
      // Add the new metric
      return [...prev, metricKey];
    });
  };

  const handleMetricSelect = (value: string) => {
    if (value === "all") {
      setShowAllMetrics(true);
    } else {
      setShowAllMetrics(false);
      // If not already in the list, add it
      if (!selectedMetrics.includes(value)) {
        setSelectedMetrics(prev => [...prev, value]);
      }
    }
  };

  const removeMetric = (metricKey: string) => {
    // Don't allow removing the last metric
    if (selectedMetrics.length === 1) return;
    setSelectedMetrics(prev => prev.filter(m => m !== metricKey));
  };

  // Generate chart lines based on selected metrics
  const getChartLines = () => {
    return selectedMetrics.map(metricKey => ({
      dataKey: metricKey,
      color: getMetricColor(metricKey),
      label: getMetricDisplayName(metricKey)
    }));
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Data Overview"
        description="Explore and analyze your raw marketing data across all channels and timeframes. Use the tools below to customize your view and identify performance trends."
      >
        <div className="flex flex-wrap gap-2">
          <FilterExportControls 
            data={aggregatedData}
            exportFileName="data-overview"
            contentId="data-visualization-content"
          />
        </div>
      </PageHeader>

      {/* Date and Data Range Information */}
      <DateRangeInfo 
        dateInfo={dateInfo} 
        timeframe={timeframe} 
        loading={loading} 
      />

      {/* Summary Metrics Cards */}
      <div id="summary-metrics-content">
        <SummaryMetricsCards 
          summaryMetrics={summaryMetrics} 
          loading={loading} 
        />
      </div>

      <div className="dashboard-card">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Data Analytics</h2>
          <p className="text-muted-foreground">
            This section provides a detailed view of your marketing performance data. Use the chart or table view to analyze trends and patterns over time. 
            Select different metrics and timeframes to customize your analysis.
          </p>
          {!loading && aggregatedData.length > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              Currently displaying <span className="font-medium">{aggregatedData.length}</span> days of data from{" "}
              <span className="font-medium">{aggregatedData[0]?.date}</span> to{" "}
              <span className="font-medium">{aggregatedData[aggregatedData.length - 1]?.date}</span>.
            </p>
          )}
        </div>

        {/* Metrics and View Selector */}
        <MetricsSelector
          view={view}
          setView={setView}
          selectedMetrics={selectedMetrics}
          showAllMetrics={showAllMetrics}
          availableMetrics={availableMetrics}
          handleMetricSelect={handleMetricSelect}
          removeMetric={removeMetric}
          setShowAllMetrics={setShowAllMetrics}
          getMetricDisplayName={getMetricDisplayName}
          getMetricColor={getMetricColor}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
        />

        {/* Data Visualization (Chart or Table) */}
        <div id="data-visualization-content">
          <DataVisualization 
            loading={loading}
            view={view}
            selectedMetrics={selectedMetrics}
            aggregatedData={aggregatedData}
            showAllMetrics={showAllMetrics}
            availableMetrics={availableMetrics}
            getMetricDisplayName={getMetricDisplayName}
            formatValue={formatValue}
            getChartLines={getChartLines}
          />
        </div>
      </div>
    </div>
  );
};

export default DataPage;
