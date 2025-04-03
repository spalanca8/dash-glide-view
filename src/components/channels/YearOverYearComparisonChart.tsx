
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
  ReferenceLine,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

type YearOverYearComparisonChartProps = {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  title: string;
  description?: string;
  loading?: boolean;
  height?: number;
  className?: string;
  showInfo?: boolean;
  infoText?: string;
  insights?: string[];
  bestPerformer?: string;
  worstPerformer?: string;
};

export function YearOverYearComparisonChart({
  data,
  title,
  description,
  loading = false,
  height = 400,
  className,
  showInfo = false,
  infoText,
  insights = [],
  bestPerformer,
  worstPerformer,
}: YearOverYearComparisonChartProps) {
  if (loading) {
    return <Skeleton className={cn("w-full", className)} style={{ height }} />;
  }

  // Sort data by value to make visualization more meaningful
  const sortedData = [...data].sort((a, b) => a.value - b.value);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {showInfo && infoText && (
          <div className="group relative">
            <Info className="h-5 w-5 text-muted-foreground cursor-help" />
            <div className="absolute right-0 top-6 z-50 w-72 rounded-md bg-white p-3 shadow-lg ring-1 ring-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <p className="text-sm text-muted-foreground">{infoText}</p>
            </div>
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 100,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis
            type="number"
            tickFormatter={(value) => `${value > 0 ? "+" : ""}${value}%`}
            domain={["auto", "auto"]}  // Use auto domain to properly show negative values
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={100}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value: number) => [`${value > 0 ? "+" : ""}${value.toFixed(1)}%`, "Change"]}
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
          />
          <Legend />
          <ReferenceLine x={0} stroke="#000" />
          <Bar
            dataKey="value"
            name="YoY Change"
            radius={[4, 4, 4, 4]}
            animationDuration={1500}
            isAnimationActive={true}
            fill="#4361ee"
            shape={(props) => {
              // Extract the data entry from the props
              const { x, y, width, height, payload } = props;
              
              // Determine the actual x position and width for negative values
              let barX = x;
              let barWidth = width;
              
              // For negative values, need to adjust the x position
              if (payload.value < 0) {
                // Calculate width based on absolute value
                barWidth = Math.abs(width);
                // For negative values in horizontal layout, bar starts at a different x
                barX = x - barWidth;
              }
              
              // Use the color from the data entry for consistent coloring
              const fill = payload.color || (payload.value >= 0 ? "#4361ee" : "#ef476f");
              
              // Return the bar with the proper fill color
              return <rect x={barX} y={y} width={barWidth} height={height} fill={fill} rx={4} ry={4} />;
            }}
          />
        </BarChart>
      </ResponsiveContainer>
      
      {(insights?.length > 0 || bestPerformer || worstPerformer) && (
        <div className="mt-4 p-4 bg-blue-50/50 border border-blue-100 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Key Insights</h4>
          {insights?.length > 0 && (
            <ul className="list-disc pl-5 space-y-1 mb-3">
              {insights.map((insight, i) => (
                <li key={i} className="text-sm text-blue-700">{insight}</li>
              ))}
            </ul>
          )}
          {bestPerformer && (
            <div className="flex items-center gap-2 text-sm text-green-700 font-medium">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
              Best performer: {bestPerformer}
            </div>
          )}
          {worstPerformer && (
            <div className="flex items-center gap-2 text-sm text-red-700 font-medium mt-1">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
              Area of concern: {worstPerformer}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
