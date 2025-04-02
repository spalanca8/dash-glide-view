
import React from "react";
import { Loader2 } from "lucide-react";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataVisualizationProps = {
  loading: boolean;
  view: string;
  selectedMetrics: string[];
  aggregatedData: any[];
  showAllMetrics: boolean;
  availableMetrics: Array<{ key: string; name: string }>;
  getMetricDisplayName: (metricKey: string) => string;
  formatValue: (value: any, metricType: string) => string;
  getChartLines: () => Array<{ dataKey: string; color: string; label: string }>;
};

export function DataVisualization({
  loading,
  view,
  selectedMetrics,
  aggregatedData,
  showAllMetrics,
  availableMetrics,
  getMetricDisplayName,
  formatValue,
  getChartLines,
}: DataVisualizationProps) {
  if (loading) {
    return (
      <div className="py-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (view === "chart") {
    return (
      <>
        <div className="mb-4">
          <h3 className="text-lg font-medium">
            {selectedMetrics.length > 1 
              ? "Metrics Comparison Over Time" 
              : `${getMetricDisplayName(selectedMetrics[0])} Over Time`}
          </h3>
          <p className="text-sm text-muted-foreground">Aggregated data across all channels</p>
        </div>
        <PerformanceChart
          data={aggregatedData}
          lines={getChartLines()}
          height={450}
        />
      </>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            {showAllMetrics ? (
              availableMetrics.map((m) => (
                <TableHead key={m.key}>{m.name}</TableHead>
              ))
            ) : (
              selectedMetrics.map(metricKey => (
                <TableHead key={metricKey}>
                  {getMetricDisplayName(metricKey)}
                </TableHead>
              ))
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {aggregatedData.map((entry, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{entry.date}</TableCell>
              {showAllMetrics ? (
                availableMetrics.map((m) => (
                  <TableCell key={m.key}>
                    {formatValue(entry[m.key], m.key)}
                  </TableCell>
                ))
              ) : (
                selectedMetrics.map(metricKey => (
                  <TableCell key={metricKey}>
                    {formatValue(entry[metricKey], metricKey)}
                  </TableCell>
                ))
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
