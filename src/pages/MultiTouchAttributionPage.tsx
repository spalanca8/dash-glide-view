import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const MultiTouchAttributionPage = () => {
  const [loading, setLoading] = useState(true);
  const [attributionModel, setAttributionModel] = useState("linear");
  const [timeframe, setTimeframe] = useState("30d");
  const [attributionData, setAttributionData] = useState<any[]>([]);
  const [channelContribution, setChannelContribution] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Generate fake attribution data
      const models = ["linear", "first_touch", "last_touch", "position_based", "time_decay"];
      const channels = ["Paid Search", "Organic Search", "Social Media", "Display", "Email", "Direct"];
      
      // Generate date range based on timeframe
      const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90;
      const attributionData = Array.from({ length: days }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - i - 1));
        
        return {
          date: date.toISOString().split('T')[0],
          value: Math.round(10000 + Math.random() * 50000),
          conversions: Math.round(50 + Math.random() * 200),
        };
      });
      
      // Generate channel contribution data for each model
      const channelContribution = channels.map(channel => {
        const modelData: Record<string, number> = {};
        
        models.forEach(model => {
          // Different models have different attribution patterns
          let percentage = 0;
          if (model === "first_touch") {
            percentage = channel === "Paid Search" || channel === "Social Media" ? 
              20 + Math.random() * 15 : 5 + Math.random() * 10;
          } else if (model === "last_touch") {
            percentage = channel === "Organic Search" || channel === "Direct" ? 
              20 + Math.random() * 15 : 5 + Math.random() * 10;
          } else if (model === "linear") {
            percentage = 100 / channels.length + (Math.random() * 5 - 2.5);
          } else if (model === "position_based") {
            percentage = channel === "Paid Search" || channel === "Direct" ? 
              15 + Math.random() * 10 : 10 + Math.random() * 10;
          } else if (model === "time_decay") {
            percentage = channel === "Organic Search" || channel === "Email" ? 
              15 + Math.random() * 10 : 10 + Math.random() * 10;
          }
          
          modelData[model] = parseFloat(percentage.toFixed(1));
        });
        
        return {
          channel,
          ...modelData,
          color: getChannelColor(channel)
        };
      });
      
      setAttributionData(attributionData);
      setChannelContribution(channelContribution);
      setLoading(false);
    };
    
    loadData();
  }, [timeframe]);
  
  // Helper function to get channel colors
  const getChannelColor = (channel: string) => {
    const colors: Record<string, string> = {
      "Paid Search": "#4361ee",
      "Organic Search": "#3a0ca3",
      "Social Media": "#7209b7",
      "Display": "#f72585",
      "Email": "#4cc9f0",
      "Direct": "#560bad"
    };
    
    return colors[channel] || "#888888";
  };
  
  // Calculate totals
  const totalRevenue = !loading && attributionData.length
    ? attributionData.reduce((sum, day) => sum + day.value, 0)
    : 0;
    
  const totalConversions = !loading && attributionData.length
    ? attributionData.reduce((sum, day) => sum + day.conversions, 0)
    : 0;
    
  const avgOrderValue = totalConversions > 0
    ? totalRevenue / totalConversions
    : 0;
  
  const conversionRate = 5.2; // Dummy value
  
  // Prepare contribution data for the current selected model
  const currentModelData = !loading && channelContribution.length
    ? channelContribution.map(item => ({
        name: item.channel,
        value: item[attributionModel],
        color: item.color
      }))
    : [];

  // Format attribution model name for display
  const formatModelName = (model: string) => {
    return model
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Multi-Touch Attribution"
        description="Analyze customer journeys and attribute conversions across marketing channels"
      >
        <Tabs
          defaultValue="30d"
          value={timeframe}
          onValueChange={setTimeframe}
          className="w-[240px]"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="7d">7D</TabsTrigger>
            <TabsTrigger value="30d">30D</TabsTrigger>
            <TabsTrigger value="90d">90D</TabsTrigger>
          </TabsList>
        </Tabs>
      </PageHeader>

      {/* Model explanation */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Attribution Models Explained</CardTitle>
          <CardDescription>
            Different models distribute conversion credit across customer touchpoints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-semibold mb-2">Linear Attribution</h4>
              <p className="text-sm text-muted-foreground">
                Equal credit is given to each touchpoint in the customer journey, providing a balanced view of channel influence.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-semibold mb-2">First Touch Attribution</h4>
              <p className="text-sm text-muted-foreground">
                100% of the conversion credit goes to the first touchpoint, highlighting channels that create initial awareness.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-semibold mb-2">Last Touch Attribution</h4>
              <p className="text-sm text-muted-foreground">
                100% of the conversion credit goes to the final touchpoint before conversion, emphasizing closing channels.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-semibold mb-2">Position-Based Attribution</h4>
              <p className="text-sm text-muted-foreground">
                40% credit to first touch, 40% to last touch, and 20% distributed among middle touchpoints.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-semibold mb-2">Time Decay Attribution</h4>
              <p className="text-sm text-muted-foreground">
                More credit to touchpoints closer to conversion, with a 7-day half-life decay.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-semibold mb-2">Data-Driven Attribution</h4>
              <p className="text-sm text-muted-foreground">
                Uses machine learning to calculate the actual contribution of each touchpoint based on your data patterns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Attributed Revenue"
          value={loading ? "-" : `$${totalRevenue.toLocaleString()}`}
          change={5.2}
          description="vs. previous period"
          icon={<DollarSign className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard
          title="Attributed Conversions"
          value={loading ? "-" : totalConversions.toLocaleString()}
          change={3.8}
          description="vs. previous period"
          icon={<Users className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard
          title="Average Order Value"
          value={loading ? "-" : `$${avgOrderValue.toFixed(2)}`}
          change={1.5}
          description="vs. previous period"
          icon={<BarChart3 className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard
          title="Conversion Rate"
          value={loading ? "-" : `${conversionRate}%`}
          change={0.3}
          description="vs. previous period"
          icon={<TrendingUp className="h-4 w-4" />}
          loading={loading}
        />
      </div>

      {/* Attribution model selector and chart */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Channel Contribution by Attribution Model</CardTitle>
            <CardDescription>
              How different attribution models assign conversion credit to channels
            </CardDescription>
          </div>
          <Select value={attributionModel} onValueChange={setAttributionModel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linear">Linear</SelectItem>
              <SelectItem value="first_touch">First Touch</SelectItem>
              <SelectItem value="last_touch">Last Touch</SelectItem>
              <SelectItem value="position_based">Position Based</SelectItem>
              <SelectItem value="time_decay">Time Decay</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="w-full h-[400px]" />
          ) : (
            <div className="h-[400px]">
              <AttributionChart data={currentModelData} />
            </div>
          )}
          <div className="mt-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" /> 
              Showing channel contribution percentages for the {formatModelName(attributionModel)} model.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Attribution over time */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Attribution Performance Over Time</CardTitle>
          <CardDescription>
            Visualize attributed revenue and conversions across the selected time period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PerformanceChart 
            data={attributionData} 
            lines={[
              {
                dataKey: "value",
                color: "#4361ee",
                label: "Attributed Revenue",
                yAxisId: "left"
              },
            ]}
            loading={loading}
            height={350}
          />
        </CardContent>
      </Card>

      {/* Comparative model analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Comparative Model Analysis</CardTitle>
          <CardDescription>
            Compare how different attribution models credit your marketing channels
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="w-full h-[500px]" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Channel</th>
                    <th className="text-right py-3 px-4">Linear</th>
                    <th className="text-right py-3 px-4">First Touch</th>
                    <th className="text-right py-3 px-4">Last Touch</th>
                    <th className="text-right py-3 px-4">Position Based</th>
                    <th className="text-right py-3 px-4">Time Decay</th>
                  </tr>
                </thead>
                <tbody>
                  {channelContribution.map((channel, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: channel.color }}
                          ></div>
                          {channel.channel}
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">{channel.linear}%</td>
                      <td className="text-right py-3 px-4">{channel.first_touch}%</td>
                      <td className="text-right py-3 px-4">{channel.last_touch}%</td>
                      <td className="text-right py-3 px-4">{channel.position_based}%</td>
                      <td className="text-right py-3 px-4">{channel.time_decay}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiTouchAttributionPage;

// Helper component for the attribution chart
const AttributionChart: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="w-full h-full flex">
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="relative pt-1">
              {data.map((item, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-sm">{item.name}</span>
                    <span className="font-medium text-sm">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-80 flex flex-col justify-center">
        <div className="aspect-square relative rounded-full overflow-hidden border border-border">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium">
              Attribution<br/>Breakdown
            </span>
          </div>
          {data.map((item, index) => {
            // Calculate the size of this segment
            const previousTotal = data
              .slice(0, index)
              .reduce((sum, i) => sum + i.value, 0);
            const angle = (item.value / 100) * 360;
            const startAngle = (previousTotal / 100) * 360;
            
            return (
              <div
                key={index}
                className="absolute inset-0"
                style={{
                  background: `conic-gradient(
                    ${item.color} ${startAngle}deg,
                    ${item.color} ${startAngle + angle}deg,
                    transparent ${startAngle + angle}deg,
                    transparent 360deg
                  )`
                }}
              ></div>
            );
          })}
        </div>
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-xs">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
