
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  Label,
} from "recharts";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Define enhanced colors for different category types
const categoryColors = {
  baseline: "#9b87f5", // Primary Purple
  nonPaid: "#0EA5E9", // Ocean Blue
  organic: "#6E59A5", // Tertiary Purple
  paid: "#F97316", // Bright Orange
  total: "#33C3F0", // Sky Blue
};

type WaterfallDataItem = {
  name: string;
  value: number;
  fill: string;
  start?: number;
  end?: number;
  isTotal?: boolean;
  displayValue?: number;
};

type EnhancedWaterfallChartProps = {
  data: any[];
  loading?: boolean;
  height?: number;
  className?: string;
};

export function EnhancedWaterfallChart({
  data,
  loading = false,
  height = 400,
  className,
}: EnhancedWaterfallChartProps) {
  if (loading) {
    return (
      <div className={cn("w-full", className)}>
        <Skeleton className="w-full" style={{ height }} />
      </div>
    );
  }
  
  // Transform data for waterfall chart
  const prepareWaterfallData = (): WaterfallDataItem[] => {
    if (!data || data.length === 0) return [];
    
    // Take the latest data point
    const latestData = data[data.length - 1];
    
    // Create waterfall data structure - reverse the order to put incremental at top
    // Baseline stays first but the order of other items is reversed
    return [
      { name: 'Baseline', value: latestData.baseline, fill: categoryColors.baseline, isTotal: false },
      { name: 'Paid Media', value: latestData.paid, fill: categoryColors.paid, isTotal: false },
      { name: 'Organic Media', value: latestData.organic, fill: categoryColors.organic, isTotal: false },
      { name: 'Non-Paid Media', value: latestData.nonPaid, fill: categoryColors.nonPaid, isTotal: false },
      { name: 'Total', value: latestData.total, fill: categoryColors.total, isTotal: true }
    ];
  };
  
  // Calculate cumulative totals for waterfall positioning
  const calculateRunningTotal = (data: WaterfallDataItem[]): WaterfallDataItem[] => {
    let runningTotal = 0;
    const result = [];
    
    // Process all items except the total
    const itemsWithoutTotal = data.filter(item => !item.isTotal);
    const totalItem = data.find(item => item.isTotal);
    
    for (const item of itemsWithoutTotal) {
      const start = runningTotal;
      runningTotal += item.value;
      
      result.push({ 
        ...item, 
        start, 
        end: runningTotal,
        displayValue: item.value
      });
    }
    
    // Add the total as the last item if it exists
    if (totalItem) {
      result.push({
        ...totalItem,
        start: 0,
        end: totalItem.value,
        displayValue: totalItem.value
      });
    }
    
    return result;
  };
  
  const waterfallData = prepareWaterfallData();
  const chartData = calculateRunningTotal(waterfallData);
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Card className="shadow-lg border-border/60">
          <CardContent className="py-3 px-4">
            <p className="font-medium text-base">{data.name}</p>
            <p className="text-muted-foreground text-sm mt-1">
              {data.isTotal 
                ? `Total: $${Math.abs(data.value).toLocaleString()}`
                : `Contribution: $${Math.abs(data.value).toLocaleString()}`
              }
            </p>
            {!data.isTotal && (
              <p className="text-xs text-muted-foreground mt-1">
                Running total: ${data.end.toLocaleString()}
              </p>
            )}
          </CardContent>
        </Card>
      );
    }
    return null;
  };
  
  // Define custom bars for the waterfall chart
  const renderCustomBarShape = (props: any) => {
    const { x, y, width, height, fill, payload } = props;
    
    // Special handling for the total bar
    if (payload.isTotal) {
      return (
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          stroke={payload.fill}
          strokeWidth={1}
          rx={4}
          ry={4}
          filter="url(#glow)"
          className="transition-all duration-300"
        />
      );
    }
    
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        stroke={payload.fill}
        strokeWidth={1}
        rx={4}
        ry={4}
        className="transition-all duration-300"
      />
    );
  };
  
  // Custom label for bars
  const renderCustomBarLabel = (props: any) => {
    const { x, y, width, height, value, index } = props;
    const item = chartData[index];
    
    // Only show labels if bar is large enough
    if (height < 20) return null;
    
    const displayText = `$${Math.abs(item.displayValue).toLocaleString()}`;
    
    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={13}
        fontWeight="500"
        style={{ textShadow: "0px 1px 2px rgba(0,0,0,0.3)" }}
        className="pointer-events-none select-none"
      >
        {displayText}
      </text>
    );
  };
  
  // Transform data for cumulative waterfall chart
  const cumulativeChartData = chartData.map((item, index) => {
    if (item.isTotal) return item;
    
    return {
      ...item,
      // For each bar, we'll calculate its visual position in the chart
      y: index === 0 ? item.value : chartData.slice(0, index + 1).reduce((sum, current) => sum + current.value, 0),
      // Keep the original value for tooltip and label
      displayValue: item.value,
      // Add all y values up to this point
      cumulativeValue: chartData.slice(0, index + 1).reduce((sum, current) => sum + current.value, 0)
    };
  });
  
  return (
    <div className={cn("w-full", className)}>
      <div style={{ height }} className="relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={cumulativeChartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barGap={0}
            barCategoryGap={10}
            className="animate-fade-in"
          >
            <defs>
              {Object.entries(categoryColors).map(([key, color]) => (
                <linearGradient
                  key={key}
                  id={`color${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.9} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.7} />
                </linearGradient>
              ))}
              <filter id="glow" height="130%">
                <feDropShadow
                  dx="0"
                  dy="3"
                  stdDeviation="3"
                  floodColor="rgba(0, 0, 0, 0.15)"
                />
              </filter>
              {/* Add a subtle glow effect for emphasis */}
              <filter id="glow-intense" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feColorMatrix
                  in="blur" 
                  type="matrix"
                  values="0 0 0 0 0.6   0 0 0 0 0.6   0 0 0 0 1  0 0 0 0.7 0"
                />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="rgba(0,0,0,0.05)"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fontWeight: 500 }}
              tickLine={false}
              axisLine={{ stroke: "rgba(0,0,0,0.09)" }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{
                paddingBottom: '15px',
                fontWeight: 500
              }}
            />
            {/* For non-total bars, use the cumulative value */}
            <Bar
              dataKey="cumulativeValue"
              fill="transparent"
              shape={renderCustomBarShape}
              label={renderCustomBarLabel}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-in-out"
            >
              {cumulativeChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#color${entry.isTotal ? 'total' : entry.name.toLowerCase().replace(/\s+/g, '')})`}
                  stroke={entry.fill}
                  strokeWidth={1}
                  style={{
                    filter: entry.isTotal
                      ? 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))'
                      : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Bar>
            {/* Total bar is shown separately */}
            <Bar
              dataKey="value"
              fill="transparent"
              shape={renderCustomBarShape}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-in-out"
            >
              {cumulativeChartData.map((entry, index) => {
                if (!entry.isTotal) return null;
                return (
                  <Cell
                    key={`total-cell-${index}`}
                    fill={`url(#colortotal)`}
                    stroke={entry.fill}
                    strokeWidth={1}
                    style={{
                      filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))',
                      cursor: 'pointer',
                    }}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" /> 
          The waterfall chart shows how each media type contributes to the total revenue, with each bar building upon the previous ones to reach the final total.
        </p>
      </div>
    </div>
  );
}
