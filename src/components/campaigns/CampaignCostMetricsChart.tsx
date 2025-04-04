
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { ChartTooltip, ChartTooltipContent } from "../ui/chart/ChartTooltip";

interface CampaignCostMetricsChartProps {
  loading: boolean;
  data: Array<{
    date: string;
    cpc: number;
    cpm: number;
    cpv: number;
  }>;
}

export function CampaignCostMetricsChart({ loading, data }: CampaignCostMetricsChartProps) {
  const [activeMetric, setActiveMetric] = React.useState("cpc");
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-full max-w-[250px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[350px] w-full" />
        </CardContent>
      </Card>
    );
  }
  
  // Process data to format dates for better display
  const formattedData = data.map(item => {
    // Extract just the date part if it's an ISO string (YYYY-MM-DD)
    const datePart = item.date.split('T')[0];
    // Format to shorter display (e.g., "Mar 15" or "03/15")
    const date = new Date(datePart);
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    
    return {
      ...item,
      date: formattedDate
    };
  });
  
  const formatValue = (value: number, metric: string) => {
    switch (metric) {
      case "cpc":
        return `$${value.toFixed(2)}`;
      case "cpm":
        return `$${value.toFixed(2)}`;
      case "cpv":
        return `$${value.toFixed(3)}`;
      default:
        return `$${value.toFixed(2)}`;
    }
  };
  
  const getMetricName = (metric: string) => {
    switch (metric) {
      case "cpc":
        return "Cost Per Click (CPC)";
      case "cpm":
        return "Cost Per Mille (CPM)";
      case "cpv":
        return "Cost Per View (CPV)";
      default:
        return metric;
    }
  };
  
  const getMetricColor = (metric: string) => {
    switch (metric) {
      case "cpc":
        return "#4361ee";
      case "cpm":
        return "#f72585";
      case "cpv":
        return "#7209b7";
      default:
        return "#4361ee";
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Cost Metrics Over Time</CardTitle>
        <CardDescription>
          Track how your campaign's efficiency metrics evolve over the campaign period
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cpc" value={activeMetric} onValueChange={setActiveMetric} className="mb-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="cpc">Cost Per Click</TabsTrigger>
            <TabsTrigger value="cpm">Cost Per Mille</TabsTrigger>
            <TabsTrigger value="cpv">Cost Per View</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeMetric}>
            <div className="mt-4 text-sm">
              <p className="mb-2 text-muted-foreground">
                {activeMetric === "cpc" && (
                  <>Cost Per Click (CPC) measures how efficiently your budget is used to generate clicks.</>
                )}
                {activeMetric === "cpm" && (
                  <>Cost Per Mille (CPM) shows how much you're paying for 1,000 impressions.</>
                )}
                {activeMetric === "cpv" && (
                  <>Cost Per View (CPV) indicates the cost for each video view or interaction.</>
                )}
              </p>
              <div className="flex items-center gap-2 mb-6">
                <span className="font-medium">Current average:</span>
                <span className="font-bold text-primary">
                  {formatValue(
                    data.reduce((sum, item) => sum + (item[activeMetric as keyof typeof item] as number), 0) / data.length,
                    activeMetric
                  )}
                </span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 40 }} // Increased bottom margin
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "rgba(0,0,0,0.09)" }}
                height={40} // Increased height for x-axis
                interval={0} // Force display all labels
                angle={-30} // Angle for better visibility
                textAnchor="end" // Proper text anchor for angled text
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                content={<ChartTooltipContent 
                  formatter={(value, name) => [
                    formatValue(value, name.toLowerCase()), 
                    getMetricName(name.toLowerCase())
                  ]}
                />}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={activeMetric}
                name={getMetricName(activeMetric)}
                stroke={getMetricColor(activeMetric)}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
