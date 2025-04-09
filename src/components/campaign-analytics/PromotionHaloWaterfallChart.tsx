
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Line, ComposedChart } from "recharts";
import { cn } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Data for showing cannibalization rates by time period
const cannibalizationData = [
  {
    name: "Before Promotion",
    promotedProducts: 4200000,
    nonPromotedProducts: 6300000,
    cannibalizationRate: 0,  // No cannibalization before promotion
  },
  {
    name: "During Promotion",
    promotedProducts: 8500000,
    nonPromotedProducts: 10750000,
    cannibalizationRate: 8.3,  // 8.3% cannibalization during promotion
  },
  {
    name: "After Promotion",
    promotedProducts: 4800000,
    nonPromotedProducts: 8200000,
    cannibalizationRate: 3.5,  // 3.5% cannibalization after promotion (residual effect)
  }
];

// Chart config
const chartConfig = {
  promotedProducts: {
    label: "Promoted Products",
    color: "#f94144"
  },
  nonPromotedProducts: {
    label: "Non-Promoted Products",
    color: "#43aa8b"
  },
  cannibalizationRate: {
    label: "Cannibalization Rate",
    color: "#fb8500"
  }
};

export const PromotionHaloWaterfallChart = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="text-base font-medium mb-1">Promotion Cannibalization Rate</h3>
          <p className="text-sm text-muted-foreground">
            Analysis of how promotions affect revenue across product categories and the rate of cannibalization over time
          </p>
        </div>

        <div className="h-[400px]">
          <ChartContainer className="w-full" style={{ height: 400 }} config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={cannibalizationData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={{ stroke: "rgba(0,0,0,0.09)" }}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 15]}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent 
                      formatter={(value, name) => {
                        if (name === "promotedProducts") return [`$${(Number(value) / 1000000).toFixed(2)}M`, "Promoted Products"];
                        if (name === "nonPromotedProducts") return [`$${(Number(value) / 1000000).toFixed(2)}M`, "Non-Promoted Products"];
                        if (name === "cannibalizationRate") return [`${value}%`, "Cannibalization Rate"];
                        return [value, name];
                      }}
                    />
                  }
                />
                <Legend />
                <Bar 
                  dataKey="promotedProducts" 
                  name="Promoted Products" 
                  yAxisId="left"
                  fill={chartConfig.promotedProducts.color} 
                  animationDuration={1000}
                />
                <Bar 
                  dataKey="nonPromotedProducts" 
                  name="Non-Promoted Products" 
                  yAxisId="left"
                  fill={chartConfig.nonPromotedProducts.color} 
                  animationDuration={1250}
                />
                <Line 
                  type="monotone"
                  dataKey="cannibalizationRate" 
                  name="Cannibalization Rate" 
                  yAxisId="right"
                  stroke={chartConfig.cannibalizationRate.color}
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                  animationDuration={1500}
                />
                <ReferenceLine y={5} yAxisId="right" stroke="#ff4d6d" strokeDasharray="3 3" label={{ value: "Threshold", position: "insideTopRight", fill: "#ff4d6d", fontSize: 12 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <strong>Insights:</strong> During promotion periods, we observe an 8.3% cannibalization rate where 
            promoted products take sales away from non-promoted products. However, this effect decreases 
            significantly after the promotion ends, dropping to 3.5%, while overall revenue from both 
            categories remains higher than pre-promotion levels. This suggests that promotions create more 
            total value despite some cannibalization effect.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
