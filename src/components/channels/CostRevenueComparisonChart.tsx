
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface CostRevenueComparisonChartProps {
  channelData: any[];
  loading: boolean;
  height?: number;
}

export function CostRevenueComparisonChart({ 
  channelData, 
  loading, 
  height = 400 
}: CostRevenueComparisonChartProps) {
  if (loading) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  // Sort channels by revenue for better visualization
  const sortedData = [...channelData].sort((a, b) => b.revenue - a.revenue);

  return (
    <Card className="overflow-hidden border-border/40 shadow-sm">
      <CardContent className="p-6">
        <div className="w-full h-[400px] relative">
          <div className="absolute inset-0">
            <ChartContainer 
              config={{
                cost: {
                  label: "Cost",
                  color: "rgb(147, 197, 253, 0.7)"
                },
                incremental: {
                  label: "Incremental Outcome",
                  color: "rgb(74, 222, 128, 0.7)"
                }
              }}
            >
              <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                <RechartsPrimitive.BarChart
                  data={sortedData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <RechartsPrimitive.XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end"
                    tick={{ fontSize: 12 }}
                    height={60}
                  />
                  <RechartsPrimitive.YAxis
                    stroke="#94a3b8"
                    label={{ 
                      value: 'Amount ($)', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle', fontSize: 11, fill: '#94a3b8' }
                    }}
                  />
                  <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <RechartsPrimitive.Bar 
                    dataKey="cost" 
                    fill="rgb(147, 197, 253, 0.7)" 
                    name="Cost"
                    barSize={30}
                  />
                  <RechartsPrimitive.Bar 
                    dataKey="incremental" 
                    fill="rgb(74, 222, 128, 0.7)" 
                    name="Incremental Outcome"
                    barSize={30}
                  />
                  <ChartTooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={<ChartTooltipContent />}
                    wrapperStyle={{ outline: "none" }}
                  />
                  <RechartsPrimitive.Legend 
                    verticalAlign="top" 
                    height={36}
                  />
                </RechartsPrimitive.BarChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
