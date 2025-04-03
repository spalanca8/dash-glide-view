
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface CreativeFatigueChartProps {
  channel: string;
}

// Generate mock data for creative fatigue
const generateFatigueData = (initialCTR: number) => {
  const data = [];
  let ctr = initialCTR;
  
  for (let i = 0; i < 10; i++) {
    // CTR decay function with some randomness
    ctr = ctr * (0.9 - Math.random() * 0.05);
    
    data.push({
      impressions: (i + 1) * 100000,
      ctr: Number(ctr.toFixed(2))
    });
  }
  
  return data;
};

// Mock data for different channels
const mockData = {
  all: [
    {
      name: "Campaign A",
      data: generateFatigueData(2.5),
      color: "#4361ee"
    },
    {
      name: "Campaign B",
      data: generateFatigueData(2.1),
      color: "#f72585"
    },
    {
      name: "Campaign C",
      data: generateFatigueData(1.8),
      color: "#4cc9f0"
    }
  ],
  social: [
    {
      name: "Facebook Campaign",
      data: generateFatigueData(1.9),
      color: "#4361ee"
    },
    {
      name: "Instagram Campaign",
      data: generateFatigueData(2.3),
      color: "#f72585"
    }
  ],
  email: [
    {
      name: "Newsletter",
      data: generateFatigueData(3.2),
      color: "#4361ee"
    },
    {
      name: "Promotional",
      data: generateFatigueData(2.7),
      color: "#f72585"
    }
  ],
  search: [
    {
      name: "Brand Campaign",
      data: generateFatigueData(3.5),
      color: "#4361ee"
    },
    {
      name: "Generic Campaign",
      data: generateFatigueData(2.1),
      color: "#f72585"
    }
  ],
  display: [
    {
      name: "Banner Campaign",
      data: generateFatigueData(1.5),
      color: "#4361ee"
    },
    {
      name: "Video Campaign",
      data: generateFatigueData(1.8),
      color: "#f72585"
    }
  ]
};

export const CreativeFatigueChart = ({ channel }: CreativeFatigueChartProps) => {
  const campaigns = mockData[channel as keyof typeof mockData] || mockData.all;
  
  return (
    <div className="h-72 border rounded-md p-4">
      <div className="mb-4">
        <h3 className="text-sm font-medium">CTR Decay Over Impressions</h3>
        <p className="text-xs text-muted-foreground">
          Shows how engagement decreases as audiences see ads multiple times
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height="75%">
        <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number"
            dataKey="impressions" 
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} 
            domain={['auto', 'auto']} 
            label={{ value: 'Impressions', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            label={{ value: 'CTR (%)', angle: -90, position: 'insideLeft' }}
            domain={[0, 'auto']} 
          />
          <Tooltip 
            formatter={(value: number) => `${value}%`}
            labelFormatter={(label) => `${(label / 1000).toFixed(0)}k impressions`}
          />
          <Legend />
          
          {campaigns.map((campaign, index) => (
            <Line 
              key={index}
              type="monotone" 
              data={campaign.data}
              name={campaign.name}
              dataKey="ctr" 
              stroke={campaign.color} 
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
