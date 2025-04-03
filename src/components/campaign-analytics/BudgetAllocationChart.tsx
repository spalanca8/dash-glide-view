
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface BudgetAllocationChartProps {
  channel: string;
}

// Mock data for different channels
const mockData = {
  all: [
    { name: "Allocated Budget", value: 100000 },
    { name: "Actual Spend", value: 95000 },
    { name: "Remaining", value: 5000 },
  ],
  social: [
    { name: "Allocated Budget", value: 40000 },
    { name: "Actual Spend", value: 38500 },
    { name: "Remaining", value: 1500 },
  ],
  email: [
    { name: "Allocated Budget", value: 15000 },
    { name: "Actual Spend", value: 12000 },
    { name: "Remaining", value: 3000 },
  ],
  search: [
    { name: "Allocated Budget", value: 30000 },
    { name: "Actual Spend", value: 32000 },
    { name: "Remaining", value: -2000 },
  ],
  display: [
    { name: "Allocated Budget", value: 15000 },
    { name: "Actual Spend", value: 12500 },
    { name: "Remaining", value: 2500 },
  ],
};

const COLORS = ["#4361ee", "#f72585", "#A0A0A0"];

export const BudgetAllocationChart = ({ channel }: BudgetAllocationChartProps) => {
  const data = mockData[channel as keyof typeof mockData] || mockData.all;
  
  return (
    <div className="h-72 border rounded-md p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div>
          <h4 className="text-sm font-medium mb-4">Budget Allocation</h4>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={[
                  { name: "Allocated", value: data[0].value },
                  { name: "Remaining", value: data[2].value > 0 ? data[2].value : 0 }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="#4361ee" />
                <Cell fill="#F3F4F6" />
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-4">Budget Breakdown</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Budget:</span>
              <span className="text-sm font-medium">${data[0].value.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Spent:</span>
              <span className="text-sm font-medium">${data[1].value.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Remaining:</span>
              <span className={`text-sm font-medium ${data[2].value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(data[2].value).toLocaleString()} 
                {data[2].value < 0 && ' (Overspent)'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Spend Rate:</span>
              <span className="text-sm font-medium">
                {Math.round((data[1].value / data[0].value) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
