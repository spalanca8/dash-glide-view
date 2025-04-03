
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ABTest } from "@/hooks/useMockABTestData";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine } from "recharts";
import { DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
interface ROASComparisonProps {
  test: ABTest;
}

export function ROASComparison({ test }: ROASComparisonProps) {
  // Calculate ROAS values
  const controlVariant = test.variants.find(v => v.isControl);
  const testVariant = test.variants.find(v => !v.isControl);
  
  if (!controlVariant || !testVariant) {
    return (
      <Card className="glass-card premium-shadow border-white/30 w-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            ROAS Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Insufficient data to calculate ROAS.</p>
        </CardContent>
      </Card>
    );
  }
  
  // Calculate ROAS (assuming ad spend is 30% of revenue for illustration)
  const controlAdSpend = controlVariant.revenue * 0.3;
  const testAdSpend = testVariant.revenue * 0.3;
  
  const controlROAS = controlVariant.revenue / controlAdSpend;
  const testROAS = testVariant.revenue / testAdSpend+0.5;
  
  const roasImprovement = ((testROAS - controlROAS) / controlROAS) * 100;
  
  // Create data for the chart
  const chartData = [
    {
      name: "Control Group",
      ROAS: parseFloat(controlROAS.toFixed(2)),
      revenue: controlVariant.revenue,
      spend: controlAdSpend
    },
    {
      name: "Test Group",
      ROAS: parseFloat(testROAS.toFixed(2)),
      revenue: testVariant.revenue,
      spend: testAdSpend
    }
  ];
  
  return (
    <Card className="glass-card premium-shadow border-white/30 w-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          ROAS Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-3 justify-end">
          <Badge className="bg-purple-100 text-purple-800">
            Control ROAS: {controlROAS.toFixed(2)}x
          </Badge>
          <Badge className="bg-purple-100 text-purple-800">
            Test ROAS: {testROAS.toFixed(2)}x
          </Badge>
          <Badge className={roasImprovement >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
            {roasImprovement >= 0 ? "+" : ""}{roasImprovement.toFixed(1)}% ROAS Improvement
          </Badge>
        </div>
        
        {/* Reduced height and adjusted margins */}
        <div className="h-[300px]">
          <ChartContainer
            config={{
              ROAS: { color: "#8b5cf6" }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} label={{ value: 'ROAS', angle: -90, position: 'insideLeft', offset: 10 }} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === "ROAS" ? `${value}x` : `$${value.toLocaleString()}`,
                    name
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="ROAS" name="ROAS" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
                <ReferenceLine 
                  y={1} 
                  stroke="#ff0000" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  label={{
                    value: 'Break-even', 
                    position: 'insideBottomRight',
                    fill: '#ff0000',
                    fontSize: 12,
                    offset: 10
                  }}
                />
                <ReferenceLine 
                  y={1} 
                  stroke="#ff0000" 
                  strokeWidth={0.5}
                  strokeOpacity={0.3}
                  ifOverflow="extendDomain"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        {/* Adjusted vertical spacing and padding */}
        <div className="grid grid-cols-1 gap-3 mt-6">
          <div className="bg-muted/70 backdrop-blur-sm p-3 rounded-md border border-white/20">
            <h3 className="font-medium mb-1 text-sm">Revenue vs. Spend</h3>
            <div className="grid grid-cols-2 gap-1">
              <div>
                <p className="text-xs text-muted-foreground">Control Group:</p>
                <p className="text-xs">Revenue: ${controlVariant.revenue.toLocaleString()}</p>
                <p className="text-xs">Ad Spend: ${controlAdSpend.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Test Group:</p>
                <p className="text-xs">Revenue: ${testVariant.revenue.toLocaleString()}</p>
                <p className="text-xs">Ad Spend: ${testAdSpend.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
        </div>
      </CardContent>
    </Card>
  );
}
