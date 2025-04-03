import React from "react";
import { BarChart, AreaChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";

// Mock data showing average promotional lift pattern from t-4 to t+6
const data = [
  { name: "t-4", baseline: 180000, actual: 222000 },
  { name: "t-3", baseline: 175000, actual: 217000 },
  { name: "t-2", baseline: 185000, actual: 208000 },
  { name: "t-1", baseline: 190000, actual: 205000 },
  { name: "t", baseline: 195000, actual: 300000 }, // Increased peak during promo period
  { name: "t+1", baseline: 200000, actual: 280000 }, // Higher post-promo lift
  { name: "t+2", baseline: 205000, actual: 270000 }, // More gradual decline
  { name: "t+3", baseline: 210000, actual: 220000 },
  { name: "t+4", baseline: 205000, actual: 250000 },
  { name: "t+5", baseline: 200000, actual: 235000 },
  { name: "t+6", baseline: 215000, actual: 260000 },
];

// Calculate total lift
const totalBaseline = data.reduce((sum, item) => sum + item.baseline, 0);
const totalActual = data.reduce((sum, item) => sum + item.actual, 0);
const totalLift = totalActual - totalBaseline;
const liftPercentage = (totalLift / totalBaseline) * 100;

export const PromotionLiftChart = () => {
  const [chartType, setChartType] = React.useState<'area' | 'bar'>('area');
  
  // Transform data to include incremental revenue
  const chartData = data.map(item => ({
    ...item,
    incremental: item.actual - item.baseline
  }));
  
  const toggleChartType = () => {
    setChartType(prev => prev === 'area' ? 'bar' : 'area');
  };

  return (
    <div>
      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-xs text-blue-800">Baseline Revenue</div>
          <div className="text-lg font-semibold text-blue-800">${(totalBaseline / 1000000).toFixed(2)}M</div>
        </div>
        <div className="p-3 bg-blue-100 rounded-lg border border-blue-300">
          <div className="text-xs text-blue-900">Actual Revenue</div>
          <div className="text-lg font-semibold text-blue-900">${(totalActual / 1000000).toFixed(2)}M</div>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-xs text-blue-800">Incremental Lift</div>
          <div className="text-lg font-semibold text-blue-800">
            +${(totalLift / 1000000).toFixed(2)}M ({liftPercentage.toFixed(1)}%)
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-2">
        <button 
          onClick={toggleChartType}
          className="text-sm px-3 py-1 bg-blue-200 rounded-md hover:bg-blue-300 transition-colors text-blue-900"
        >
          Switch to {chartType === 'area' ? 'Bar Chart' : 'Area Chart'}
        </button>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorIncremental" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#475569" />
              <YAxis tickFormatter={(value) => `$${value/1000}k`} stroke="#475569" />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                labelFormatter={(label) => `${label}`}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="baseline" 
                name="Baseline Revenue" 
                stackId="1" 
                stroke="#8884d8" 
                fill="url(#colorBaseline)" 
                fillOpacity={0.8}
              />
              <Area 
                type="monotone" 
                dataKey="incremental" 
                name="Incremental Revenue" 
                stackId="1" 
                stroke="#82ca9d" 
                fill="url(#colorIncremental)" 
                fillOpacity={0.8}
              />
              <ReferenceLine y={0} stroke="#475569" />
              <ReferenceLine 
                x="t" 
                stroke="#ef4444" 
                strokeDasharray="3 3" 
                label={{ 
                  value: 'Promo Period', 
                  position: 'top', 
                  fill: '#ef4444',
                  fontSize: 12
                }}
              />
            </AreaChart>
          ) : (
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#475569" />
              <YAxis tickFormatter={(value) => `$${value/1000}k`} stroke="#475569" />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                labelFormatter={(label) => `${label}`}
              />
              <Legend />
              <Bar 
                dataKey="baseline" 
                name="Baseline Revenue" 
                stackId="1" 
                fill="#8884d8" 
              />
              <Bar 
                dataKey="incremental" 
                name="Incremental Revenue" 
                stackId="1" 
                fill="#82ca9d" 
              />
              <ReferenceLine y={0} stroke="#475569" />
              <ReferenceLine 
                x="t" 
                stroke="#ef4444" 
                strokeDasharray="3 3" 
                label={{ 
                  value: 'Promo Period', 
                  position: 'top', 
                  fill: '#ef4444',
                  fontSize: 12
                }}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
