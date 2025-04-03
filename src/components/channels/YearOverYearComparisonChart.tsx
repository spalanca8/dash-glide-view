
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
            domain={["dataMin", "dataMax"]}
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
            fill={(entry) => entry.color}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
