
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
  ReferenceLine,
  ReferenceArea,
  Label
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";

// Generate mock data for promotion saturation curve
const generateSaturationData = () => {
  const data = [];
  
  // Starting with strong returns that gradually diminish
  const diminishingPoint = 65000; // Point where returns start diminishing significantly
  
  for (let spend = 10000; spend <= 100000; spend += 5000) {
    let revenue;
    
    if (spend < diminishingPoint) {
      // Linear growth with slight curve before diminishing point
      revenue = spend * 2.5 * (1 - (spend / (diminishingPoint * 2.5)));
    } else {
      // Diminishing returns after the threshold
      const excessSpend = spend - diminishingPoint;
      revenue = diminishingPoint * 1.8 + (excessSpend * 0.8 * Math.exp(-excessSpend / 40000));
    }
    
    data.push({
      spend,
      revenue: Math.round(revenue),
      roi: +(revenue / spend).toFixed(2)
    });
  }
  
  return data;
};

const saturationData = generateSaturationData();

// Find the optimal point (where ROI starts decreasing significantly)
const findDiminishingPoint = (data) => {
  let maxRoi = 0;
  let diminishingIndex = 0;
  
  for (let i = 0; i < data.length; i++) {
    if (data[i].roi > maxRoi) {
      maxRoi = data[i].roi;
    } else if (data[i].roi < maxRoi * 0.8) {
      // When ROI drops to 80% of max, consider it diminishing
      diminishingIndex = i;
      break;
    }
  }
  
  return data[diminishingIndex > 0 ? diminishingIndex - 1 : 0];
};

const diminishingPoint = findDiminishingPoint(saturationData);

export const PromotionSaturationChart = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-primary" /> 
          Promotion Saturation Curve
        </CardTitle>
        <CardDescription>
          Visualizing the point of diminishing returns for promotional spend
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={saturationData}
              margin={{
                top: 20,
                right: 30,
                left: 40,
                bottom: 40,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="spend" 
                tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
              >
                <Label 
                  value="Promotion Spend" 
                  position="bottom" 
                  offset={-10}
                  style={{ textAnchor: 'middle', fontSize: 12, fill: '#666' }}
                />
              </XAxis>
              <YAxis 
                tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
              >
                <Label 
                  value="Incremental Revenue" 
                  angle={-90} 
                  position="left" 
                  offset={-25}
                  style={{ textAnchor: 'middle', fontSize: 12, fill: '#666' }}
                />
              </YAxis>
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                labelFormatter={(label) => `Spend: $${Number(label).toLocaleString()}`}
              />
              <Legend />
              
              {/* Highlight area of diminishing returns */}
              <ReferenceArea 
                x1={diminishingPoint.spend} 
                x2={saturationData[saturationData.length-1].spend}
                y1={0}
                y2={saturationData[saturationData.length-1].revenue}
                fill="#ffcccc"
                fillOpacity={0.2}
              />
              
              {/* Reference line for the optimal point */}
              <ReferenceLine
                x={diminishingPoint.spend}
                stroke="#ff0000"
                strokeWidth={2}
                strokeDasharray="5 5"
                label={{
                  value: 'Optimal Spend',
                  position: 'top',
                  fill: '#ff0000',
                  fontSize: 12
                }}
              />
              
              <Line
                type="monotone"
                dataKey="revenue"
                name="Incremental Revenue"
                stroke="#4361ee"
                strokeWidth={3}
                dot={{ stroke: '#4361ee', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Optimal Promotion Spend:</strong> ${diminishingPoint.spend.toLocaleString()} with a return of ${diminishingPoint.revenue.toLocaleString()} (ROI: {diminishingPoint.roi}x)</p>
          <p className="mt-1"><strong>Interpretation:</strong> After the optimal spend point (red dashed line), each additional dollar spent generates diminishing incremental revenue (pink area).</p>
        </div>
      </CardContent>
    </Card>
  );
};
