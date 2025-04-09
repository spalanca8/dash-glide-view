
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for promotion fatigue
const promotionFatigueData = [
  { frequency: 1, lift: 28.6, annotation: "" },
  { frequency: 2, lift: 26.2, annotation: "" },
  { frequency: 3, lift: 22.7, annotation: "" },
  { frequency: 4, lift: 18.5, annotation: "" },
  { frequency: 5, lift: 14.3, annotation: "" },
  { frequency: 6, lift: 10.8, annotation: "First drop-off" },
  { frequency: 7, lift: 9.6, annotation: "" },
  { frequency: 8, lift: 8.7, annotation: "" },
  { frequency: 9, lift: 7.5, annotation: "" },
  { frequency: 10, lift: 6.2, annotation: "" },
  { frequency: 11, lift: 4.8, annotation: "" },
  { frequency: 12, lift: 2.9, annotation: "Second drop-off" },
  { frequency: 13, lift: 2.3, annotation: "" },
  { frequency: 14, lift: 1.9, annotation: "" },
  { frequency: 15, lift: 1.5, annotation: "" },
];

// Define the drop-off points
const dropOffPoints = [
  { x: 6, y: 10.8, label: "First significant drop-off" },
  { x: 12, y: 2.9, label: "Diminishing returns" }
];

export const PromotionFatigueChart = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-sm">
          <p className="font-medium">{`Promotion #${label}`}</p>
          <p className="text-sm">{`Incremental Lift: ${payload[0].value}%`}</p>
          {payload[0].payload.annotation && (
            <p className="text-xs font-medium text-red-500 mt-1">
              {payload[0].payload.annotation}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="text-base font-medium mb-1">Promotion Fatigue Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Decline in incremental lift as customers are exposed to more promotions
          </p>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={promotionFatigueData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="frequency" 
                label={{ 
                  value: 'Number of Promotions', 
                  position: 'insideBottom', 
                  offset: -5 
                }} 
              />
              <YAxis 
                label={{ 
                  value: 'Incremental Lift (%)', 
                  angle: -90, 
                  position: 'insideLeft' 
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {/* Add reference lines for drop-off points */}
              <ReferenceLine x={6} stroke="#ff4d4f" strokeDasharray="3 3" label={{ value: 'First drop-off', position: 'top', fill: '#ff4d4f', fontSize: 12 }} />
              <ReferenceLine x={12} stroke="#ff4d4f" strokeDasharray="3 3" label={{ value: 'Second drop-off', position: 'top', fill: '#ff4d4f', fontSize: 12 }} />
              
              <Line 
                type="monotone" 
                dataKey="lift" 
                name="Incremental Lift"
                stroke="#8884d8" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <strong>Analysis:</strong> Customer response to promotions shows significant fatigue after the 6th promotion, 
            with a severe drop in effectiveness after the 12th exposure. Beyond this point, 
            promotions yield minimal incremental lift, suggesting a need for promotion spacing or 
            diversification strategies.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
