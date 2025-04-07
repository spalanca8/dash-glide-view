
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface CostRevenueComparisonChartProps {
  channelData: any[];
  loading: boolean;
  height?: number;
  title?: string;
  description?: string;
}

export function CostRevenueComparisonChart({
  channelData,
  loading,
  height = 500,
  title = "Cost and Incremental Revenue Comparison",
  description = "Comparing cost and revenue across channels"
}: CostRevenueComparisonChartProps) {
  if (loading) {
    return <Skeleton className="w-full h-[450px]" />;
  }

  // Sort channels by revenue for better visualization
  const sortedData = [...channelData].sort((a, b) => b.revenue - a.revenue);
  
  return (
    <Card className="overflow-hidden border-border/40 shadow-sm w-full">
      <CardContent className="p-4 sm:p-6">
        {(title || description) && (
          <div className="mb-4">
            {title && <h3 className="text-lg font-medium">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
        <div className="w-full h-[450px] relative">
          <div className="absolute inset-0">
            <ChartContainer 
              config={{
                cost: {
                  label: "Cost",
                  color: "rgb(239, 68, 68, 0.7)"
                },
                incremental: {
                  label: "Incremental Outcome",
                  color: "rgb(139, 92, 246, 0.7)"
                }
              }}
            >
              <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                <RechartsPrimitive.BarChart 
                  data={sortedData} 
                  margin={{
                    top: 20,
                    right: 30,
                    left: 40, // Increased left margin
                    bottom: 80  // Increased bottom margin to accommodate labels
                  }}
                  barGap={10}
                >
                  <RechartsPrimitive.XAxis 
                    dataKey="name" 
                    angle={-30} // Reduced angle for better readability
                    textAnchor="end" 
                    tick={{
                      fontSize: 12,
                      fill: "#4B5563", // Darker text for better contrast
                      fontWeight: 500
                    }} 
                    height={60}  // Increased height
                    interval={0} 
                    label={{
                      value: 'Campaign',
                      position: 'insideBottom',
                      offset: -10,
                      style: {
                        textAnchor: 'middle',
                        fontSize: 14,
                        fill: '#4B5563',
                        fontWeight: 500,
                        dy: 60
                      }
                    }}
                  />
                  <RechartsPrimitive.YAxis 
                    stroke="#4B5563" 
                    tick={{
                      fontSize: 12,
                      fill: "#4B5563",
                      fontWeight: 500
                    }}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    label={{
                      value: 'Amount ($)',
                      angle: -90,
                      position: 'insideLeft',
                      style: {
                        textAnchor: 'middle',
                        fontSize: 14,
                        fill: '#4B5563',
                        fontWeight: 500,
                        dx: -30
                      }
                    }} 
                  />
                  <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <RechartsPrimitive.Bar 
                    dataKey="cost" 
                    name="Cost" 
                    barSize={40} // Reduced bar size
                    radius={[4, 4, 0, 0]} 
                    fill="rgb(239, 68, 68, 0.7)" 
                    label={{
                      position: 'top',
                      formatter: (value: number) => `$${value.toLocaleString()}`,
                      style: {
                        fontSize: 12,
                        fill: 'rgb(239, 68, 68)',
                        fontWeight: 'bold'
                      },
                      dy: -5
                    }} 
                  />
                  <RechartsPrimitive.Bar 
                    dataKey="incremental" 
                    name="Incremental Outcome" 
                    barSize={40} // Reduced bar size
                    radius={[4, 4, 0, 0]} 
                    fill="rgb(139, 92, 246, 0.7)" 
                    label={{
                      position: 'top',
                      formatter: (value: number) => `$${value.toLocaleString()}`,
                      style: {
                        fontSize: 12,
                        fill: 'rgb(139, 92, 246)',
                        fontWeight: 'bold'
                      },
                      dy: -5
                    }} 
                  />
                  <ChartTooltip 
                    cursor={{
                      strokeDasharray: "3 3"
                    }} 
                    content={<ChartTooltipContent />} 
                    wrapperStyle={{
                      outline: "none"
                    }} 
                  />
                  <RechartsPrimitive.Legend 
                    verticalAlign="top" 
                    height={36}
                    wrapperStyle={{
                      paddingTop: '10px',
                      fontWeight: 500
                    }}
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
