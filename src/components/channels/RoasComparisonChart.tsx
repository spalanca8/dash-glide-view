
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
  data?: any[]; // Added for compatibility with other components
}
export function RoasComparisonChart({
  channelData,
  loading,
  height = 400,
  title = "ROAS Comparison",
  description = "Return on Ad Spend across channels",
  data
}: RoasComparisonChartProps) {
  if (loading) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  // Use data prop if provided, otherwise use channelData
  const chartData = data || channelData;

  // Prevent errors with null/undefined data
  if (!chartData || chartData.length === 0) {
    return <Card className="overflow-hidden border-border/40 shadow-sm w-full">
        <CardContent className="p-6">
          <div className="text-center h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground">No ROAS data available</p>
          </div>
        </CardContent>
      </Card>;
  }

  // Sort channels by ROAS for better visualization
  const sortedData = [...chartData].filter(item => item && item.roas !== undefined).sort((a, b) => (b.roas || 0) - (a.roas || 0));
  return <Card className="overflow-hidden border-border/40 shadow-sm w-full">
      <CardContent className="p-4 sm:p-6">
        {(title || description) && <div className="mb-4">
            {title && <h3 className="text-lg font-medium">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>}
        <div className="w-full h-[450px] relative">
          <div className="absolute inset-0">
            <ChartContainer config={{
            roas: {
              label: "ROAS",
              color: "rgb(139, 92, 246, 0.7)"
            }
          }}>
              <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                <RechartsPrimitive.BarChart data={sortedData} margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 150
              }}>
                  <RechartsPrimitive.XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    tick={{
                      fontSize: 12
                    }} 
                    height={120}
                    interval={0} 
                    label={{
                      value: 'Campaign',
                      position: 'insideBottom',
                      offset: -20,
                      style: {
                        textAnchor: 'middle',
                        fontSize: 12,
                        fill: '#94a3b8',
                        dy: 130
                      }
                    }} 
                  />
                  <RechartsPrimitive.YAxis stroke="#94a3b8" label={{
                  value: 'ROAS (Return on Ad Spend)',
                  angle: -90,
                  position: 'insideLeft',
                  style: {
                    textAnchor: 'middle',
                    fontSize: 12,
                    fill: '#94a3b8',
                    dx: -10
                  }
                }} />
                  <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <RechartsPrimitive.Bar dataKey="roas" name="ROAS" barSize={70} radius={[4, 4, 0, 0]} shape={props => {
                  const {
                    x,
                    y,
                    width,
                    height,
                    payload
                  } = props;
                  const channelId = payload.id;
                  const color = channelColors[channelId as keyof typeof channelColors] || "rgb(139, 92, 246, 0.7)";
                  return <rect x={x} y={y} width={width} height={height} fill={color} rx={4} ry={4} />;
                }} label={{
                  position: 'top',
                  formatter: (value: number) => value !== undefined ? `${value.toFixed(1)}x` : '',
                  style: {
                    fontSize: 10,
                    fill: 'rgb(139, 92, 246)',
                    fontWeight: 'bold'
                  }
                }} />
                  <ChartTooltip cursor={{
                  strokeDasharray: "3 3"
                }} content={<ChartTooltipContent />} wrapperStyle={{
                  outline: "none"
                }} />
                </RechartsPrimitive.BarChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>;
}
