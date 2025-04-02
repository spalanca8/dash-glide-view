
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type StackedAreaChartProps = {
  data: any[];
  areaGroups: {
    dataKey: string;
    color: string;
    label: string;
  }[];
  xAxisKey?: string;
  loading?: boolean;
  height?: number;
  className?: string;
};

export function StackedAreaChart({
  data,
  areaGroups,
  xAxisKey = "name",
  loading = false,
  height = 350,
  className,
}: StackedAreaChartProps) {
  if (loading) {
    return (
      <div className={cn("w-full animate-pulse", className)} style={{ height }}>
        <div className="h-full w-full bg-muted rounded-md"></div>
      </div>
    );
  }

  const chartConfig = areaGroups.reduce((acc, group) => {
    acc[group.dataKey] = { 
      label: group.label,
      color: group.color
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <ChartContainer className={cn("w-full", className)} style={{ height }} config={chartConfig}>
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <defs>
          {areaGroups.map((group) => (
            <linearGradient
              key={`gradient-${group.dataKey}`}
              id={`color-${group.dataKey}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={group.color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={group.color} stopOpacity={0.2} />
            </linearGradient>
          ))}
        </defs>
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
            <span className="text-sm">{areaGroups[index]?.label || value}</span>
          )}
        />
        {/* Render areas in reverse order so baseline is on top */}
        {[...areaGroups].reverse().map((group, index) => (
          <Area
            key={group.dataKey}
            type="monotone"
            dataKey={group.dataKey}
            name={group.label}
            stackId="1"
            stroke={group.color}
            fill={`url(#color-${group.dataKey})`}
            animationDuration={1000 + index * 250}
            animationBegin={index * 100}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}
