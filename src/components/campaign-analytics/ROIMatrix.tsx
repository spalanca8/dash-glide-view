
import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ZAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ROIMatrixProps {
  channel: string;
}

// Mock data for different channels
const mockData = {
  all: [
    { name: "Summer Sale", spend: 10000, revenue: 40000, roas: 4.0, impressions: 800000 },
    { name: "Back to School", spend: 15000, revenue: 52500, roas: 3.5, impressions: 1200000 },
    { name: "Black Friday", spend: 25000, revenue: 112500, roas: 4.5, impressions: 2000000 },
    { name: "Holiday Special", spend: 20000, revenue: 70000, roas: 3.5, impressions: 1500000 },
    { name: "Winter Sale", spend: 8000, revenue: 24000, roas: 3.0, impressions: 600000 },
    { name: "Spring Collection", spend: 12000, revenue: 42000, roas: 3.5, impressions: 900000 },
    { name: "Flash Sale", spend: 5000, revenue: 22500, roas: 4.5, impressions: 400000 },
    { name: "Loyalty Program", spend: 7000, revenue: 28000, roas: 4.0, impressions: 550000 },
  ],
  social: [
    { name: "FB Summer Campaign", spend: 5000, revenue: 20000, roas: 4.0, impressions: 400000 },
    { name: "IG Back to School", spend: 7500, revenue: 26250, roas: 3.5, impressions: 600000 },
    { name: "TikTok Holiday", spend: 10000, revenue: 45000, roas: 4.5, impressions: 800000 },
    { name: "FB Winter Sale", spend: 4000, revenue: 12000, roas: 3.0, impressions: 300000 },
  ],
  email: [
    { name: "Newsletter Special", spend: 2000, revenue: 9000, roas: 4.5, impressions: 200000 },
    { name: "Abandoned Cart", spend: 1500, revenue: 7500, roas: 5.0, impressions: 150000 },
    { name: "Loyalty Members", spend: 1000, revenue: 5000, roas: 5.0, impressions: 100000 },
  ],
  search: [
    { name: "Brand Keywords", spend: 8000, revenue: 40000, roas: 5.0, impressions: 500000 },
    { name: "Product Keywords", spend: 10000, revenue: 35000, roas: 3.5, impressions: 700000 },
    { name: "Holiday Terms", spend: 7000, revenue: 24500, roas: 3.5, impressions: 450000 },
  ],
  display: [
    { name: "Retargeting", spend: 6000, revenue: 18000, roas: 3.0, impressions: 900000 },
    { name: "Prospecting", spend: 9000, revenue: 22500, roas: 2.5, impressions: 1200000 },
    { name: "Contextual", spend: 5000, revenue: 15000, roas: 3.0, impressions: 800000 },
  ],
};

export const ROIMatrix = ({ channel }: ROIMatrixProps) => {
  const data = mockData[channel as keyof typeof mockData] || mockData.all;

  return (
    <div className="h-96 border rounded-md p-4">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            dataKey="spend" 
            name="Spend" 
            domain={[0, 'dataMax + 5000']} 
            label={{ value: 'Spend ($)', position: 'insideBottom', offset: -10 }} 
            tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
          />
          <YAxis 
            type="number" 
            dataKey="revenue" 
            name="Revenue" 
            domain={[0, 'dataMax + 15000']}
            label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft' }} 
            tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
          />
          <ZAxis 
            type="number" 
            dataKey="impressions" 
            range={[50, 400]} 
            name="Impressions" 
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }} 
            formatter={(value: number, name: string) => {
              if (name === "Spend" || name === "Revenue") {
                return [`$${value.toLocaleString()}`, name];
              }
              return [value.toLocaleString(), name];
            }}
          />
          <Legend />
          <Scatter 
            name="Campaigns" 
            data={data} 
            fill="#8884d8" 
            fillOpacity={0.6}
            shape="circle"
          />
          {/* Reference lines for ROAS values */}
          <line x1={0} y1={0} x2={30000} y2={90000} stroke="#ff7300" strokeWidth={1} strokeDasharray="5 5" />
          <line x1={0} y1={0} x2={30000} y2={120000} stroke="#82ca9d" strokeWidth={1} strokeDasharray="5 5" />
          <line x1={0} y1={0} x2={30000} y2={150000} stroke="#8884d8" strokeWidth={1} strokeDasharray="5 5" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
