
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
  ReferenceLine,
  Scatter
} from "recharts";
import { cn } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { channelSaturationData } from "@/data/mockData";

type MediaSaturationChartProps = {
  data: any[];
  curves: {
    dataKey: string;
    color: string;
    label: string;
  }[];
  xAxisKey?: string;
  loading?: boolean;
  height?: number;
  className?: string;
};

export function MediaSaturationChart({
  data,
  curves,
  xAxisKey = "spend",
  loading = false,
  height = 350,
  className,
}: MediaSaturationChartProps) {
  if (loading) {
    return (
      <div className={cn("w-full animate-pulse", className)} style={{ height }}>
        <div className="h-full w-full bg-muted rounded-md"></div>
      </div>
    );
  }

  const chartConfig = curves.reduce((acc, curve) => {
    acc[curve.dataKey] = { 
      label: curve.label,
      color: curve.color
    };
    return acc;
  }, {} as Record<string, any>);

  // Create a custom formatted data point for the tooltip
  const CustomDot = (props: any) => {
    const { cx, cy, dataKey, payload } = props;
    
    // Only render dots for special points
    const isCurrentSpend = payload.spend === channelSaturationData[dataKey]?.currentSpend;
    const isMaxSaturation = payload.spend === channelSaturationData[dataKey]?.maxSaturation;
    
    if (!isCurrentSpend && !isMaxSaturation) return null;

    const dotColor = channelSaturationData[dataKey]?.color || props.stroke;
    
    return (
      <g>
        <circle 
          cx={cx} 
          cy={cy} 
          r={isCurrentSpend ? 6 : 6} 
          fill={isCurrentSpend ? "#ffffff" : "#000000"} 
          stroke={dotColor}
          strokeWidth={2}
        />
        {isCurrentSpend && (
          <circle cx={cx} cy={cy} r={3} fill={dotColor} />
        )}
      </g>
    );
  };

  return (
    <ChartContainer className={cn("w-full", className)} style={{ height }} config={chartConfig}>
      <LineChart
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
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          label={{ value: "Media Spend", position: "insideBottom", offset: -5 }}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          label={{ value: "Incremental Revenue", angle: -90, position: "insideLeft" }}
        />
        
        {/* Add reference lines for current spend for each curve */}
        {curves.map((curve) => {
          const currentSpend = channelSaturationData[curve.dataKey]?.currentSpend;
          const maxSaturation = channelSaturationData[curve.dataKey]?.maxSaturation;
          return (
            <React.Fragment key={curve.dataKey}>
              {currentSpend && (
                <ReferenceLine 
                  x={currentSpend} 
                  stroke={curve.color} 
                  strokeDasharray="3 3"
                  label={{ 
                    value: `Current ${curve.label}`, 
                    position: 'insideTopRight',
                    fill: curve.color,
                    fontSize: 10
                  }} 
                />
              )}
              {maxSaturation && (
                <ReferenceLine 
                  x={maxSaturation} 
                  stroke={curve.color} 
                  strokeDasharray="3 3"
                  label={{ 
                    value: `Max ${curve.label}`, 
                    position: 'insideTopRight',
                    fill: curve.color,
                    fontSize: 10
                  }} 
                />
              )}
            </React.Fragment>
          );
        })}
        
        <ChartTooltip
          content={
            <ChartTooltipContent 
              formatter={(value, name) => {
                return [`$${Number(value).toLocaleString()}`, name];
              }}
            />
          }
        />
        <Legend 
          formatter={(value, entry, index) => (
            <span className="text-sm">{curves[index]?.label || value}</span>
          )}
        />
        {curves.map((curve, index) => (
          <Line
            key={curve.dataKey}
            type="monotone"
            dataKey={curve.dataKey}
            name={curve.label}
            stroke={curve.color}
            strokeWidth={2}
            dot={<CustomDot />}
            activeDot={{ r: 5 }}
            animationDuration={1000 + index * 250}
            animationBegin={index * 100}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}
