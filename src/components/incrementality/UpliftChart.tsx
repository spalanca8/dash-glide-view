import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ABTest } from "@/hooks/useMockABTestData";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, LabelList } from "recharts";
import { TrendingUp, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UpliftChartProps {
  test: ABTest;
}
export function UpliftChart({ test }: UpliftChartProps) {
  // Calculate uplift values
  const controlVariant = test.variants.find(v => v.isControl);
  const testVariant = test.variants.find(v => !v.isControl);
  
  if (!controlVariant || !testVariant) {
    return (
      <Card className="glass-card premium-shadow border-white/30 w-full max-w-[50%]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-lg">Uplift from Test vs Control</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Insufficient data to calculate uplift.</p>
        </CardContent>
      </Card>
    );
  }
  
  // Calculate key metrics
  const conversionRateUplift = ((testVariant.conversionRate - controlVariant.conversionRate) / controlVariant.conversionRate) * 100;
  const revenueUplift = ((testVariant.revenue - controlVariant.revenue) / controlVariant.revenue) * 100;
  
  // Create data for the chart
  const chartData = [
    {
      name: "Conversion Rate",
      Control: controlVariant.conversionRate,
      Test: testVariant.conversionRate,
      uplift: conversionRateUplift.toFixed(1)
    },
    {
      name: "Revenue",
      Control: controlVariant.revenue / 1000,
      Test: testVariant.revenue / 1000,
      uplift: revenueUplift.toFixed(1)
    }
  ];
  
  return (
    <Card className="glass-card premium-shadow border-white/30 w-full max-w-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-lg">Uplift from Test vs Control</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex items-center gap-2 justify-end">
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1 text-xs">
            <ArrowUp className="h-3 w-3" />
            {conversionRateUplift.toFixed(1)}% Conversion Rate Uplift
          </Badge>
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1 text-xs">
            <ArrowUp className="h-3 w-3" />
            {revenueUplift.toFixed(1)}% Revenue Uplift
          </Badge>
        </div>
        
        <div className="h-[300px] w-[500px] mb-4">
          <ChartContainer 
            config={{
              Control: { color: "#94a3b8" },
              Test: { color: "#8b5cf6" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip
                  formatter={(value, name, props) => [
                    name === "uplift" ? `${value}%` : value,
                    name
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar name="Control" dataKey="Control" fill="#94a3b8" radius={[3, 3, 0, 0]} />
                <Bar name="Test" dataKey="Test" fill="#8b5cf6" radius={[3, 3, 0, 0]}>
                  <LabelList dataKey="uplift" position="top" formatter={(v: string) => `+${v}%`} fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="bg-muted/70 backdrop-blur-sm p-3 rounded-md border border-white/20 text-sm">
          <h3 className="font-medium mb-1">Uplift Analysis</h3>
          <p className="text-muted-foreground">
            The test group showed a significant positive uplift of {conversionRateUplift.toFixed(1)}% in conversion rate
            and {revenueUplift.toFixed(1)}% in revenue compared to the control group, with a confidence level of {test.confidenceLevel || 95}%.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
