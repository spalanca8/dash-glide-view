
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Calendar, TrendingUp, ChevronDown, Download } from "lucide-react";
import { TimeSeriesChart } from "@/components/dashboard/TimeSeriesChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TimeSeriesSectionProps {
  data: any[];
  loading: boolean;
}

export function TimeSeriesSection({ data, loading }: TimeSeriesSectionProps) {
  const [timeGranularity, setTimeGranularity] = useState("all");
  const [showRollingAverage, setShowRollingAverage] = useState(false);
  const [showBrush, setShowBrush] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [chartView, setChartView] = useState("combined");
  
  // Calculate ROAS for each data point
  const enhancedData = React.useMemo(() => {
    return data.map(item => ({
      ...item,
      roas: item.cost > 0 ? +(item.revenue / item.cost).toFixed(2) : 0
    }));
  }, [data]);

  // Filter data based on time granularity selection
  const filteredData = React.useMemo(() => {
    if (timeGranularity === "all") return enhancedData;
    
    const now = new Date();
    let cutoffDate = new Date();
    
    switch (timeGranularity) {
      case "last30":
        cutoffDate.setDate(now.getDate() - 30);
        break;
      case "last90":
        cutoffDate.setDate(now.getDate() - 90);
        break;
      case "lastYear":
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return enhancedData;
    }
    
    return enhancedData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
  }, [enhancedData, timeGranularity]);

  // Define comparison period (middle third of the data for demo purposes)
  const comparisonPeriod = React.useMemo(() => {
    if (!showComparison || data.length === 0) return null;
    
    const startIndex = Math.floor(data.length / 3);
    const endIndex = Math.floor(data.length * 2 / 3);
    
    return { 
      start: startIndex, 
      end: endIndex 
    };
  }, [data, showComparison]);

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>Revenue, Cost & ROAS Over Time</CardTitle>
          <CardDescription>
            Track performance trends over time
          </CardDescription>
        </div>
        
        <div className="flex flex-col sm:flex-row items-end gap-4">
          <Select
            value={timeGranularity}
            onValueChange={setTimeGranularity}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="last30">Last 30 Days</SelectItem>
              <SelectItem value="last90">Last Quarter</SelectItem>
              <SelectItem value="lastYear">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                Export <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" /> Export as PNG
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" /> Export as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={chartView} onValueChange={setChartView} className="mb-4">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="combined">Combined View</TabsTrigger>
            <TabsTrigger value="separated">Separated View</TabsTrigger>
            <TabsTrigger value="roas">ROAS Focus</TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Info className="h-4 w-4 mr-2 text-primary" /> 
              {chartView === "combined" && "Layered view shows revenue and cost trends with ROAS as scatter points"}
              {chartView === "separated" && "Split view shows individual metrics for clearer comparison"}
              {chartView === "roas" && "ROAS focus view helps identify efficiency trends over time"}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="rolling-average" 
                  checked={showRollingAverage}
                  onCheckedChange={setShowRollingAverage}
                />
                <Label htmlFor="rolling-average" className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" /> Rolling Average
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="zoom-brush" 
                  checked={showBrush}
                  onCheckedChange={setShowBrush}
                />
                <Label htmlFor="zoom-brush" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Time Zoom
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="comparison-period" 
                  checked={showComparison}
                  onCheckedChange={setShowComparison}
                />
                <Label htmlFor="comparison-period">Compare Period</Label>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden border bg-background">
            <TabsContent value="combined" className="mt-0">
              <TimeSeriesChart
                data={filteredData}
                series={[
                  { dataKey: "cost", color: "#ea384c", label: "Marketing Cost", type: "area" },
                  { dataKey: "revenue", color: "#0EA5E9", label: "Total Revenue", type: "area" },
                  { dataKey: "roas", color: "#9b87f5", label: "ROAS", type: "scatter" }
                ]}
                loading={loading}
                height={400}
                stacked={false}
                showBrush={showBrush}
                showRollingAverage={showRollingAverage}
                comparisonPeriod={comparisonPeriod}
                roasScatterVisible={true}
              />
            </TabsContent>

            <TabsContent value="separated" className="mt-0">
              <TimeSeriesChart
                data={filteredData}
                series={[
                  { dataKey: "revenue", color: "#0EA5E9", label: "Total Revenue", type: "line" },
                  { dataKey: "cost", color: "#ea384c", label: "Marketing Cost", type: "line" },
                ]}
                loading={loading}
                height={400}
                stacked={false}
                showBrush={showBrush}
                showRollingAverage={showRollingAverage}
                comparisonPeriod={comparisonPeriod}
                roasScatterVisible={false}
                chartType="separated"
              />
            </TabsContent>

            <TabsContent value="roas" className="mt-0">
              <TimeSeriesChart
                data={filteredData}
                series={[
                  { dataKey: "roas", color: "#9b87f5", label: "ROAS", type: "line" }
                ]}
                loading={loading}
                height={400}
                stacked={false}
                showBrush={showBrush}
                showRollingAverage={showRollingAverage}
                comparisonPeriod={comparisonPeriod}
                roasScatterVisible={false}
                chartType="roas"
                showAverageLines={true}
              />
            </TabsContent>
          </div>
        </Tabs>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" /> 
            {chartView === "combined" && "This chart shows revenue and marketing costs over time, with ROAS (Return on Ad Spend) plotted as scatter points."}
            {chartView === "separated" && "This chart separates revenue and cost for clearer trend analysis without visual interference."}
            {chartView === "roas" && "This chart focuses on ROAS trends to help identify periods of highest marketing efficiency."}
            {showComparison && " The highlighted area represents a comparison period for analysis."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
