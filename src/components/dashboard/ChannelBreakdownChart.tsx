
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
} from "recharts";
import { cn } from "@/lib/utils";

type ChannelBreakdownChartProps = {
  data: any[];
  bars: {
    dataKey: string;
    color: string;
    label?: string;
  }[];
  xAxisKey?: string;
  loading?: boolean;
  height?: number;
  className?: string;
  stacked?: boolean;
};

export function ChannelBreakdownChart({
  data,
  bars,
  xAxisKey = "name",
  loading = false,
  height = 300,
  className,
  stacked = false,
}: ChannelBreakdownChartProps) {
  if (loading) {
    return (
      <div className={cn("w-full animate-pulse", className)} style={{ height }}>
        <div className="h-full w-full bg-muted rounded-md"></div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
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
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "0.5rem",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              border: "none",
              padding: "8px 12px",
            }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, ""]}
          />
          <Legend 
            formatter={(value, entry, index) => <span className="text-sm">{bars[index]?.label || value}</span>}
          />
          {bars.map((bar, index) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              name={bar.label || bar.dataKey}
              fill={bar.color}
              radius={[4, 4, 0, 0]}
              animationDuration={1000 + index * 250}
              animationBegin={index * 100}
              stackId={stacked ? "stack" : undefined}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
