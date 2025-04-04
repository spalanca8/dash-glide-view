
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { channelColors } from "@/data/mockData";

interface RoasComparisonChartProps {
  channelData: any[];
  loading: boolean;
  height?: number;
  title?: string;
  description?: string;
}

export function RoasComparisonChart({ 
  channelData, 
  loading, 
  height = 400,
  title = "ROAS Comparison",
  description = "Return on Ad Spend across channels"
}: RoasComparisonChartProps) {
  if (loading) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  // Sort channels by ROAS for better visualization
  const sortedData = [...channelData].sort((a, b) => b.roas - a.roas);

  return (
    <Card className="overflow-hidden border-border/40 shadow-sm">
      <CardContent className="p-6">
        {(title || description) && (
          <div className="mb-4">
            {title && <h3 className="text-lg font-medium">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
        <div className="w-full h-[400px] relative">
          <div className="absolute inset-0">
            <ChartContainer 
              config={{
                roas: {
                  label: "ROAS",
                  color: "#8B5CF6"
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
                      value: 'ROAS (x)', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle', fontSize: 11, fill: '#94a3b8' }
                    }}
                  />
                  <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <RechartsPrimitive.Bar 
                    dataKey="roas" 
                    name="ROAS"
                    barSize={30}
                    radius={[4, 4, 0, 0]}
                    shape={(props) => {
                      const { x, y, width, height, payload } = props;
                      const channelId = payload.id;
                      const color = channelColors[channelId as keyof typeof channelColors] || "#8B5CF6";
                      
                      return (
                        <rect 
                          x={x} 
                          y={y} 
                          width={width} 
                          height={height} 
                          fill={color}
                          rx={4}
                          ry={4}
                        />
                      );
                    }}
                    label={{
                      position: 'top',
                      formatter: (value: number) => `${value.toFixed(1)}x`,
                      style: { fontSize: 10, fill: '#8B5CF6', fontWeight: 'bold' }
                    }}
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
