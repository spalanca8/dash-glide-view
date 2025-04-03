
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface CostEfficiencyChartProps {
  channel: string;
}

// Generate mock data with anomaly points
const generateData = (length: number, baseValue: number, variance: number, anomalyCount: number = 2) => {
  const data = [];
  const anomalies = new Set();
  
  // Set random anomaly positions
  while (anomalies.size < anomalyCount) {
    const pos = Math.floor(Math.random() * length);
    if (pos > 5) { // Avoid anomalies too early in the sequence
      anomalies.add(pos);
    }
  }
  
  for (let i = 0; i < length; i++) {
    const isAnomaly = anomalies.has(i);
    const value = isAnomaly 
      ? baseValue + variance * 2 + Math.random() * variance
      : baseValue + (Math.random() - 0.5) * variance;
    
    data.push({
      day: `Day ${i + 1}`,
      value: Number(value.toFixed(2)),
      isAnomaly
    });
  }
  
  return data;
};

// Mock data for different channels
const mockData = {
  all: {
    cpc: generateData(30, 1.2, 0.4),
    cpm: generateData(30, 8.5, 3.0),
    cpv: generateData(30, 0.04, 0.01)
  },
  social: {
    cpc: generateData(30, 1.4, 0.5),
    cpm: generateData(30, 9.5, 3.5),
    cpv: generateData(30, 0.03, 0.01)
  },
  email: {
    cpc: generateData(30, 0.5, 0.2),
    cpm: generateData(30, 4.0, 1.5),
    cpv: null
  },
  search: {
    cpc: generateData(30, 1.8, 0.6),
    cpm: generateData(30, 12.0, 4.0),
    cpv: null
  },
  display: {
    cpc: generateData(30, 0.9, 0.3),
    cpm: generateData(30, 6.0, 2.0),
    cpv: generateData(30, 0.05, 0.015)
  }
};

export const CostEfficiencyChart = ({ channel }: CostEfficiencyChartProps) => {
  const data = mockData[channel as keyof typeof mockData] || mockData.all;
  
  return (
    <div className="h-96 border rounded-md p-4">
      <Tabs defaultValue="cpc" className="mb-6">
        <TabsList>
          <TabsTrigger value="cpc">Cost Per Click</TabsTrigger>
          <TabsTrigger value="cpm">Cost Per Mille</TabsTrigger>
          {(channel === 'all' || channel === 'social' || channel === 'display') && (
            <TabsTrigger value="cpv">Cost Per View</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="cpc" className="pt-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.cpc}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" interval={4} />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                name="CPC" 
                stroke="#4361ee" 
                strokeWidth={2}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  return payload.isAnomaly ? (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={5} 
                      fill="#ef4444" 
                      stroke="#fff" 
                      strokeWidth={1} 
                    />
                  ) : (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={3} 
                      fill="#4361ee" 
                    />
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-muted-foreground">
                Anomaly detected
              </span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="cpm" className="pt-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.cpm}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" interval={4} />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                name="CPM" 
                stroke="#f72585" 
                strokeWidth={2}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  return payload.isAnomaly ? (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={5} 
                      fill="#ef4444" 
                      stroke="#fff" 
                      strokeWidth={1} 
                    />
                  ) : (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={3} 
                      fill="#f72585" 
                    />
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-muted-foreground">
                Anomaly detected
              </span>
            </div>
          </div>
        </TabsContent>
        
        {data.cpv && (
          <TabsContent value="cpv" className="pt-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.cpv}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" interval={4} />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="CPV" 
                  stroke="#4cc9f0" 
                  strokeWidth={2}
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    return payload.isAnomaly ? (
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r={5} 
                        fill="#ef4444" 
                        stroke="#fff" 
                        strokeWidth={1} 
                      />
                    ) : (
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r={3} 
                        fill="#4cc9f0" 
                      />
                    );
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span className="text-xs text-muted-foreground">
                  Anomaly detected
                </span>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

// Importing tabs component
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
