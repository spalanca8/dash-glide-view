
import React from "react";
import { EnhancedWaterfallChart } from "@/components/dashboard/EnhancedWaterfallChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";

// Define type for waterfall data items
export type WaterfallDataItem = {
  name: string;
  value: number;
  fill: string;
  displayValue: number;
  ratio: string;
  isTotal?: boolean;
};

type IncrementalRevenueWaterfallChartProps = {
  data: any[];
  loading?: boolean;
};

// Export prepareWaterfallData for testing
export const prepareWaterfallData = (data: any[]): WaterfallDataItem[] => {
  // Default data to prevent NaN values
  const defaultData: WaterfallDataItem[] = [
    { 
      name: 'Baseline', 
      value: 700000, 
      fill: '#1e293b',
      displayValue: 700000,
      ratio: '70%',
    },
    { 
      name: 'Search', 
      value: 100000, 
      fill: '#ec4899',
      displayValue: 100000,
      ratio: '10%',
    },
    { 
      name: 'Social', 
      value: 60000, 
      fill: '#ec4899',
      displayValue: 60000,
      ratio: '6%',
    },
    { 
      name: 'Video', 
      value: 40000, 
      fill: '#ec4899',
      displayValue: 40000,
      ratio: '4%',
    },
    { 
      name: 'Display', 
      value: 50000, 
      fill: '#ec4899',
      displayValue: 50000,
      ratio: '5%',
    },
    { 
      name: 'Email', 
      value: 30000, 
      fill: '#ec4899',
      displayValue: 30000,
      ratio: '3%',
    },
    { 
      name: 'Affiliate', 
      value: 20000, 
      fill: '#ec4899', 
      displayValue: 20000,
      ratio: '2%',
    },
    { 
      name: 'Total', 
      value: 1000000, 
      fill: '#ec4899', 
      isTotal: true,
      displayValue: 1000000,
      ratio: '100%',
    },
  ];

  if (!data || data.length === 0) {
    return defaultData;
  }

  // Safely calculate total revenue
  const totalRevenue = data.reduce((sum, channel) => {
    const revenue = Number(channel?.revenue) || 0;
    return sum + revenue;
  }, 0);
  
  // If total revenue is 0 or NaN, use default values
  if (!totalRevenue || isNaN(totalRevenue)) {
    return defaultData;
  }
  
  // Calculate baseline (70% of total as per example)
  const baselineRevenue = totalRevenue * 0.7;
  
  // Safely get channel revenue
  const getChannelRevenue = (id: string) => {
    const channel = data.find(c => c.id === id);
    const revenue = Number(channel?.revenue) || 0;
    return isNaN(revenue) ? 0 : revenue;
  };
  
  const groupedData = {
    baseline: baselineRevenue,
    search: getChannelRevenue('search'),
    social: getChannelRevenue('social'),
    video: getChannelRevenue('video'),
    display: getChannelRevenue('display'),
    email: getChannelRevenue('email'),
    affiliate: getChannelRevenue('affiliate'),
    total: totalRevenue,
  };
  
  // Safely calculate ratios with additional validation
  const calculateRatio = (value: number) => {
    if (!totalRevenue || isNaN(value) || value === 0) return '0%';
    const ratio = (value / totalRevenue) * 100;
    return `${Math.max(0, Math.min(100, ratio)).toFixed(1)}%`;
  };

  // Ensure all values are valid numbers
  const safeValue = (value: number) => isNaN(value) || value === null ? 0 : Math.max(0, value);

  const waterfallData: WaterfallDataItem[] = [
    { 
      name: 'Baseline', 
      value: safeValue(baselineRevenue),
      fill: '#1e293b',
      displayValue: safeValue(baselineRevenue),
      ratio: '70%',
    },
    { 
      name: 'Search', 
      value: safeValue(groupedData.search),
      fill: '#ec4899',
      displayValue: safeValue(groupedData.search),
      ratio: calculateRatio(groupedData.search),
    },
    { 
      name: 'Social', 
      value: safeValue(groupedData.social),
      fill: '#ec4899',
      displayValue: safeValue(groupedData.social),
      ratio: calculateRatio(groupedData.social),
    },
    { 
      name: 'Video', 
      value: safeValue(groupedData.video),
      fill: '#ec4899',
      displayValue: safeValue(groupedData.video),
      ratio: calculateRatio(groupedData.video),
    },
    { 
      name: 'Display', 
      value: safeValue(groupedData.display),
      fill: '#ec4899',
      displayValue: safeValue(groupedData.display),
      ratio: calculateRatio(groupedData.display),
    },
    { 
      name: 'Email', 
      value: safeValue(groupedData.email),
      fill: '#ec4899',
      displayValue: safeValue(groupedData.email),
      ratio: calculateRatio(groupedData.email),
    },
    { 
      name: 'Affiliate', 
      value: safeValue(groupedData.affiliate),
      fill: '#ec4899', 
      displayValue: safeValue(groupedData.affiliate),
      ratio: calculateRatio(groupedData.affiliate),
    },
    { 
      name: 'Total', 
      value: safeValue(totalRevenue),
      fill: '#ec4899', 
      isTotal: true,
      displayValue: safeValue(totalRevenue),
      ratio: '100%',
    },
  ];

  return waterfallData;
};
export function IncrementalRevenueWaterfallChart({ 
  data, 
  loading = false 
}: IncrementalRevenueWaterfallChartProps) {
  const waterfallData = prepareWaterfallData(data);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col space-y-1.5">
          <CardTitle className="text-2xl">Incremental Revenue by Channel</CardTitle>
          <CardDescription className="text-lg">
            Breakdown of how each channel contributes to total incremental revenue
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="h-[600px] -mt-6">
          <EnhancedWaterfallChart 
            data={waterfallData} 
            loading={loading} 
            height={600}
          />
        </div>
        <div className="mt-6 bg-muted/30 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <InfoIcon className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="text-lg font-medium mb-2">About This Chart</h3>
              <p className="text-base text-muted-foreground">
                This waterfall chart shows how each marketing channel contributes incrementally to your total revenue. 
                Baseline sales account for 70% of total revenue and represent sales that would occur without marketing activities. 
                Each colored segment shows the additional revenue contributed by different channels, totaling the remaining 30% 
                of incremental sales.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
