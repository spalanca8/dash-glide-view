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
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" width={40} />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Legend 
            wrapperStyle={{
              paddingTop: '10px'
            }}
          />
          <Bar 
            dataKey="Flash Sale" 
            stackId="a" 
            fill="#4361ee" 
            radius={[0, 4, 4, 0]}
            minPointSize={10}
            barSize={20} // Increased bar thickness
          />
          <Bar 
            dataKey="BOGO" 
            stackId="a" 
            fill="#f72585" 
            radius={[0, 4, 4, 0]}
            minPointSize={10}
            barSize={20} // Increased bar thickness
          />
          <Bar 
            dataKey="% Off" 
            stackId="a" 
            fill="#4cc9f0" 
            radius={[0, 4, 4, 0]}
            minPointSize={10}
            barSize={20} // Increased bar thickness
          />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="flex justify-between mt-4 text-xs text-muted-foreground">
        <div>Campaign intensity: 0 (none) - 100 (high)</div>
      </div>
    </div>
  );
};
