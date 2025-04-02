
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

type MetricDistributionChartProps = {
  data: any[];
  loading: boolean;
};

export function MetricDistributionChart({ data, loading }: MetricDistributionChartProps) {
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  
  if (loading) {
    return <Skeleton className="w-full h-[300px]" />;
  }
  
  // Get all values for the selected metric
  const metricValues = data.map(item => item[selectedMetric]);
  
  // Calculate range and create bin buckets for histogram
  const min = Math.min(...metricValues);
  const max = Math.max(...metricValues);
  const range = max - min;
  const binCount = 6;  // Number of bins
  const binSize = range / binCount;
  
  // Initialize bins
  const bins = Array(binCount).fill(0).map((_, i) => ({
    binStart: min + i * binSize,
    binEnd: min + (i + 1) * binSize,
    count: 0,
    binLabel: '',
  }));
  
  // Count values in each bin
  metricValues.forEach(value => {
    const binIndex = Math.min(binCount - 1, Math.floor((value - min) / binSize));
    bins[binIndex].count++;
  });
  
  // Format bin labels based on metric type
  bins.forEach(bin => {
    if (selectedMetric === 'revenue' || selectedMetric === 'cost') {
      bin.binLabel = `$${Math.round(bin.binStart).toLocaleString()} - $${Math.round(bin.binEnd).toLocaleString()}`;
    } else if (selectedMetric === 'roas') {
      bin.binLabel = `${bin.binStart.toFixed(1)}x - ${bin.binEnd.toFixed(1)}x`;
    } else if (selectedMetric === 'conversion') {
      bin.binLabel = `${bin.binStart.toFixed(1)}% - ${bin.binEnd.toFixed(1)}%`;
    } else if (selectedMetric === 'cpa') {
      bin.binLabel = `$${Math.round(bin.binStart)} - $${Math.round(bin.binEnd)}`;
    }
  });
  
  // Create chart data
  const chartData = bins.map((bin, i) => ({
    name: bin.binLabel,
    value: bin.count,
  }));
  
  // Calculate basic statistics
  const sum = metricValues.reduce((a, b) => a + b, 0);
  const mean = sum / metricValues.length;
  const sortedValues = [...metricValues].sort((a, b) => a - b);
  const median = sortedValues.length % 2 === 0 
    ? (sortedValues[sortedValues.length/2 - 1] + sortedValues[sortedValues.length/2]) / 2
    : sortedValues[Math.floor(sortedValues.length/2)];
    
  // Calculate standard deviation
  const variance = metricValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / metricValues.length;
  const stdDev = Math.sqrt(variance);
  
  // Function to format values based on metric type
  const formatValue = (value: number) => {
    if (selectedMetric === 'revenue' || selectedMetric === 'cost') {
      return `$${Math.round(value).toLocaleString()}`;
    } else if (selectedMetric === 'roas') {
      return `${value.toFixed(2)}x`;
    } else if (selectedMetric === 'conversion') {
      return `${value.toFixed(2)}%`;
    } else if (selectedMetric === 'cpa') {
      return `$${Math.round(value)}`;
    }
    return value.toString();
  };
  
  const metricOptions = [
    { value: "revenue", label: "Revenue" },
    { value: "cost", label: "Cost" },
    { value: "roas", label: "ROAS" },
    { value: "conversion", label: "Conversion Rate" },
    { value: "cpa", label: "CPA" },
  ];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-md">Metric Distribution</CardTitle>
            <CardDescription>
              Frequency distribution of metric values across channels
            </CardDescription>
          </div>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              {metricOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10 }} 
                  tickLine={false}
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={false} 
                  label={{ value: 'Frequency', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} 
                />
                <Tooltip 
                  formatter={(value: number) => [`${value} channel${value !== 1 ? 's' : ''}`]}
                  labelFormatter={(label) => `Range: ${label}`}
                />
                <Bar 
                  dataKey="value" 
                  fill="#4361ee" 
                  radius={[4, 4, 0, 0]} 
                  name="Count" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
            <h4 className="text-sm font-medium">Key Statistics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Minimum</p>
                <p className="text-sm font-medium">{formatValue(min)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Maximum</p>
                <p className="text-sm font-medium">{formatValue(max)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mean</p>
                <p className="text-sm font-medium">{formatValue(mean)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Median</p>
                <p className="text-sm font-medium">{formatValue(median)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Standard Deviation</p>
                <p className="text-sm font-medium">{formatValue(stdDev)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Range</p>
                <p className="text-sm font-medium">{formatValue(range)}</p>
              </div>
            </div>
            
            <div className="mt-2">
              <h4 className="text-sm font-medium mb-2">Insights</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• The distribution {Math.abs(mean - median) / mean > 0.2 ? 'is skewed' : 'appears normal'}</li>
                <li>• Coefficient of variation: {(stdDev / mean * 100).toFixed(1)}%</li>
                <li>• {stdDev / mean > 0.5 ? 'High' : 'Low'} variability across channels</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
