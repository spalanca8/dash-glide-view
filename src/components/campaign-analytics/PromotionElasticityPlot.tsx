
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Legend, Label } from "recharts";

// Mock data for the promotion elasticity scatter plot
const generateElasticityData = () => {
  const data = [];
  
  // Generate data for different promotion types
  const promotionTypes = ["Flash Sale", "BOGO", "% Off", "Free Shipping", "Bundle Discount"];
  
  for (let i = 0; i < 25; i++) {
    const promoType = promotionTypes[Math.floor(Math.random() * promotionTypes.length)];
    // Create correlation between x and y with some noise
    const xValue = Math.random() * 50; // % change in promotion depth/spend
    // Base elasticity around 1.5 with some variance by promotion type
    let elasticityFactor = 1.5;
    if (promoType === "Flash Sale") elasticityFactor = 1.8;
    if (promoType === "BOGO") elasticityFactor = 1.3;
    if (promoType === "% Off") elasticityFactor = 1.6;
    
    // Add noise to create scatter effect while maintaining positive correlation
    const noise = (Math.random() - 0.5) * 20;
    const yValue = xValue * elasticityFactor + noise;
    
    data.push({
      x: parseFloat(xValue.toFixed(1)),
      y: parseFloat(Math.max(0, yValue).toFixed(1)),
      name: `Promotion ${i + 1}`,
      type: promoType
    });
  }
  
  return data;
};

const elasticityData = generateElasticityData();

// Calculate linear regression for trendline
const calculateTrendline = (data: any[]) => {
  const n = data.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  
  data.forEach(item => {
    sumX += item.x;
    sumY += item.y;
    sumXY += item.x * item.y;
    sumX2 += item.x * item.x;
  });
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  return { slope, intercept };
};

const elasticityTrendline = calculateTrendline(elasticityData);

// Generate trendline points
const trendlineData = [
  { x: 0, y: elasticityTrendline.intercept },
  { x: 50, y: 50 * elasticityTrendline.slope + elasticityTrendline.intercept }
];

// Color mapping for promotion types
const promotionColors: Record<string, string> = {
  "Flash Sale": "#4361ee",
  "BOGO": "#f72585",
  "% Off": "#4cc9f0",
  "Free Shipping": "#7209b7",
  "Bundle Discount": "#fb8500"
};

export const PromotionElasticityPlot = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg">Promotion Elasticity Analysis</CardTitle>
        <CardDescription>
          Relationship between promotion investment and incremental revenue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 30,
                left: 40,
                bottom: 40,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="% Change in Promotion Depth/Spend" 
                domain={[0, 'dataMax']}
                tickCount={6}
              >
                <Label 
                  value="% Change in Promotion Depth/Spend" 
                  position="bottom" 
                  offset={-10}
                  style={{ textAnchor: 'middle', fontSize: 12, fill: '#666' }}
                />
              </XAxis>
              <YAxis 
                type="number" 
                dataKey="y" 
                name="% Change in Incremental Revenue" 
                domain={[0, 'dataMax']}
                tickCount={6}
              >
                <Label 
                  value="% Change in Incremental Revenue" 
                  angle={-90} 
                  position="left" 
                  offset={-25}
                  style={{ textAnchor: 'middle', fontSize: 12, fill: '#666' }}
                />
              </YAxis>
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value: number) => [`${value.toFixed(1)}%`, '']}
                labelFormatter={(label: string) => `Promotion: ${label}`}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                formatter={(value: string) => value.replace('scatter', 'Promotions')}
              />
              
              {/* Trendline */}
              <ReferenceLine
                segment={trendlineData.map(point => ({ x: point.x, y: point.y }))}
                stroke="#ff0000"
                strokeWidth={2}
                strokeDasharray="5 5"
                ifOverflow="extendDomain"
              />
              
              {/* Elasticity value text */}
              <ReferenceLine
                x={40}
                y={40 * elasticityTrendline.slope + elasticityTrendline.intercept + 5}
                segment={[{ x: 40, y: 40 * elasticityTrendline.slope + elasticityTrendline.intercept + 5 }]}
                stroke="transparent"
                label={{ 
                  value: `Elasticity: ${elasticityTrendline.slope.toFixed(2)}`, 
                  fill: 'red',
                  fontSize: 12,
                  fontWeight: 'bold',
                  position: 'right'
                }}
              />
              
              {/* Scatter points */}
              <Scatter 
                name="scatter" 
                data={elasticityData} 
                fill="#8884d8"
                shape={(props: any) => {
                  const { cx, cy, payload } = props;
                  const color = promotionColors[payload.type] || "#8884d8";
                  return (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={6} 
                      fill={color} 
                      stroke="#fff"
                      strokeWidth={1}
                    />
                  );
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Elasticity Interpretation:</strong> A value of {elasticityTrendline.slope.toFixed(2)} means that for every 1% increase in promotional investment, there is approximately a {elasticityTrendline.slope.toFixed(2)}% increase in incremental revenue.</p>
          <p className="mt-1"><strong>Bubble Color:</strong> Different colors represent different promotion types (Flash Sales, BOGO, % Off, etc.)</p>
        </div>
      </CardContent>
    </Card>
  );
};
