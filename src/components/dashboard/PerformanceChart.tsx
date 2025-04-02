
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

type LineConfig = {
  dataKey: string;
  color: string;
  label?: string;
  yAxisId?: string;
};

type PerformanceChartProps = {
  data: any[];
  lines: LineConfig[];
  xAxisKey?: string;
  loading?: boolean;
  height?: number;
  className?: string;
};

export function PerformanceChart({
  data,
  lines,
  xAxisKey = "name",
  loading = false,
  height = 300,
  className,
}: PerformanceChartProps) {
  if (loading) {
    return (
      <div className={cn("w-full animate-pulse", className)} style={{ height }}>
        <div className="h-full w-full bg-muted rounded-md"></div>
      </div>
    );
  }

  // Check if we have any lines with yAxisId="right"
  const hasRightAxis = lines.some(line => line.yAxisId === "right");

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
            yAxisId="left"
            orientation="left"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          {hasRightAxis && (
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
          )}
          <Tooltip
            contentStyle={{
              borderRadius: "0.5rem",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              border: "none",
              padding: "8px 12px",
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
          />
          <Legend 
            formatter={(value, entry, index) => <span className="text-sm">{lines[index]?.label || value}</span>}
          />
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              name={line.label || line.dataKey}
              stroke={line.color}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              yAxisId={line.yAxisId || "left"}
              animationDuration={1000 + index * 500}
              animationBegin={index * 150}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
