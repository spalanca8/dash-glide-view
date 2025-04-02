
import React, { useState } from "react";
import { ChannelBreakdownChart as ChannelChart } from "@/components/dashboard/ChannelBreakdownChart";
import { channelColors } from "@/data/mockData";
import { FilterExportControls } from "./FilterExportControls";

type ChannelBreakdownChartProps = {
  data: any[];
  loading: boolean;
  bars?: {
    dataKey: string;
    color: string;
    label: string;
  }[];
  xAxisKey?: string;
  height?: number;
};

export function ChannelBreakdownChart({ 
  data, 
  loading,
  bars,
  xAxisKey,
  height
}: ChannelBreakdownChartProps) {
  const [activeMetrics, setActiveMetrics] = useState<string[]>([]);
  const [filteredChannels, setFilteredChannels] = useState<string[]>([]);

  const defaultBars = [
    { dataKey: "revenue", color: "#4361ee", label: "Revenue" },
    { dataKey: "cost", color: "#f72585", label: "Cost" },
  ];

  // Handle filter changes
  const handleFilterChange = (filters: {channels?: string[], metrics?: string[]}) => {
    if (filters.channels) {
      setFilteredChannels(filters.channels);
    }
    
    if (filters.metrics) {
      setActiveMetrics(filters.metrics);
    }
  };

  // Filter data based on selected channels
  const filteredData = !loading
    ? filteredChannels.length > 0
      ? data.filter(item => filteredChannels.includes(item.id))
      : data
    : [];

  // Filter metrics based on active metrics
  const activeBars = bars || defaultBars;
  const filteredBars = activeMetrics.length > 0
    ? activeBars.filter(bar => activeMetrics.includes(bar.dataKey))
    : activeBars;

  // Format chart data
  const chartData = !loading
    ? filteredData.map(item => ({
        name: item.name,
        revenue: item.revenue,
        cost: item.cost,
        roas: item.roas,
        conversion: item.conversion,
        cpa: item.cpa,
      }))
    : [];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <FilterExportControls 
          filterOptions={{ channels: true, metrics: true }} 
          onFilterChange={handleFilterChange}
        />
      </div>
      <ChannelChart
        data={chartData}
        bars={filteredBars.length > 0 ? filteredBars : activeBars}
        loading={loading}
        height={height || 400}
        xAxisKey={xAxisKey || "name"}
      />
    </div>
  );
}
