import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";

// Mock data for the efficiency ratio histogram
const data = [
  { range: "$0-1", count: 2 },
  { range: "$1-2", count: 5 },
  { range: "$2-3", count: 8 },
  { range: "$3-4", count: 12 },
  { range: "$4-5", count: 15 },
  { range: "$5-6", count: 10 },
  { range: "$6-7", count: 6 },
  { range: "$7-8", count: 4 },
  { range: "$8-9", count: 2 },
  { range: "$9-10", count: 1 },
];

// Calculate average efficiency ratio
const totalCampaigns = data.reduce((sum, item) => sum + item.count, 0);
const weightedSum = data.reduce((sum, item) => {
  const midpoint = (parseInt(item.range.substring(1, 2)) + parseInt(item.range.substring(3, 4))) / 2;
  return sum + (midpoint * item.count);
}, 0);
const averageRatio = weightedSum / totalCampaigns;
export const EfficiencyRatioChart = () => {
  return (
    <div className="h-[400px] border rounded-md p-4">
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-1">Promotion Efficiency Ratio</h3>
        <p className="text-xs text-muted-foreground">
          Revenue per $1 spent histogram
        </p>
      </div>
      
      <div className="text-sm font-medium mb-2">
        Average Ratio: ${averageRatio.toFixed(2)} Revenue per $1 Spent
      </div>
      
      <ResponsiveContainer width="105%" height="80%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          barGap={0}
          barCategoryGap={10}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="range" />
          <YAxis label={{ value: 'Number of Campaigns', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Bar 
            dataKey="count" 
            fill="#8884d8" 
            name="Campaigns"
            radius={[0, 4, 4, 0]}
            minPointSize={10}
            barSize={20}
          />
          <ReferenceLine x={`$${Math.floor(averageRatio)}-${Math.ceil(averageRatio)}`} stroke="red" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
