
import React from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts";

interface CreativeFormatAnalysisProps {
  channel: string;
}

// Mock data for different creative formats
const mockData = {
  all: [
    { name: "Video", value: 45, color: "#4361ee" },
    { name: "Carousel", value: 30, color: "#f72585" },
    { name: "Static", value: 25, color: "#4cc9f0" },
  ],
  social: [
    { name: "Video", value: 55, color: "#4361ee" },
    { name: "Carousel", value: 35, color: "#f72585" },
    { name: "Static", value: 10, color: "#4cc9f0" },
  ],
  email: [
    { name: "Dynamic Content", value: 40, color: "#4361ee" },
    { name: "Static", value: 60, color: "#4cc9f0" },
  ],
  search: [
    { name: "Text", value: 75, color: "#4daf7c" },
    { name: "Dynamic", value: 25, color: "#f9c74f" },
  ],
  display: [
    { name: "Static", value: 40, color: "#4cc9f0" },
    { name: "Animated", value: 35, color: "#f9844a" },
    { name: "Interactive", value: 25, color: "#90be6d" },
  ],
};

export const CreativeFormatAnalysis = ({ channel }: CreativeFormatAnalysisProps) => {
  const data = mockData[channel as keyof typeof mockData] || mockData.all;
  
  return (
    <div className="h-72 border rounded-md p-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Performance by Format</h4>
        <div className="grid grid-cols-3 gap-2">
          {data.map((format, index) => (
            <div key={index} className="border rounded-md p-2">
              <div className="text-xs font-medium">{format.name}</div>
              <div className="text-xs text-muted-foreground">
                CTR: {(Math.random() * 2 + 1).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
