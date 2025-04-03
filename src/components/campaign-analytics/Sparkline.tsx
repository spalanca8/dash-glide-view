
import React from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

interface SparklineProps {
  data: number[];
  color?: string;
  decreaseIsGood?: boolean;
}

export const Sparkline = ({ data, color = "#4361ee", decreaseIsGood = false }: SparklineProps) => {
  const sparklineData = data.map((value, index) => ({ value, index }));
  
  const firstValue = data[0];
  const lastValue = data[data.length - 1];
  const isIncreasing = lastValue > firstValue;
  const strokeColor = decreaseIsGood 
    ? (isIncreasing ? "#ef4444" : "#22c55e") 
    : (isIncreasing ? "#22c55e" : "#ef4444");
  
  return (
    <div className="h-12">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sparklineData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color || strokeColor}
            strokeWidth={2}
            dot={false}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
