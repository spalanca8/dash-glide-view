import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  ReferenceArea,
  ReferenceLine,
  TooltipProps,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Circle } from "lucide-react";

// Helper function to calculate ROAS with diminishing returns
const calculateRoas = (spend: number, maxRoas: number, saturationPoint: number) => {
  if (spend === 0) return 0;
  // Diminishing returns formula
  return maxRoas * Math.exp(-Math.pow(spend - (saturationPoint * 0.5), 2) / (2 * Math.pow(saturationPoint, 2))) + 1;
};

// Generate saturation curve data for a channel
const generateSaturationData = (channelId: string, activeScenario: string, customBudgets: Record<string, Record<string, number>>) => {
  // We'll create points of a curve that demonstrates diminishing returns with a hill shape
  const points = [];
  // Base values aligned with scenario comparison numbers
  const baseSpend = channelId === "search" ? 20000 : 
                   channelId === "social" ? 15000 : 
                   channelId === "display" ? 10000 : 5000;
  
  const maxRoas = channelId === "search" ? 6.5 : 
                 channelId === "social" ? 5.8 : 
                 channelId === "display" ? 4.2 : 3.8;
                 
  const saturationPoint = channelId === "search" ? 35000 : 
                         channelId === "social" ? 25000 : 
                         channelId === "display" ? 18000 : 12000;
  
  // Current spend point (for the marker)
  const currentSpend = baseSpend * 1.3;
  
  // New spend point based on the active scenario
  const newSpend = customBudgets[activeScenario]?.[channelId] || currentSpend;
  
  // Get BAU spend for comparison
  const bauSpend = customBudgets["bau"]?.[channelId] || currentSpend;
  
  // Calculate maximum saturation point (where marginal returns become negative)
  const maxSaturationSpend = saturationPoint * 1.5;
  
  // Calculate ROAS/outcomes for key points
  const currentRoas = calculateRoas(currentSpend, maxRoas, saturationPoint);
  const newRoas = calculateRoas(newSpend, maxRoas, saturationPoint);
  const bauRoas = calculateRoas(bauSpend, maxRoas, saturationPoint);
  const maxSaturationRoas = calculateRoas(maxSaturationSpend, maxRoas, saturationPoint);
  
  const currentRevenue = currentSpend * currentRoas;
  const newRevenue = newSpend * newRoas;
  const bauRevenue = bauSpend * bauRoas;
  const maxSaturationRevenue = maxSaturationSpend * maxSaturationRoas;
  
  // Points for the curve - create a hill shape curve
  for (let spend = 0; spend <= baseSpend * 3.5; spend += baseSpend / 15) {
    // Calculate ROAS with a logistic function that asymptotically approaches 0
    const roas = maxRoas / (1 + Math.exp(0.0001 * (spend - saturationPoint)));
    // Calculate incremental outcome that approaches 0
    const incrementalOutcome = (maxRoas * 20000) / (1 + Math.exp(0.0001 * (spend - saturationPoint)));
    
    points.push({
      spend,
      roas: maxRoas - roas, // Mirror the ROAS curve by subtracting from max
      incrementalOutcome: maxRoas * 20000 - incrementalOutcome, // Mirror the outcome curve
      revenue: spend * (maxRoas - roas), // Calculate revenue with mirrored ROAS
      // Mark the points
      isCurrent: Math.abs(spend - currentSpend) < baseSpend / 20,
      isBau: Math.abs(spend - bauSpend) < baseSpend / 20,
      isNew: Math.abs(spend - newSpend) < baseSpend / 20,
      isMaxSaturation: Math.abs(spend - maxSaturationSpend) < baseSpend / 20
    });
  }
  return { 
    points, 
    maxSaturationPoint: { 
      roas: maxRoas / (1 + Math.exp(0.0001 * (maxSaturationSpend - saturationPoint))), 
      spend: maxSaturationSpend, 
      revenue: maxSaturationSpend * (maxRoas / (1 + Math.exp(0.0001 * (maxSaturationSpend - saturationPoint)))),
      incrementalOutcome: (maxRoas * 20000) / (1 + Math.exp(0.0001 * (maxSaturationSpend - saturationPoint)))
    },
    newPoint: { 
      roas: maxRoas / (1 + Math.exp(0.0001 * (newSpend - saturationPoint))), 
      spend: newSpend, 
      revenue: newSpend * (maxRoas / (1 + Math.exp(0.0001 * (newSpend - saturationPoint)))),
      incrementalOutcome: (maxRoas * 20000) / (1 + Math.exp(0.0001 * (newSpend - saturationPoint)))
    },
    bauPoint: { 
      roas: maxRoas / (1 + Math.exp(0.0001 * (bauSpend - saturationPoint))), 
      spend: bauSpend, 
      revenue: bauSpend * (maxRoas / (1 + Math.exp(0.0001 * (bauSpend - saturationPoint)))),
      incrementalOutcome: (maxRoas * 20000) / (1 + Math.exp(0.0001 * (bauSpend - saturationPoint)))
    },
    currentPoint: { 
      roas: maxRoas / (1 + Math.exp(0.0001 * (currentSpend - saturationPoint))), 
      spend: currentSpend, 
      revenue: currentSpend * (maxRoas / (1 + Math.exp(0.0001 * (currentSpend - saturationPoint)))),
      incrementalOutcome: (maxRoas * 20000) / (1 + Math.exp(0.0001 * (currentSpend - saturationPoint)))
    }
  };
};

// Helper function to calculate incremental outcome (hill shape)
const calculateIncrementalOutcome = (spend: number, maxRoas: number, saturationPoint: number) => {
  if (spend === 0) return 0;
  // Create a hill-shaped curve that peaks at the saturation point and then declines
  const hill = Math.exp(-Math.pow(spend - saturationPoint, 2) / (2 * Math.pow(saturationPoint * 0.6, 2)));
  return hill * maxRoas * 20000; // Scale the outcome for visualization
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps<string | number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    const isSpecialPoint = data?.isCurrent || data?.isNew || data?.isMaxSaturation || data?.isBau;
    
    return (
      <div className="bg-white p-3 border rounded-md shadow-md">
        <p className="font-medium">Ad Spend: ${data?.spend?.toLocaleString()}</p>
        <p>Incremental Outcome: ${data?.incrementalOutcome?.toLocaleString()}</p>
        <p>ROAS: {data?.roas?.toFixed(2)}x</p>
        <p>Revenue: ${data?.revenue?.toLocaleString()}</p>
        {isSpecialPoint && (
          <p className="font-bold mt-1 text-primary">
            {data?.isCurrent ? "Current Spend Point" : 
             data?.isBau ? "Business As Usual" :
             data?.isNew ? "New Recommended Spend" : 
             "Maximum Saturation Point"}
          </p>
        )}
      </div>
    );
  }
  return null;
};

type ChannelSaturationCurveProps = {
  channelId: string;
  channelName: string;
  color: string;
  activeScenario: string;
  customBudgets: Record<string, Record<string, number>>;
};

export function ChannelSaturationCurve({ 
  channelId, 
  channelName, 
  color,
  activeScenario,
  customBudgets
}: ChannelSaturationCurveProps) {
  // Generate data for the curve
  const { points, currentPoint, bauPoint, maxSaturationPoint } = generateSaturationData(channelId, activeScenario, customBudgets);
  
  // Create new point that's 10k more than current
  const newPoint = {
    ...currentPoint,
    spend: currentPoint.spend + 10000,
    incrementalOutcome: calculateIncrementalOutcome(currentPoint.spend + 10000, maxSaturationPoint.roas, maxSaturationPoint.spend)
  };

  // Calculate difference between BAU and active scenario
  const isBauActive = activeScenario === "bau";
  const spendChange = !isBauActive ? newPoint.spend - bauPoint.spend : 0;
  const outcomeChange = !isBauActive ? newPoint.incrementalOutcome - bauPoint.incrementalOutcome : 0;
  const isPositiveChange = outcomeChange > 0;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">{channelName} Saturation Curve</h3>
            <p className="text-sm text-muted-foreground">
              Shows how incremental outcomes change as ad spending increases, highlighting key points
            </p>
          </div>
          
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={points}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="spend" 
                  tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                  label={{ value: 'Ad Spend ($)', position: 'insideBottomRight', offset: -10 }}
                />
                <YAxis 
                  yAxisId="left"
                  label={{ value: 'Incremental Outcome ($)', angle: -90, position: 'insideLeft' }}
                  tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Hill-shaped Incremental Outcome Line */}
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="incrementalOutcome"
                  name="Incremental Outcome"
                  stroke={color}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                
                {/* Current Spend Point */}
                <Scatter
                  yAxisId="left"
                  data={[currentPoint]}
                  fill="#f97316"
                  shape={<Circle r={20} />}
                />
                
                {/* New Spend Point */}
                <Scatter
                  yAxisId="left"
                  data={[newPoint]}
                  fill="#22c55e"
                  shape={<Circle r={6} />}
                />
                
                {/* Max Saturation Point */}
                <Scatter
                  yAxisId="left"
                  data={[maxSaturationPoint]}
                  fill="#9333ea"
                  shape={<Circle r={6} />}
                />
                {/* Reference lines for key points */}
                <ReferenceLine x={bauPoint.spend} yAxisId="left" stroke="#3B82F6" strokeDasharray="3 3" strokeWidth={2} />
                <ReferenceLine x={newPoint.spend} yAxisId="left" stroke="#4CAF50" strokeDasharray="3 3" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }}></div>
              <span>Incremental Outcome</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span>Business As Usual (${bauPoint.spend.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-500"></div>
              <span>Current Spend (${currentPoint.spend.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span>New Spend (${newPoint.spend.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-600"></div>
              <span>Maximum Saturation (${maxSaturationPoint.spend.toLocaleString()})</span>
            </div>
          </div>
          
          {/* Scenario difference indicator */}
          {!isBauActive && (
            <div className={`mt-4 p-3 border rounded-lg ${isPositiveChange ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${isPositiveChange ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`font-medium ${isPositiveChange ? 'text-green-700' : 'text-red-700'}`}>
                  {isPositiveChange ? 'Improvement over BAU' : 'Decrease from BAU'}:
                </span>
                <span>
                  {spendChange > 0 ? '+' : ''}{spendChange.toLocaleString()} spend, 
                  {outcomeChange > 0 ? '+' : ''}{outcomeChange.toLocaleString()} outcome
                  ({Math.abs(Math.round(outcomeChange / bauPoint.incrementalOutcome * 100))}% {isPositiveChange ? 'increase' : 'decrease'})
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Insights Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3 items-start">
            <div className="p-2 rounded-full bg-blue-100/50">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-md font-medium mb-1">Saturation Analysis Insights</h3>
              <ul className="space-y-2 text-sm">
                <li>Current spend: <span className="font-medium">${currentPoint.spend.toLocaleString()}</span> with outcome of <span className="font-medium">${currentPoint.incrementalOutcome.toLocaleString()}</span></li>
                <li>
                  {!isBauActive && (
                    <>
                      {isPositiveChange 
                        ? `Moving from BAU ($${bauPoint.spend.toLocaleString()}) to $${newPoint.spend.toLocaleString()} improves outcomes by ${Math.abs(Math.round(outcomeChange / bauPoint.incrementalOutcome * 100))}%`
                        : `Moving from BAU ($${bauPoint.spend.toLocaleString()}) to $${newPoint.spend.toLocaleString()} reduces outcomes by ${Math.abs(Math.round(outcomeChange / bauPoint.incrementalOutcome * 100))}%`
                      }
                    </>
                  )}
                </li>
                <li>
                  Maximum saturation point at <span className="font-medium">${maxSaturationPoint.spend.toLocaleString()}</span> where incremental returns start declining
                </li>
                <li className="font-medium">
                  {newPoint.spend < maxSaturationPoint.spend && newPoint.spend > bauPoint.spend
                    ? "Recommendation: Continue increasing spend up to optimization point"
                    : newPoint.spend > maxSaturationPoint.spend
                    ? "Recommendation: Consider reducing spend to improve efficiency"
                    : "The recommended spend appears to be optimized for your goals"}
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
