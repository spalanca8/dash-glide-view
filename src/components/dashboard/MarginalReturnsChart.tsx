
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
  ReferenceLine
} from "recharts";
import { cn } from "@/lib/utils";

interface MarginalReturnsChartProps {
  data: any[];
  height?: number;
  customDot?: React.ReactNode;
}

export function MarginalReturnsChart({
  data,
  height = 350,
  customDot
}: MarginalReturnsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 10
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
        <XAxis
          dataKey="spend"
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          label={{ value: "Media Spend ($)", position: "insideBottom", offset: -5 }}
        />
        <YAxis yAxisId="left" label={{ value: "Return on Ad Spend (ROAS)", angle: -90, position: "insideLeft" }} />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip
          formatter={(value, name) => {
            if (value === undefined || value === null) return ["N/A", ""];
            
            switch (name) {
              case "returns":
                return [`${value}x`, "Average ROAS"];
              case "marginal":
                return [`${value}x`, "Marginal ROAS"];
              default:
                return [value, name];
            }
          }}
          labelFormatter={(value) => {
            if (value === undefined || value === null) return "Spend: N/A";
            return `Spend: $${Number(value).toLocaleString()}`;
          }}
        />
        <Legend />
        
        {/* Profitability threshold line */}
        <ReferenceLine y={1} yAxisId="right" stroke="#ff0000" strokeDasharray="3 3" />
        
        <Line
          name="Average ROAS"
          type="monotone"
          dataKey="returns"
          stroke="#4361ee"
          strokeWidth={2}
          yAxisId="left"
          dot={false}
        />
        <Line
          name="Marginal ROAS"
          type="monotone"
          dataKey="marginal"
          stroke="#f72585"
          strokeWidth={2}
          yAxisId="right"
          dot={customDot ? {} : false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
