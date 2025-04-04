
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar, Info, AlertTriangle, ArrowUp, ArrowDown, Filter } from "lucide-react";
import { TimeSeriesChart } from "@/components/dashboard/TimeSeriesChart";
import { ChannelDropdown } from "@/components/dashboard/ChannelDropdown";
import { FilterDropdown } from "@/components/dashboard/FilterDropdown";

type MonthOverMonthComparisonChartProps = {
  data: Array<{
    date: string;
    currentYear: number;
    previousYear: number;
    change: number;
    channel?: string;
    factor?: string;
  }>;
  loading?: boolean;
  height?: number;
  metric?: string;
  hideChangeMetric?: boolean;
  channels?: Array<{ value: string; label: string; color?: string }>;
  factors?: Array<{ value: string; label: string }>;
  onChannelChange?: (channel: string) => void;
  onFactorChange?: (factor: string) => void;
};

export function MonthOverMonthComparisonChart({
  data,
  loading = false,
  height = 400,
  metric = "Revenue",
  hideChangeMetric = false,
  channels = [],
  factors = [],
  onChannelChange,
  onFactorChange
}: MonthOverMonthComparisonChartProps) {
  const [showHelp, setShowHelp] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [selectedFactor, setSelectedFactor] = useState("all");
  const [filteredData, setFilteredData] = useState(data);
  
  // Apply filtering whenever data changes or filters change
  useEffect(() => {
    let result = [...data];
    
    if (selectedChannel !== "all" && result.some(item => item.channel)) {
      result = result.filter(item => item.channel === selectedChannel);
    }
    
    if (selectedFactor !== "all" && result.some(item => item.factor)) {
      result = result.filter(item => item.factor === selectedFactor);
    }
    
    // Aggregate data by month after filtering by channel and factor
    // This ensures we get one data point per month after filtering
    if (result.length > 0) {
      const monthlyAggregated = new Map();
      
      result.forEach(item => {
        if (!monthlyAggregated.has(item.date)) {
          monthlyAggregated.set(item.date, {
            date: item.date,
            currentYearTotal: 0,
            previousYearTotal: 0,
            count: 0
          });
        }
        
        const monthData = monthlyAggregated.get(item.date);
        monthData.currentYearTotal += item.currentYear;
        monthData.previousYearTotal += item.previousYear;
        monthData.count += 1;
      });
      
      // Convert aggregated data back to array format
      const aggregatedResult = Array.from(monthlyAggregated.values()).map(item => {
        const currentYear = Math.round(item.currentYearTotal / item.count);
        const previousYear = Math.round(item.previousYearTotal / item.count);
        const change = ((currentYear - previousYear) / previousYear) * 100;
        
        return {
          date: item.date,
          currentYear,
          previousYear,
          change: parseFloat(change.toFixed(1))
        };
      });
      
      // Sort by month sequence
      const monthOrder = {
        "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
        "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
      };
      
      aggregatedResult.sort((a, b) => monthOrder[a.date as keyof typeof monthOrder] - monthOrder[b.date as keyof typeof monthOrder]);
      
      setFilteredData(aggregatedResult);
    } else {
      setFilteredData([]);
    }
  }, [data, selectedChannel, selectedFactor]);
  
  const handleChannelChange = (value: string) => {
    setSelectedChannel(value);
    if (onChannelChange) {
      onChannelChange(value);
    }
  };

  const handleFactorChange = (value: string) => {
    setSelectedFactor(value);
    if (onFactorChange) {
      onFactorChange(value);
    }
  };
  
  if (loading) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  // Calculate overall trend for insights using filtered data
  const overallTrend = filteredData.length > 0 
    ? filteredData.reduce((acc, item) => acc + item.change, 0) / filteredData.length 
    : 0;
  const trendDirection = overallTrend > 0 ? "positive" : "negative";
  
  // Find the best and worst months from filtered data
  const sortedByChange = [...filteredData].sort((a, b) => b.change - a.change);
  const bestMonth = sortedByChange.length > 0 ? sortedByChange[0] : null;
  const worstMonth = sortedByChange.length > 0 ? sortedByChange[sortedByChange.length - 1] : null;
  
  // Prepare chart series 
  const chartSeries = [
    {
      dataKey: "currentYear",
      color: "#4361ee",
      label: "This Year",
      type: "line" as const
    },
    {
      dataKey: "previousYear",
      color: "#94a3b8",
      label: "Last Year",
      type: "line" as const,
      strokeDasharray: "5 5"
    }
  ];
  
  // Only add change metric series if not hidden
  if (!hideChangeMetric) {
    chartSeries.push({
      dataKey: "change",
      color: "#10b981",
      label: "MoM % Change",
      type: "line" as const,
    });
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Month-over-Month {metric} Comparison
            </CardTitle>
            <CardDescription>
              Compare monthly {metric.toLowerCase()} trends and changes between this year and last year
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            {channels.length > 0 && (
              <div className="w-[180px]">
                <ChannelDropdown
                  channels={channels}
                  value={selectedChannel}
                  onChange={handleChannelChange}
                  placeholder="Select channel"
                />
              </div>
            )}
            {factors.length > 0 && (
              <div className="w-[180px]">
                <FilterDropdown
                  options={factors}
                  value={selectedFactor}
                  onChange={handleFactorChange}
                  icon={<Filter className="h-4 w-4" />}
                  label="Factor"
                />
              </div>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowHelp(!showHelp)}
            >
              <Info className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {showHelp && (
          <div className="mb-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="text-sm font-medium mb-1">About This Chart</h3>
                <p className="text-sm text-muted-foreground">
                  This chart displays month-over-month {metric.toLowerCase()} data for the current year compared to the same period last year.
                  The solid blue line represents this year's data, while the dashed gray line shows last year's performance.
                  {!hideChangeMetric && " The green line shows the percentage change between corresponding months, helping you identify growth trends and seasonal patterns."}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <TimeSeriesChart 
          data={filteredData} 
          series={chartSeries}
          xAxisKey="date"
          height={height}
          showAverageLines={true}
          legendSpacing={true}
        />
        
        <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Key Insights
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded border border-blue-100 shadow-sm">
              <h5 className="font-medium text-blue-700 text-sm mb-1">Overall Trend</h5>
              <div className={`flex items-center gap-1 font-bold ${trendDirection === "positive" ? "text-green-600" : "text-red-600"}`}>
                {trendDirection === "positive" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span>{Math.abs(overallTrend).toFixed(1)}% {trendDirection}</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Average MoM change across all months
              </p>
            </div>
            
            <div className="p-3 bg-white rounded border border-blue-100 shadow-sm">
              <h5 className="font-medium text-blue-700 text-sm mb-1">Best Performance</h5>
              <div className="flex items-center gap-1 font-bold text-green-600">
                <ArrowUp className="h-4 w-4" />
                <span>{bestMonth?.change.toFixed(1)}%</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                {bestMonth?.date}: {Math.round(bestMonth?.currentYear).toLocaleString()} vs {Math.round(bestMonth?.previousYear).toLocaleString()}
              </p>
            </div>
            
            <div className="p-3 bg-white rounded border border-blue-100 shadow-sm">
              <h5 className="font-medium text-blue-700 text-sm mb-1">Area of Concern</h5>
              <div className="flex items-center gap-1 font-bold text-red-600">
                <ArrowDown className="h-4 w-4" />
                <span>{worstMonth?.change.toFixed(1)}%</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                {worstMonth?.date}: {Math.round(worstMonth?.currentYear).toLocaleString()} vs {Math.round(worstMonth?.previousYear).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
