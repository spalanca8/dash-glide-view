
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for promotion effectiveness
const promotionEffectivenessData = [
  {
    type: "Free Shipping",
    effectiveness: 452,
    color: "#8884d8"
  },
  {
    type: "Loyalty",
    effectiveness: 387,
    color: "#9b87f5"
  },
  {
    type: "% Off",
    effectiveness: 321,
    color: "#82ca9d"
  },
  {
    type: "Flash Sale",
    effectiveness: 298,
    color: "#ffc658"
  },
  {
    type: "BOGO",
    effectiveness: 245,
    color: "#ff8042"
  }
].sort((a, b) => b.effectiveness - a.effectiveness); // Sort by descending effectiveness
export const PromotionEffectivenessChart = () => {
  return (
    <div className="mt-8">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="text-base font-medium mb-1">Promotion Effectiveness by Type</h3>
            <p className="text-sm text-muted-foreground">
              Incremental revenue per $100 spent, by promotion type
            </p>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={promotionEffectivenessData}
                margin={{ top: 20, right: 30, left: 40, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="type" 
                  angle={-45} 
                  textAnchor="end" 
                  tick={{ fontSize: 12 }}
                  height={60}
                />
                <YAxis 
                  label={{ 
                    value: 'Revenue per $100 Spent ($)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' } 
                  }} 
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Revenue per $100 Spent']}
                />
                <Legend />
                <Bar 
                  dataKey="effectiveness" 
                  name="Revenue per $100 Spent"
                  radius={[0, 4, 4, 0]}
                  minPointSize={10}
                  barSize={100} // Increased from 20 to 40 for wider bars
                >
                  {promotionEffectivenessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              <strong>Analysis:</strong> Free shipping and loyalty programs deliver the highest 
              return on investment, while BOGO offers generate comparatively less incremental revenue 
              per dollar spent.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
