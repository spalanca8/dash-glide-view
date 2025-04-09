
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Data for showing promotion halo effect by time period
const haloEffectTimeData = [
  {
    name: "Before Promotion",
    promotedProducts: 4200000,
    nonPromotedProducts: 6300000,
  },
  {
    name: "During Promotion",
    promotedProducts: 8500000,
    nonPromotedProducts: 10750000,
  },
  {
    name: "After Promotion",
    promotedProducts: 4800000,
    nonPromotedProducts: 8200000,
  }
];

// Chart config for the stacked bar chart
const chartConfig = {
  promotedProducts: {
    label: "Promoted Products",
    color: "#f94144"
  },
  nonPromotedProducts: {
    label: "Non-Promoted Products",
    color: "#43aa8b"
  }
};

export const PromotionHaloWaterfallChart = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="text-base font-medium mb-1">Promotion Halo Effects - Revenue Breakdown</h3>
          <p className="text-sm text-muted-foreground">
            Comparison of revenue from promoted vs. non-promoted products before, during, and after promotions
          </p>
        </div>

        <div className="h-[400px]">
          <ChartContainer className="w-full" style={{ height: 400 }} config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={haloEffectTimeData}
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
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent 
                      formatter={(value, name) => {
                        if (name === "promotedProducts") name = "Promoted Products";
                        if (name === "nonPromotedProducts") name = "Non-Promoted Products";
                        return [`$${(Number(value) / 1000000).toFixed(2)}M`, name];
                      }}
                    />
                  }
                />
                <Legend />
                <Bar 
                  dataKey="promotedProducts" 
                  name="Promoted Products" 
                  stackId="a" 
                  fill={chartConfig.promotedProducts.color} 
                  animationDuration={1000}
                />
                <Bar 
                  dataKey="nonPromotedProducts" 
                  name="Non-Promoted Products" 
                  stackId="a" 
                  fill={chartConfig.nonPromotedProducts.color} 
                  animationDuration={1250}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <strong>Insights:</strong> During promotion periods, revenue from both promoted and non-promoted products 
            increases significantly. The halo effect continues even after the promotion ends, with non-promoted 
            products maintaining higher revenue levels compared to pre-promotion periods. This demonstrates that 
            promotions create lasting value beyond their direct, immediate impact.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
