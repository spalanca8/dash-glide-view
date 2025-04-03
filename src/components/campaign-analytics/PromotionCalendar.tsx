
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data for the promotion calendar
const generatePromotionData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  return months.map(month => {
    return {
      name: month,
      "Flash Sale": Math.random() > 0.5 ? Math.floor(Math.random() * 100) : 0,
      "BOGO": Math.random() > 0.6 ? Math.floor(Math.random() * 100) : 0,
      "% Off": Math.random() > 0.4 ? Math.floor(Math.random() * 100) : 0,
    };
  });
};

const data = generatePromotionData();

export const PromotionCalendar = () => {
  return (
    <div className="h-96 border rounded-md p-4">
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-1">Promotion Schedule</h3>
        <p className="text-xs text-muted-foreground">
          Gantt chart of active campaigns throughout the year
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barGap={0}
          barCategoryGap={10}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Flash Sale" stackId="a" fill="#4361ee" />
          <Bar dataKey="BOGO" stackId="a" fill="#f72585" />
          <Bar dataKey="% Off" stackId="a" fill="#4cc9f0" />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="flex justify-between mt-4 text-xs text-muted-foreground">
        <div>Campaign intensity: 0 (none) - 100 (high)</div>
      </div>
    </div>
  );
};
