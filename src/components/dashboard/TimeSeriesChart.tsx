
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

type TimeSeriesChartProps = {
  data: any[];
  lines: {
    dataKey: string;
    color: string;
    label?: string;
    strokeDasharray?: string;
    yAxisId?: string;
  }[];
  loading: boolean;
  height?: number;
  xAxisKey?: string;
  showLegend?: boolean;
  tooltipFormatter?: (value: number) => string;
  yAxisFormatter?: (value: number) => string;
  showGrid?: boolean;
};

export function TimeSeriesChart({
  data,
  lines,
  loading,
  height = 300,
  xAxisKey = "name",
  showLegend = true,
  tooltipFormatter,
  yAxisFormatter,
  showGrid = true,
}: TimeSeriesChartProps) {
  if (loading) {
    return <Skeleton className="w-full h-[300px]" />;
  }

  const renderCustomTick = (props: any) => {
    const { x, y, payload } = props;
    
    // Custom rendering for X-axis tick
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="#666"
          fontSize={12}
          transform={`rotate(-30)`} // Use transform instead of angle
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 40,
        }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        <XAxis
          dataKey={xAxisKey}
          tick={renderCustomTick}
          tickLine={false}
          axisLine={{ stroke: "rgba(0,0,0,0.09)" }}
          height={60}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={yAxisFormatter}
        />
        {lines.map((line) => (
          <YAxis
            key={`y-${line.dataKey}`}
            yAxisId={line.yAxisId || "left"}
            orientation={line.yAxisId === "right" ? "right" : "left"}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={yAxisFormatter}
            hide={!line.yAxisId || line.yAxisId === "left"}
          />
        ))}
        <Tooltip
          formatter={
            tooltipFormatter
              ? (value: any) => [tooltipFormatter(value), ""]
              : (value: any) => [value, ""]
          }
          contentStyle={{
            borderRadius: "0.5rem",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            border: "none",
            padding: "8px 12px",
          }}
        />
        {showLegend && <Legend />}
        {lines.map((line, index) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color}
            name={line.label || line.dataKey}
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 6 }}
            yAxisId={line.yAxisId || "left"}
            strokeDasharray={line.strokeDasharray}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
