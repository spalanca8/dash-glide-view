
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data for promotion type comparison
const data = [
  {
    name: "Flash Sale",
    revenue: 1200000,
    cost: 350000,
    roas: 3.43,
  },
  {
    name: "BOGO",
    revenue: 980000,
    cost: 420000,
    roas: 2.33,
  },
  {
    name: "% Off",
    revenue: 1450000,
    cost: 520000,
    roas: 2.79,
  },
  {
    name: "Free Shipping",
    revenue: 720000,
    cost: 180000,
    roas: 4.00,
  },
  {
    name: "Loyalty",
    revenue: 850000,
    cost: 230000,
    roas: 3.70,
  },
];

export const PromotionTypeChart = () => {
  return (
    <div className="h-72 border rounded-md p-4">
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-1">Promotion Type Breakdown</h3>
        <p className="text-xs text-muted-foreground">
          Comparison of different promotion types by revenue and ROAS
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height="75%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip 
            formatter={(value, name) => {
              if (name === "revenue") return [`$${value.toLocaleString()}`, "Revenue"];
              if (name === "cost") return [`$${value.toLocaleString()}`, "Cost"];
              if (name === "roas") {
                // Safely handle the value by ensuring it's a number before using toFixed
                const numValue = typeof value === 'number' ? value : parseFloat(String(value));
                return [isNaN(numValue) ? value : `${numValue.toFixed(2)}x`, "ROAS"];
              }
              return [value, name];
            }}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#8884d8" />
          <Bar yAxisId="left" dataKey="cost" name="Cost" fill="#82ca9d" />
          <Bar yAxisId="right" dataKey="roas" name="ROAS" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
