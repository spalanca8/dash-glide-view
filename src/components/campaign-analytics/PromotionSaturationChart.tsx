
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
  Label,
  Scatter
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";

// Generate mock data for promotion saturation curve with discount percentages instead of spend
const generateSaturationData = () => {
  const data = [];
  
  // Constants for the S-curve shape
  const minDiscount = 5; // 5% discount
  const maxDiscount = 50; // 50% discount
  const step = 1; // 1% step
  const midpoint = 25; // Where the curve inflection occurs
  const steepness = 0.2; // Controls the steepness of the curve
  const maxRevenue = 50000; // Maximum revenue at full saturation
  
  for (let discount = minDiscount; discount <= maxDiscount; discount += step) {
    // S-curve formula (logistic function) with adjusted parameters
    let revenue = maxRevenue / (1 + Math.exp(-steepness * (discount - midpoint)));
    
    // Add slight noise for data points (optional)
    const noise = discount > 15 && discount < 40 ? (Math.random() * 0.05 - 0.025) * revenue : 0;
    revenue = revenue + noise;
    
    // Calculate ROI (different calculation for discount-based ROI)
    const roi = revenue / (revenue * (discount / 100));
    
    data.push({
      discount,
      revenue: Math.round(revenue),
      roi: +roi.toFixed(2)
    });
  }
  
  return data;
};

const saturationData = generateSaturationData();

// Find the marginal point (max slope - steepest part of curve)
const findMarginalPoint = (data) => {
  let maxSlope = 0;
  let marginalIndex = 0;
  
  for (let i = 1; i < data.length; i++) {
    const slope = (data[i].revenue - data[i-1].revenue) / (data[i].discount - data[i-1].discount);
    if (slope > maxSlope) {
      maxSlope = slope;
      marginalIndex = i;
    }
  }
  
  return data[marginalIndex];
};

// Find the most efficient point (highest ROI)
const findEfficientPoint = (data) => {
  let maxRoi = 0;
  let efficientIndex = 0;
  
  for (let i = 0; i < data.length; i++) {
    if (data[i].roi > maxRoi) {
      maxRoi = data[i].roi;
      efficientIndex = i;
    }
  }
  
  return data[efficientIndex];
};

// Find the point of diminishing returns
const findDiminishingPoint = (data) => {
  // Find where the second derivative changes sign (inflection point)
  let diminishingIndex = 0;
  
  // Calculate point where the curve starts to flatten
  for (let i = 2; i < data.length; i++) {
    const firstDeriv1 = (data[i-1].revenue - data[i-2].revenue) / (data[i-1].discount - data[i-2].discount);
    const firstDeriv2 = (data[i].revenue - data[i-1].revenue) / (data[i].discount - data[i-1].discount);
    
    // When the rate of change starts significantly decreasing
    if (firstDeriv2 < firstDeriv1 * 0.7 && data[i].discount > 30) {
      diminishingIndex = i;
      break;
    }
  }
  
  return data[diminishingIndex > 0 ? diminishingIndex : data.length - 1];
};

// Find saturation point (where the curve becomes almost flat)
const findSaturationPoint = (data) => {
  // Find where the curve becomes very flat (very small slope)
  for (let i = data.length - 2; i >= 0; i--) {
    const slope = (data[i+1].revenue - data[i].revenue) / (data[i+1].discount - data[i].discount);
    if (slope > 0.1) { // threshold for "flat enough"
      return data[i+1];
    }
  }
  return data[data.length - 1]; // Default to last point if no clear saturation
};

const marginalPoint = findMarginalPoint(saturationData);
const efficientPoint = findEfficientPoint(saturationData);
const diminishingPoint = findDiminishingPoint(saturationData);
const saturationPoint = findSaturationPoint(saturationData);

// Create key points array for scatter plot markers
const keyPoints = [
  { ...efficientPoint, label: "Most efficient" },
  { ...marginalPoint, label: "Max Marginal" },
  { ...diminishingPoint, label: "Point of diminishing return" },
  { ...saturationPoint, label: "Saturation" },
];

export const PromotionSaturationChart = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-primary" /> 
          Promotion Saturation Curve
        </CardTitle>
        <CardDescription>
          Visualizing the point of diminishing returns for promotional discounts
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
                dataKey="discount" 
                tickFormatter={(value) => `${value}%`}
              >
                <Label 
                  value="Promotion Discount" 
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
                formatter={(value, name) => {
                  if (name === "revenue") return [`$${Number(value).toLocaleString()}`, "Incremental Revenue"];
                  return [value, name];
                }}
                labelFormatter={(label) => `Discount: ${label}%`}
              />
              <Legend />
              
              {/* Highlight area of diminishing returns */}
              <ReferenceArea 
                x1={diminishingPoint.discount} 
                x2={saturationData[saturationData.length-1].discount}
                y1={0}
                y2={saturationData[saturationData.length-1].revenue}
                fill="#ffcccc"
                fillOpacity={0.2}
              />
              
              {/* Reference lines for key points */}
              <ReferenceLine
                x={efficientPoint.discount}
                stroke="#4361ee"
                strokeWidth={1}
                strokeDasharray="3 3"
                label={{
                  value: 'Most efficient',
                  position: 'top',
                  fill: '#4361ee',
                  fontSize: 11
                }}
              />
              
              <ReferenceLine
                x={diminishingPoint.discount}
                stroke="#ff0000"
                strokeWidth={1.5}
                strokeDasharray="5 5"
                label={{
                  value: 'Diminishing returns',
                  position: 'top',
                  fill: '#ff0000',
                  fontSize: 11
                }}
              />
              
              <Line
                type="monotone"
                dataKey="revenue"
                name="Incremental Revenue"
                stroke="#ff4d8f"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
              
              {/* Add a scatter plot for key points */}
              <Scatter
                name="Key Points"
                data={keyPoints}
                fill="#2b2d42"
                line={false}
                shape={(props) => {
                  const { cx, cy, fill } = props;
                  return (
                    <svg x={cx - 8} y={cy - 8} width={16} height={16} viewBox="0 0 24 24">
                      <path
                        fill={fill}
                        d="M12,2L4,12L12,22L20,12L12,2Z"
                      />
                    </svg>
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Curve Interpretation:</strong></p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li><strong>Most efficient point:</strong> {efficientPoint.discount}% discount (highest ROI at {efficientPoint.roi}x)</li>
            <li><strong>Max marginal impact:</strong> {marginalPoint.discount}% discount (steepest part of the curve)</li>
            <li><strong>Diminishing returns:</strong> {diminishingPoint.discount}% discount (incremental revenue growth begins to flatten)</li>
            <li><strong>Saturation point:</strong> {saturationPoint.discount}% discount (additional discount generates minimal returns)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
