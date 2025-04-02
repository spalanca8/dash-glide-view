
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Legend } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";

type MetricScatterPlotProps = {
  data: any[];
  loading: boolean;
};

export const MetricScatterPlot = ({ data, loading }: MetricScatterPlotProps) => {
  const [xMetric, setXMetric] = useState("cost");
  const [yMetric, setYMetric] = useState("revenue");
  const [zMetric, setZMetric] = useState("roas");

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Scatter Plot Analysis</CardTitle>
          <CardDescription>Loading data...</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    );
  }

  // Format data for the scatter plot
  const scatterData = data.map((channel) => ({
    name: channel.name,
    x: channel[xMetric],
    y: channel[yMetric],
    z: channel[zMetric],
    color: channel.color,
  }));

  // Format metric labels for display
  const metricLabels = {
    revenue: "Revenue ($)",
    cost: "Cost ($)",
    roas: "ROAS",
    conversion: "Conversion Rate (%)",
    ctr: "CTR (%)",
    cpa: "CPA ($)",
    impressions: "Impressions",
    clicks: "Clicks",
  };

  // Generate a dynamic title based on selected metrics
  const dynamicTitle = `${metricLabels[xMetric as keyof typeof metricLabels]} vs ${metricLabels[yMetric as keyof typeof metricLabels]}`;
  const dynamicDescription = `Analysis with ${metricLabels[zMetric as keyof typeof metricLabels]} as bubble size`;

  // Format values for display
  const formatValue = (value: number, metric: string): string => {
    switch (metric) {
      case "revenue":
      case "cost":
      case "cpa":
        return `$${value.toLocaleString()}`;
      case "conversion":
      case "ctr":
        return `${value.toFixed(2)}%`;
      case "roas":
        return `${value.toFixed(2)}x`;
      default:
        return value.toLocaleString();
    }
  };

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-md">
          <p className="font-medium text-sm mb-1">{data.name}</p>
          <p className="text-xs text-foreground">
            {metricLabels[xMetric as keyof typeof metricLabels]}: {formatValue(data.x, xMetric)}
          </p>
          <p className="text-xs text-foreground">
            {metricLabels[yMetric as keyof typeof metricLabels]}: {formatValue(data.y, yMetric)}
          </p>
          <p className="text-xs text-foreground">
            {metricLabels[zMetric as keyof typeof metricLabels]}: {formatValue(data.z, zMetric)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Determine axis domains with padding
  const xMin = Math.min(...scatterData.map((d) => d.x)) * 0.8;
  const xMax = Math.max(...scatterData.map((d) => d.x)) * 1.2;
  const yMin = Math.min(...scatterData.map((d) => d.y)) * 0.8;
  const yMax = Math.max(...scatterData.map((d) => d.y)) * 1.2;

  // Function to format axis values based on metric type
  const formatAxisValue = (value: number, metric: string): string => {
    switch (metric) {
      case "revenue":
      case "cost":
      case "cpa":
        if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
        return `$${value}`;
      case "conversion":
      case "ctr":
        return `${value.toFixed(1)}%`;
      case "roas":
        return `${value.toFixed(1)}x`;
      default:
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
        return value.toString();
    }
  };

  const handleReset = () => {
    setXMetric("cost");
    setYMetric("revenue");
    setZMetric("roas");
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
          <div>
            <CardTitle className="text-md">{dynamicTitle}</CardTitle>
            <CardDescription>
              {dynamicDescription}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="grid grid-cols-3 gap-2 w-full lg:w-auto">
              <div>
                <Select defaultValue={xMetric} value={xMetric} onValueChange={setXMetric}>
                  <SelectTrigger className="w-[100px] h-8">
                    <SelectValue placeholder="X Axis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cost">Cost</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="conversion">Conversion</SelectItem>
                    <SelectItem value="roas">ROAS</SelectItem>
                    <SelectItem value="ctr">CTR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select defaultValue={yMetric} value={yMetric} onValueChange={setYMetric}>
                  <SelectTrigger className="w-[100px] h-8">
                    <SelectValue placeholder="Y Axis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="cost">Cost</SelectItem>
                    <SelectItem value="conversion">Conversion</SelectItem>
                    <SelectItem value="roas">ROAS</SelectItem>
                    <SelectItem value="ctr">CTR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select defaultValue={zMetric} value={zMetric} onValueChange={setZMetric}>
                  <SelectTrigger className="w-[100px] h-8">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="roas">ROAS</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="cost">Cost</SelectItem>
                    <SelectItem value="conversion">Conversion</SelectItem>
                    <SelectItem value="impressions">Impressions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8" onClick={handleReset}>
                <RefreshCw className="h-3 w-3 mr-1" />
                Reset
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 40,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis
                type="number"
                dataKey="x"
                name={metricLabels[xMetric as keyof typeof metricLabels]}
                domain={[xMin, xMax]}
                tickFormatter={(value) => formatAxisValue(value, xMetric)}
              />
              <YAxis
                type="number"
                dataKey="y"
                name={metricLabels[yMetric as keyof typeof metricLabels]}
                domain={[yMin, yMax]}
                tickFormatter={(value) => formatAxisValue(value, yMetric)}
              />
              <ZAxis
                type="number"
                dataKey="z"
                range={[50, 500]}
                name={metricLabels[zMetric as keyof typeof metricLabels]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Scatter
                name={`${metricLabels[xMetric as keyof typeof metricLabels]} vs ${
                  metricLabels[yMetric as keyof typeof metricLabels]
                }`}
                data={scatterData}
                fill="#8884d8"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          <p>
            <strong>Note:</strong> Bubble size represents {metricLabels[zMetric as keyof typeof metricLabels]}. 
            Hover over data points to see detailed metrics for each channel.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
