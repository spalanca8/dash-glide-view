
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from "recharts";

interface ChannelImpressionsCostChartProps {
  channelId: string;
  data: any[];
  color: string;
}

export function ChannelImpressionsCostChart({ 
  channelId, 
  data, 
  color 
}: ChannelImpressionsCostChartProps) {
  // Transform data to include impressions, cost and revenue for this channel
  const chartData = data.map((item, index) => {
    const value = item[channelId] || 0;
    // Generate impressions as a function of value with some variability
    const impressions = Math.round(value * (5 + Math.random() * 2));
    // Calculate cost as a portion of value
    const cost = Math.round(value * (0.3 + Math.random() * 0.2));
    // Revenue is the original value
    const revenue = value;
    
    return {
      name: item.name,
      impressions: impressions,
      cost: cost,
      revenue: revenue,
    };
  });

  return (
    <div className="w-full" style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }} 
            tickLine={false}
          />
          <YAxis 
            yAxisId="left"
            orientation="left" 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
            label={{ 
              value: 'Impressions', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' },
              offset: -5
            }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right" 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
            label={{ 
              value: 'Amount ($)', 
              angle: 90, 
              position: 'insideRight',
              style: { textAnchor: 'middle' },
              offset: 0
            }}
          />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'cost' || name === 'revenue') return [`$${value}`, name.charAt(0).toUpperCase() + name.slice(1)];
              return [value.toLocaleString(), 'Impressions'];
            }}
          />
          <Legend />
          <Bar 
            yAxisId="left"
            dataKey="impressions" 
            fill={color} 
            fillOpacity={0.6}
            name="Impressions" 
            barSize={20}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="cost" 
            stroke="#ef476f" 
            strokeWidth={2}
            name="Cost" 
            dot={{ fill: '#ef476f', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="revenue" 
            stroke="#4361ee" 
            strokeWidth={2}
            name="Revenue" 
            dot={{ fill: '#4361ee', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
