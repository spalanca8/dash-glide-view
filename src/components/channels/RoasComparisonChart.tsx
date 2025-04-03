import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { BarChart4, CircleDot } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { channelColors } from "@/data/mockData";

interface RoasComparisonChartProps {
  channelData: any[];
  loading: boolean;
}

export function RoasComparisonChart({ channelData, loading }: RoasComparisonChartProps) {
  if (loading) {
    return <Skeleton className="w-full h-[600px]" />;
  }

  // Sort channels by ROAS for better visualization
  const sortedData = [...channelData].sort((a, b) => b.roas - a.roas);

  // Calculate max values for scaling
  const maxCost = Math.max(...sortedData.map(d => d.cost));
  const maxIncremental = Math.max(...sortedData.map(d => d.incremental));
  const maxRoas = Math.max(...sortedData.map(d => d.roas));

  return (
    <Card className="overflow-hidden border-border/40 shadow-sm mb-6">
      <div className="h-1 bg-gradient-to-r from-[#4cc9f0] to-[#7209b7]"></div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <BarChart4 className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-lg">Channel Performance Matrix</CardTitle>
        </div>
        <CardDescription className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <CircleDot className="h-3 w-3 text-indigo-500" />
            <span>ROAS (scatter)</span>
          </div>
          <span className="text-muted-foreground">vs.</span>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-blue-300/70"></div>
            <span>Cost</span>
          </div>
          <span className="text-muted-foreground">and</span>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-green-400/70"></div>
            <span>Incremental Outcome</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <div className="w-full h-[850px] relative">
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
                },
                roas: {
                  label: "ROAS",
                  color: "#8B5CF6"
                }
              }}
            >
              <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                <RechartsPrimitive.ComposedChart
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
                    yAxisId="left"
                    orientation="left" 
                    stroke="#94a3b8"
                    domain={[0, maxCost + maxIncremental + (maxCost * 0.1)]}
                    label={{ 
                      value: 'Cost & Incremental ($)', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle', fontSize: 11, fill: '#94a3b8' }
                    }}
                  />
                  <RechartsPrimitive.YAxis 
                    yAxisId="right" 
                    orientation="right"
                    stroke="#8B5CF6"
                    domain={[0, maxRoas + (maxRoas * 0.1)]}
                    label={{ 
                      value: 'ROAS (x)', 
                      angle: -90, 
                      position: 'insideRight',
                      style: { textAnchor: 'middle', fontSize: 11, fill: '#8B5CF6' }
                    }}
                  />
                  <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <RechartsPrimitive.Bar 
                    dataKey="cost" 
                    yAxisId="left"
                    fill="rgb(147, 197, 253, 0.7)" 
                    name="Cost"
                    barSize={20}
                  />
                  <RechartsPrimitive.Bar 
                    dataKey="incremental" 
                    yAxisId="left"
                    fill="rgb(74, 222, 128, 0.7)" 
                    name="Incremental Outcome"
                    barSize={20}
                    label={{
                      position: 'top',
                      formatter: (value: number) => `$${value.toLocaleString()}`,
                      style: { fontSize: 10, fill: '#059669', fontWeight: 'bold' }
                    }}
                  />
                  <RechartsPrimitive.Scatter 
                    dataKey="roas" 
                    yAxisId="right" 
                    fill="#8B5CF6" 
                    name="ROAS"
                    shape={(props) => {
                      const { cx, cy, payload } = props;
                      const channelId = payload.id;
                      const color = channelColors[channelId as keyof typeof channelColors] || "#8B5CF6";
                      
                      return (
                        <svg>
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r={10}
                            stroke={color}
                            strokeWidth={3}
                            fill="white"
                            opacity={0.9}
                          />
                          <text 
                            x={cx} 
                            y={cy} 
                            textAnchor="middle" 
                            dominantBaseline="central"
                            fill={color}
                            fontSize={10}
                            fontWeight="bold"
                          >
                            {parseFloat(payload.roas).toFixed(1)}
                          </text>
                        </svg>
                      );
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
                </RechartsPrimitive.ComposedChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
