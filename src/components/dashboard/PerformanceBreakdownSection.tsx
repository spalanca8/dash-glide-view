
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DownloadIcon, BarChart3, TableIcon } from "lucide-react";
import { EnhancedWaterfallChart } from "./EnhancedWaterfallChart";

// Define colors for each media type
const mediaTypeColors = {
  paid: "#F97316",       // Bright Orange
  organic: "#6E59A5",    // Tertiary Purple
  nonPaid: "#0EA5E9",    // Ocean Blue
  baseline: "#9b87f5",   // Primary Purple
  total: "#33C3F0"       // Sky Blue
};

type PerformanceBreakdownSectionProps = {
  data: any[];
  loading: boolean;
};

export function PerformanceBreakdownSection({ data, loading }: PerformanceBreakdownSectionProps) {
  const [view, setView] = useState<'chart' | 'table'>('chart');
  
  // Prepare data for waterfall chart format
  const prepareWaterfallData = () => {
    if (!data || data.length === 0) return [];
    
    // Take the latest data point
    const latestData = data[data.length - 1];
    
    // Prepare waterfall data - note the order is changed to match the chart
    const waterfallData = [
      { name: 'Baseline', value: latestData.baseline, fill: mediaTypeColors.baseline, isTotal: false },
      { name: 'Paid Media', value: latestData.paid, fill: mediaTypeColors.paid, isTotal: false },
      { name: 'Organic Media', value: latestData.organic, fill: mediaTypeColors.organic, isTotal: false },
      { name: 'Non-Paid Media', value: latestData.nonPaid, fill: mediaTypeColors.nonPaid, isTotal: false },
      { name: 'Total', value: latestData.total, fill: mediaTypeColors.total, isTotal: true }
    ];
    
    return waterfallData;
  };

  // Calculate cumulative values for the table view
  const prepareCumulativeData = () => {
    const data = prepareWaterfallData();
    let runningTotal = 0;
    
    return data.map(item => {
      if (item.isTotal) {
        return { ...item, cumulativeValue: item.value };
      }
      
      runningTotal += item.value;
      return { 
        ...item, 
        cumulativeValue: runningTotal
      };
    });
  };

  return (
    <Card className="mb-8 glass-card premium-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">Performance Breakdown</CardTitle>
          <CardDescription>Cumulative contribution to revenue by media type</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border rounded-md">
            <Button
              variant={view === 'chart' ? 'default' : 'ghost'}
              size="sm"
              className={`rounded-r-none ${view === 'chart' ? 'bg-primary hover:bg-primary/90' : ''}`}
              onClick={() => setView('chart')}
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Chart
            </Button>
            <Button
              variant={view === 'table' ? 'default' : 'ghost'}
              size="sm"
              className={`rounded-l-none ${view === 'table' ? 'bg-primary hover:bg-primary/90' : ''}`}
              onClick={() => setView('table')}
            >
              <TableIcon className="h-4 w-4 mr-1" />
              Table
            </Button>
          </div>
          <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary">
            <DownloadIcon className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="w-full h-[400px]" />
        ) : (
          <>
            {view === 'chart' ? (
              <div className="space-y-6">
                <EnhancedWaterfallChart
                  data={data}
                  loading={loading}
                  height={450}
                  className="animate-fade-in"
                />
              </div>
            ) : (
              // Table view showing cumulative values
              <div className="overflow-x-auto animate-fade-in">
                <table className="min-w-full divide-y divide-gray-200 border border-border/40 rounded-lg overflow-hidden">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Media Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue Contribution
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cumulative Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        % of Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {prepareCumulativeData().map((item, index) => {
                      // Skip the total row for percentage calculation
                      const total = data[data.length - 1].total;
                      const percentage = item.isTotal ? 100 : (item.value / total) * 100;
                      
                      return (
                        <tr 
                          key={index}
                          className={item.isTotal 
                            ? "font-bold bg-muted/30" 
                            : "hover:bg-muted/20 transition-colors duration-150"}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: item.fill }}
                              ></div>
                              {item.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ${item.value.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-primary">
                            ${item.cumulativeValue.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="mr-2">{percentage.toFixed(1)}%</span>
                              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="h-1.5 rounded-full" 
                                  style={{ 
                                    width: `${percentage}%`, 
                                    backgroundColor: item.fill 
                                  }}
                                ></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
