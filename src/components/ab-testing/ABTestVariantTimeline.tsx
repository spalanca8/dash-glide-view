
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { ABTest } from "@/hooks/useMockABTestData";
import { ChartContainer } from "@/components/ui/chart";

interface ABTestVariantTimelineProps {
  test: ABTest;
  loading?: boolean;
}

export function ABTestVariantTimeline({ test, loading = false }: ABTestVariantTimelineProps) {
  if (loading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  // Get variants for the chart
  const controlVariant = test.variants.find(v => v.isControl);
  const testVariant = test.variants.find(v => !v.isControl);
  
  if (!controlVariant?.timeSeriesData || !testVariant?.timeSeriesData) {
    return <div className="p-4 text-center">No timeline data available for this test</div>;
  }

  // Format the data for the chart
  const timelineData = controlVariant.timeSeriesData.map((dataPoint, index) => {
    const testDataPoint = testVariant.timeSeriesData?.[index];
    
    return {
      date: dataPoint.date,
      [`${controlVariant.name} Conv Rate`]: ((dataPoint.conversions / dataPoint.visitors) * 100).toFixed(2),
      [`${testVariant.name} Conv Rate`]: testDataPoint ? ((testDataPoint.conversions / testDataPoint.visitors) * 100).toFixed(2) : 0,
      [`${controlVariant.name} Visitors`]: dataPoint.visitors,
      [`${testVariant.name} Visitors`]: testDataPoint?.visitors || 0,
    };
  });

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white shadow-lg border rounded-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p 
              key={`item-${index}`} 
              style={{ color: entry.color }}
              className="text-sm"
            >
              {entry.name}: {entry.value}{entry.name.includes('Conv Rate') ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px]">
      <ChartContainer 
        config={{
          [`${controlVariant.name} Conv Rate`]: { 
            color: "#94a3b8" 
          },
          [`${testVariant.name} Conv Rate`]: { 
            color: "#8b5cf6"
          },
        }}
        className="w-full h-[400px]"
      >
        <LineChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
          <XAxis 
            dataKey="date" 
            tickLine={false} 
            axisLine={{ stroke: 'rgba(0,0,0,0.1)' }} 
          />
          <YAxis 
            yAxisId="left"
            tickLine={false} 
            axisLine={false}
            tickCount={5}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey={`${controlVariant.name} Conv Rate`}
            name={`${controlVariant.name} Conv Rate`}
            stroke="#94a3b8" 
            activeDot={{ r: 6 }} 
            strokeWidth={2}
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey={`${testVariant.name} Conv Rate`} 
            name={`${testVariant.name} Conv Rate`}
            stroke="#8b5cf6" 
            activeDot={{ r: 6 }} 
            strokeWidth={2}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
