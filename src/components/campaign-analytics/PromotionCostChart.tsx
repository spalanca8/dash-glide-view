
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data for the promotion cost chart
const mockData = [
  { month: "Jan", "2022": 120000, "2023": 135000 },
  { month: "Feb", "2022": 110000, "2023": 128000 },
  { month: "Mar", "2022": 150000, "2023": 162000 },
  { month: "Apr", "2022": 145000, "2023": 154000 },
  { month: "May", "2022": 160000, "2023": 175000 },
  { month: "Jun", "2022": 170000, "2023": 185000 },
  { month: "Jul", "2022": 180000, "2023": 195000 },
  { month: "Aug", "2022": 175000, "2023": 190000 },
  { month: "Sep", "2022": 165000, "2023": 180000 },
  { month: "Oct", "2022": 185000, "2023": 205000 },
  { month: "Nov", "2022": 210000, "2023": 230000 },
  { month: "Dec", "2022": 240000, "2023": 270000 },
];

export const PromotionCostChart = () => {
  return (
    <div className="h-80 border rounded-md p-4">
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-1">Promotion Cost Timeseries</h3>
        <p className="text-xs text-muted-foreground">
          Area chart with cohort overlays comparing year-over-year promotion costs
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={mockData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="color2022" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color2023" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `$${value/1000}k`} />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="2022" 
            stroke="#8884d8" 
            fillOpacity={1} 
            fill="url(#color2022)" 
          />
          <Area 
            type="monotone" 
            dataKey="2023" 
            stroke="#82ca9d" 
            fillOpacity={1} 
            fill="url(#color2023)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
