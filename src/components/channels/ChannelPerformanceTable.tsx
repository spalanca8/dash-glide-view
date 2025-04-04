
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterExportControls } from "./FilterExportControls";

type ChannelPerformanceTableProps = {
  data: any[];
  loading: boolean;
  onRowClick?: (channelId: string) => void;
};

export function ChannelPerformanceTable({ data, loading, onRowClick }: ChannelPerformanceTableProps) {
  const [filteredChannels, setFilteredChannels] = useState<string[]>([]);
  const [activeMetrics, setActiveMetrics] = useState<string[]>([]);

  // Default metrics to display
  const defaultMetrics = ["revenue", "cost", "roas", "conversion", "cpa"];
  
  // Determine which metrics to display
  const displayMetrics = activeMetrics.length > 0 ? activeMetrics : defaultMetrics;

  // Handle filter changes
  const handleFilterChange = (filters: {channels?: string[], metrics?: string[]}) => {
    if (filters.channels) {
      setFilteredChannels(filters.channels);
    }
    
    if (filters.metrics) {
      setActiveMetrics(filters.metrics);
    }
  };

  // Apply channel filters to data
  const filteredData = filteredChannels.length > 0
    ? data.filter(item => filteredChannels.includes(item.id))
    : data;

  // Format metric labels
  const getMetricLabel = (metric: string) => {
    const labels: Record<string, string> = {
      revenue: "Revenue",
      cost: "Cost",
      roas: "ROAS",
      conversion: "Conversion %",
      cpa: "CPA",
      ctr: "CTR",
      impressions: "Impressions",
      clicks: "Clicks"
    };
    return labels[metric] || metric;
  };

  // Format metric values
  const formatMetricValue = (value: any, metric: string) => {
    // Handle undefined or null values
    if (value === undefined || value === null) {
      return "N/A";
    }

    if (metric === "revenue" || metric === "cost" || metric === "cpa") {
      return `$${value.toLocaleString()}`;
    } else if (metric === "roas") {
      return `${value}x`;
    } else if (metric === "conversion" || metric === "ctr") {
      return `${value}%`;
    }
    return value;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <FilterExportControls 
            filterOptions={{ channels: true, metrics: true }} 
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel</TableHead>
                {displayMetrics.map(metric => (
                  <TableHead key={metric} className="text-right">{getMetricLabel(metric)}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(5).fill(0).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                  {displayMetrics.map((metric, j) => (
                    <TableCell key={j} className="text-right">
                      <Skeleton className="h-4 w-[70px] ml-auto" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <FilterExportControls 
          filterOptions={{ channels: true, metrics: true }} 
          onFilterChange={handleFilterChange}
          data={filteredData}
          exportFileName="channel-performance"
          contentId="channel-table"
        />
      </div>
      <div id="channel-table" className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Channel</TableHead>
              {displayMetrics.map(metric => (
                <TableHead key={metric} className="text-right">{getMetricLabel(metric)}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((channel) => (
              <TableRow 
                key={channel.id} 
                className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
                onClick={onRowClick ? () => onRowClick(channel.id) : undefined}
              >
                <TableCell className="font-medium">{channel.name}</TableCell>
                {displayMetrics.map(metric => (
                  <TableCell key={metric} className="text-right">
                    {formatMetricValue(channel[metric], metric)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
