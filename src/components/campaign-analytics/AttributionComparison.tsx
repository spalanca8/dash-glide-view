
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts";

const attributionData = [
  { 
    model: "Last Click", 
    search: 40, 
    social: 15, 
    display: 5, 
    email: 25, 
    direct: 15 
  },
  { 
    model: "First Click", 
    search: 30, 
    social: 25, 
    display: 20, 
    email: 15, 
    direct: 10 
  },
  { 
    model: "Linear", 
    search: 32, 
    social: 20, 
    display: 15, 
    email: 18, 
    direct: 15 
  },
  { 
    model: "Time Decay", 
    search: 35, 
    social: 18, 
    display: 10, 
    email: 22, 
    direct: 15 
  },
  { 
    model: "U-Shaped", 
    search: 33, 
    social: 22, 
    display: 12, 
    email: 18, 
    direct: 15 
  },
];

export const AttributionComparison = () => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="font-medium mb-1">Multi-touch Attribution Model Comparison</h3>
        <p className="text-sm text-muted-foreground">
          Comparing how different attribution models allocate credit to channels
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={attributionData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="model" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="search" stackId="a" fill="#4361ee" name="Search" />
            <Bar dataKey="social" stackId="a" fill="#8b5cf6" name="Social" />
            <Bar dataKey="display" stackId="a" fill="#ec4899" name="Display" />
            <Bar dataKey="email" stackId="a" fill="#f97316" name="Email" />
            <Bar dataKey="direct" stackId="a" fill="#10b981" name="Direct" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
