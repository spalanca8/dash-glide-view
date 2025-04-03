
import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

type BudgetAllocationProps = {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  loading?: boolean;
  title?: string;
};
export function BudgetAllocationChart({ data, loading = false, title }: BudgetAllocationProps) {
  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-32 w-32 rounded-full bg-muted animate-pulse"></div>
      </div>
    );
  }

  // Create color config for the chart
  const colorConfig = data.reduce((acc, item) => {
    acc[item.name] = { color: item.color };
    return acc;
  }, {} as Record<string, { color: string }>);

  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="h-[500px]"> {/* Increased height to accommodate larger pie and labels */}
      <ChartContainer config={colorConfig} className="w-full h-full">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={100}  // Increased inner radius for more donut-like appearance
            outerRadius={160} // Increased outer radius
            paddingAngle={2}
            dataKey="value"
            animationDuration={750}
            animationBegin={0}
            stroke="#111"
            strokeWidth={2}
            // Add labels with percentage and names
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 1.6; // Increased multiplier to push labels further out
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              
              return (
                <text
                  x={x}
                  y={y}
                  className="text-[16px] font-semibold" // Larger and bolder text
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  fill="#888888"
                >
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                style={{ 
                  filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))',
                  strokeWidth: 2
                }} 
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </Pie>
          <Tooltip 
            content={(props) => {
              if (!props.active || !props.payload?.length) {
                return null;
              }
              
              const currentItem = props.payload[0].payload;
              const percentage = ((currentItem.value / total) * 100).toFixed(1);
              
              return (
                <ChartTooltipContent
                  active={props.active}
                  payload={props.payload}
                  label={props.label}
                  formatter={(value) => [
                    `${currentItem.name}: $${Number(value).toLocaleString()} (${percentage}%)`, 
                    "Budget"
                  ]}
                />
              );
            }}
          />
        </PieChart>
      </ChartContainer>
      {title && (
        <div className="text-center mt-6 text-lg text-muted-foreground"> {/* Larger text size */}
          {title}
        </div>
      )}
    </div>
  );
}
