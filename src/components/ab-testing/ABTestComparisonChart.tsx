
import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { ABTest } from "@/hooks/useMockABTestData";
import { ChartContainer } from "@/components/ui/chart";

interface ABTestComparisonChartProps {
  test: ABTest;
  loading?: boolean;
}

export function ABTestComparisonChart({ test, loading = false }: ABTestComparisonChartProps) {
  if (loading) {
    return <Skeleton className="h-[350px] w-full" />;
  }

  // Prepare chart data using actual test variants
  const chartData = [
    {
      name: "Conversion Rate (%)",
      [test.variants[0].name]: test.variants[0].conversionRate,
      [test.variants[1]?.name || "Variant"]: test.variants[1]?.conversionRate || 0,
      controlValue: test.variants[0].conversionRate,
      variantValue: test.variants[1]?.conversionRate || 0,
    },
    {
      name: "Revenue per Visitor ($)",
      [test.variants[0].name]: (test.variants[0].revenue / test.variants[0].visitors).toFixed(2),
      [test.variants[1]?.name || "Variant"]: test.variants[1] 
        ? (test.variants[1].revenue / test.variants[1].visitors).toFixed(2) 
        : 0,
      controlValue: (test.variants[0].revenue / test.variants[0].visitors).toFixed(2),
      variantValue: test.variants[1] 
        ? (test.variants[1].revenue / test.variants[1].visitors).toFixed(2) 
        : 0,
    }
  ];

  // Get control and variant names for dynamic display
  const controlName = test.variants.find(v => v.isControl)?.name || test.variants[0].name;
  const variantName = test.variants.find(v => !v.isControl)?.name || test.variants[1]?.name || "Variant";

  // Calculate percentage improvements for tooltips
  const calculateImprovement = (controlValue: number, variantValue: number) => {
    if (controlValue === 0) return 0;
    return ((variantValue - controlValue) / controlValue) * 100;
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const controlValue = parseFloat(payload[0].value);
      const variantValue = parseFloat(payload[1].value);
      const improvement = calculateImprovement(controlValue, variantValue);
      
      return (
        <div className="bg-background p-3 border rounded shadow-lg">
          <p className="font-semibold">{label}</p>
          <p className="text-sm">{controlName}: {payload[0].value}{label.includes("%") ? "%" : ""}</p>
          <p className="text-sm">{variantName}: {payload[1].value}{label.includes("%") ? "%" : ""}</p>
          <div className="mt-1">
            <p className={`text-sm font-medium ${improvement >= 0 ? "text-green-500" : "text-red-500"}`}>
              {improvement > 0 ? "+" : ""}{improvement.toFixed(2)}% vs Control
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer 
      config={{
        [controlName]: { 
          color: "#94a3b8" 
        },
        [variantName]: { 
          color: "#8b5cf6" 
        },
      }}
      className="w-full h-[350px]"
    >
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
        <XAxis 
          dataKey="name" 
          tickLine={false} 
          axisLine={{ stroke: 'rgba(0,0,0,0.1)' }} 
        />
        <YAxis 
          tickFormatter={(value) => value.toString()} 
          tickLine={false} 
          axisLine={false} 
          tickCount={6} 
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar 
          dataKey={controlName}
          name={controlName}
          fill="#94a3b8" 
          radius={[4, 4, 0, 0]} 
        />
        <Bar 
          dataKey={variantName}
          name={variantName}
          fill="#8b5cf6" 
          radius={[4, 4, 0, 0]} 
        />
      </BarChart>
    </ChartContainer>
  );
}
