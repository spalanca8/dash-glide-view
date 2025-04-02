
import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { cn } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Define media groups with their respective colors
export const mediaGroupColors = {
  paid: "#4361ee", // Blue
  organic: "#06d6a0", // Green
  nonPaid: "#ffd166", // Amber
  baseline: "#ef476f", // Red
};

type MediaGroupBreakdownChartProps = {
  data: any[];
  mediaGroups: {
    dataKey: string;
    color: string;
    label: string;
  }[];
  xAxisKey?: string;
  loading?: boolean;
  height?: number;
  className?: string;
  stacked?: boolean;
};

export function MediaGroupBreakdownChart({
  data,
  mediaGroups,
  xAxisKey = "name",
  loading = false,
  height = 350,
  className,
  stacked = true,
}: MediaGroupBreakdownChartProps) {
  if (loading) {
    return (
      <div className={cn("w-full animate-pulse", className)} style={{ height }}>
        <div className="h-full w-full bg-muted rounded-md"></div>
      </div>
    );
  }

  const chartConfig = mediaGroups.reduce((acc, group) => {
    acc[group.dataKey] = { 
      label: group.label,
      color: group.color
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <ChartContainer className={cn("w-full", className)} style={{ height }} config={chartConfig}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
        <XAxis 
          dataKey={xAxisKey} 
          tick={{ fontSize: 12 }} 
          tickLine={false}
          axisLine={{ stroke: "rgba(0,0,0,0.09)" }}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${Math.abs(value).toLocaleString()}`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent 
              formatter={(value, name) => {
                return [`$${Math.abs(Number(value)).toLocaleString()}`, name];
              }}
            />
          }
        />
        <Legend 
          formatter={(value, entry, index) => (
            <span className="text-sm">{mediaGroups[index]?.label || value}</span>
          )}
        />
        {mediaGroups.map((group, index) => (
          <Bar
            key={group.dataKey}
            dataKey={group.dataKey}
            name={group.label}
            fill={group.color}
            radius={[4, 4, 0, 0]}
            animationDuration={1000 + index * 250}
            animationBegin={index * 100}
            stackId={stacked ? "stack" : undefined}
          />
        ))}
        <ReferenceLine y={0} stroke="rgba(0,0,0,0.3)" strokeDasharray="3 3" />
      </BarChart>
    </ChartContainer>
  );
}
