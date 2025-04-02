
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
      <Card className="glass-card premium-shadow border-white/30">
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
  const testROAS = testVariant.revenue / testAdSpend;
  
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
    <Card className="glass-card premium-shadow border-white/30">
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
        
        <div className="h-[300px]">
          <ChartContainer
            config={{
              ROAS: { color: "#8b5cf6" }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'ROAS', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === "ROAS" ? `${value}x` : `$${value.toLocaleString()}`,
                    name
                  ]}
                />
                <Legend />
                <Bar dataKey="ROAS" name="ROAS" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <ReferenceLine y={1} stroke="#ff0000" strokeDasharray="3 3" label="Break-even" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-muted/70 backdrop-blur-sm p-4 rounded-md border border-white/20">
            <h3 className="font-medium mb-2">Revenue vs. Spend</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-muted-foreground">Control Group:</p>
                <p className="text-sm">Revenue: ${controlVariant.revenue.toLocaleString()}</p>
                <p className="text-sm">Ad Spend: ${controlAdSpend.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Test Group:</p>
                <p className="text-sm">Revenue: ${testVariant.revenue.toLocaleString()}</p>
                <p className="text-sm">Ad Spend: ${testAdSpend.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/70 backdrop-blur-sm p-4 rounded-md border border-white/20">
            <h3 className="font-medium mb-2">ROAS Interpretation</h3>
            <p className="text-sm text-muted-foreground">
              The test group achieved a ROAS of {testROAS.toFixed(2)}x, representing a {roasImprovement.toFixed(1)}% 
              {roasImprovement >= 0 ? " improvement" : " decrease"} compared to the control group's ROAS of {controlROAS.toFixed(2)}x.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
