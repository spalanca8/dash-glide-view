
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Mock data for product category revenue comparison
const productCategoryData = [
  {
    category: "Electronics",
    duringPromotion: 8500000,
    nonPromotion: 5200000,
  },
  {
    category: "Home Goods",
    duringPromotion: 6700000,
    nonPromotion: 4500000,
  },
  {
    category: "Apparel",
    duringPromotion: 5400000,
    nonPromotion: 4200000,
  },
  {
    category: "Beauty",
    duringPromotion: 4800000,
    nonPromotion: 3900000,
  },
  {
    category: "Sporting Goods",
    duringPromotion: 3200000,
    nonPromotion: 2700000,
  }
];

// Chart config
const chartConfig = {
  duringPromotion: {
    label: "During Promotion",
    color: "#f94144"
  },
  nonPromotion: {
    label: "Non-Promotion Period",
    color: "#43aa8b"
  }
};

export const ProductCategoryRevenueChart = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="text-base font-medium mb-1">Product Category Revenue Comparison</h3>
          <p className="text-sm text-muted-foreground">
            Comparing revenue across product categories during promotion vs. non-promotion periods
          </p>
        </div>

        <div className="h-[400px]">
          <ChartContainer className="w-full" style={{ height: 400 }} config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={productCategoryData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="category" 
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
                        if (name === "duringPromotion") return [`$${(Number(value) / 1000000).toFixed(2)}M`, "During Promotion"];
                        if (name === "nonPromotion") return [`$${(Number(value) / 1000000).toFixed(2)}M`, "Non-Promotion Period"];
                        return [value, name];
                      }}
                    />
                  }
                />
                <Legend />
                <Bar 
                  dataKey="duringPromotion" 
                  name="During Promotion" 
                  fill={chartConfig.duringPromotion.color} 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
                <Bar 
                  dataKey="nonPromotion" 
                  name="Non-Promotion Period" 
                  fill={chartConfig.nonPromotion.color} 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1250}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <strong>Insights:</strong> All product categories show higher revenue during promotion periods, 
            with Electronics (+63.5%) and Home Goods (+48.9%) experiencing the most significant revenue lift. 
            The smallest lift is observed in Sporting Goods (+18.5%), suggesting varied effectiveness of 
            promotions across different product categories.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
