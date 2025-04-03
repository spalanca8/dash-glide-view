
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface AudienceSegmentChartProps {
  channel: string;
}

const mockData = {
  all: [
    { segment: "High LTV", search: 420000, social: 280000, email: 190000, display: 110000 },
    { segment: "Medium LTV", search: 310000, social: 220000, email: 130000, display: 90000 },
    { segment: "Low LTV", search: 170000, social: 120000, email: 80000, display: 70000 },
  ],
  social: [
    { segment: "High LTV", facebook: 150000, instagram: 90000, twitter: 40000 },
    { segment: "Medium LTV", facebook: 110000, instagram: 70000, twitter: 40000 },
    { segment: "Low LTV", facebook: 60000, instagram: 40000, twitter: 20000 },
  ],
  email: [
    { segment: "High LTV", newsletter: 100000, promotional: 60000, transactional: 30000 },
    { segment: "Medium LTV", newsletter: 70000, promotional: 40000, transactional: 20000 },
    { segment: "Low LTV", newsletter: 40000, promotional: 30000, transactional: 10000 },
  ],
  search: [
    { segment: "High LTV", brand: 220000, nonBrand: 150000, product: 50000 },
    { segment: "Medium LTV", brand: 170000, nonBrand: 100000, product: 40000 },
    { segment: "Low LTV", brand: 90000, nonBrand: 60000, product: 20000 },
  ],
  display: [
    { segment: "High LTV", retargeting: 70000, prospecting: 30000, contextual: 10000 },
    { segment: "Medium LTV", retargeting: 50000, prospecting: 30000, contextual: 10000 },
    { segment: "Low LTV", retargeting: 40000, prospecting: 20000, contextual: 10000 },
  ],
};

export const AudienceSegmentChart = ({ channel }: AudienceSegmentChartProps) => {
  const data = mockData[channel as keyof typeof mockData] || mockData.all;
  
  // Dynamically determine which keys to use for bars based on the data
  const barKeys = Object.keys(data[0]).filter(key => key !== 'segment');
  
  const colors = [
    "#4361ee", "#3f37c9", "#4cc9f0", // blues
    "#f72585", "#b5179e", "#7209b7", // purples
    "#ffbe0b", "#fb5607", "#ff006e", // warm colors
  ];

  return (
    <div className="h-72 border rounded-md p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="segment" />
          <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
          <Tooltip 
            formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            labelFormatter={(label) => `${label} Segment`}
          />
          <Legend />
          {barKeys.map((key, index) => (
            <Bar 
              key={key} 
              dataKey={key} 
              stackId="a" 
              fill={colors[index % colors.length]} 
              name={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
