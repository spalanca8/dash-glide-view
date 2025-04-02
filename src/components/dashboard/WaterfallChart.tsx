
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
  Cell
} from "recharts";
import { cn } from "@/lib/utils";

type WaterfallChartProps = {
  data: {
    name: string;
    value: number;
    fill: string;
    isTotal?: boolean;
  }[];
  loading?: boolean;
  height?: number;
  className?: string;
};

export function WaterfallChart({
  data,
  loading = false,
  height = 350,
  className,
}: WaterfallChartProps) {
  if (loading) {
    return (
      <div className={cn("w-full animate-pulse", className)} style={{ height }}>
        <div className="h-full w-full bg-muted rounded-md"></div>
      </div>
    );
  }

  // Calculate the running total for each bar
  let total = 0;
  const chartData = data.map((item) => {
    if (item.isTotal) {
      return { ...item, start: 0, end: item.value };
    }
    
    const start = total;
    total += item.value;
    
    return {
      ...item,
      start,
      end: total,
    };
  });

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <defs>
            {chartData.map((entry, index) => (
              <linearGradient
                key={`gradient-${index}`}
                id={`colorGradient${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={entry.fill}
                  stopOpacity={0.9}
                />
                <stop
                  offset="95%"
                  stopColor={entry.fill}
                  stopOpacity={0.6}
                />
              </linearGradient>
            ))}
            <filter id="shadow" height="130%">
              <feDropShadow 
                dx="0" 
                dy="3" 
                stdDeviation="3"
                floodColor="rgba(0, 0, 0, 0.15)"
              />
            </filter>
            {/* Add a glow effect for hover states */}
            <filter id="glow-hover" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feColorMatrix
                in="blur" 
                type="matrix"
                values="0 0 0 0 0.6   0 0 0 0 0.6   0 0 0 0 1  0 0 0 0.4 0"
              />
              <feComposite in="SourceGraphic" />
            </filter>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(0,0,0,0.05)" 
            vertical={false}
          />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fontWeight: 500 }} 
            tickLine={false}
            axisLine={{ stroke: "rgba(0,0,0,0.09)" }}
            height={60}
            tickMargin={8}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="rounded-lg border border-border/50 bg-white/90 px-4 py-3 text-sm shadow-xl backdrop-blur-sm">
                    <p className="font-medium text-gray-800">{data.name}</p>
                    <p className="text-primary pt-1 font-medium">
                      {data.isTotal ? "Total" : "Contribution"}: ${Math.abs(data.value).toLocaleString()}
                    </p>
                    {!data.isTotal && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Running total: ${data.end.toLocaleString()}
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            }}
            wrapperStyle={{ outline: "none" }}
          />
          <Bar 
            dataKey="value" 
            radius={[8, 8, 0, 0]}
            animationDuration={1500}
            animationEasing="ease-in-out"
            className="drop-shadow-md hover:filter-glow-hover"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.isTotal ? `url(#colorGradient${index})` : `url(#colorGradient${index})`}
                stroke={entry.fill}
                strokeWidth={1}
                style={{ 
                  filter: entry.isTotal ? 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Bar>
          <ReferenceLine 
            y={0} 
            stroke="rgba(0,0,0,0.3)" 
            strokeWidth={1.5} 
            strokeDasharray="3 3"
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            wrapperStyle={{ 
              paddingTop: '10px',
              fontSize: '13px',
              fontWeight: 500
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
