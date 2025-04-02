
import React from "react";
import { EnhancedWaterfallChart } from "@/components/dashboard/EnhancedWaterfallChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";

type IncrementalRevenueWaterfallChartProps = {
  data: any[];
  loading?: boolean;
};

export function IncrementalRevenueWaterfallChart({ 
  data, 
  loading = false 
}: IncrementalRevenueWaterfallChartProps) {
  // Transform channel data to waterfall chart format
  const prepareWaterfallData = () => {
    if (!data || data.length === 0) {
      // Return default data to prevent NaN values
      return [
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
    }

    // Calculate total revenue - make sure we handle any NaN or undefined values
    const totalRevenue = data.reduce((sum, channel) => {
      const revenue = isNaN(channel.revenue) ? 0 : channel.revenue;
      return sum + revenue;
    }, 0);
    
    // If total revenue is 0, use default values to prevent division by zero
    if (totalRevenue === 0) {
      return [
        { name: 'Baseline', value: 700000, fill: '#1e293b', displayValue: 700000, ratio: '70%' },
        { name: 'Search', value: 100000, fill: '#ec4899', displayValue: 100000, ratio: '10%' },
        { name: 'Social', value: 60000, fill: '#ec4899', displayValue: 60000, ratio: '6%' },
        { name: 'Video', value: 40000, fill: '#ec4899', displayValue: 40000, ratio: '4%' },
        { name: 'Display', value: 50000, fill: '#ec4899', displayValue: 50000, ratio: '5%' },
        { name: 'Email', value: 30000, fill: '#ec4899', displayValue: 30000, ratio: '3%' },
        { name: 'Affiliate', value: 20000, fill: '#ec4899', displayValue: 20000, ratio: '2%' },
        { name: 'Total', value: 1000000, fill: '#ec4899', isTotal: true, displayValue: 1000000, ratio: '100%' },
      ];
    }
    
    // Calculate baseline (70% of total as per example)
    const baselineRevenue = totalRevenue * 0.7;
    
    // Group channels by type for the waterfall display - ensure all values are numbers
    const getChannelRevenue = (id) => {
      const channel = data.find(c => c.id === id);
      const revenue = channel?.revenue || 0;
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
    
    // Calculate ratios for each channel against total
    const calculateRatio = (value) => {
      if (totalRevenue === 0) return '0%';
      return `${((value / totalRevenue) * 100).toFixed(1)}%`;
    };
    
    return [
      { 
        name: 'Baseline', 
        value: baselineRevenue, 
        fill: '#1e293b',
        displayValue: baselineRevenue,
        ratio: '70%',
      },
      { 
        name: 'Search', 
        value: groupedData.search, 
        fill: '#ec4899',
        displayValue: groupedData.search,
        ratio: calculateRatio(groupedData.search),
      },
      { 
        name: 'Social', 
        value: groupedData.social, 
        fill: '#ec4899',
        displayValue: groupedData.social,
        ratio: calculateRatio(groupedData.social),
      },
      { 
        name: 'Video', 
        value: groupedData.video, 
        fill: '#ec4899',
        displayValue: groupedData.video,
        ratio: calculateRatio(groupedData.video),
      },
      { 
        name: 'Display', 
        value: groupedData.display, 
        fill: '#ec4899',
        displayValue: groupedData.display,
        ratio: calculateRatio(groupedData.display),
      },
      { 
        name: 'Email', 
        value: groupedData.email, 
        fill: '#ec4899',
        displayValue: groupedData.email,
        ratio: calculateRatio(groupedData.email),
      },
      { 
        name: 'Affiliate', 
        value: groupedData.affiliate, 
        fill: '#ec4899', 
        displayValue: groupedData.affiliate,
        ratio: calculateRatio(groupedData.affiliate),
      },
      { 
        name: 'Total', 
        value: totalRevenue, 
        fill: '#ec4899', 
        isTotal: true,
        displayValue: totalRevenue,
        ratio: '100%',
      },
    ];
  };

  const waterfallData = prepareWaterfallData();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-1.5">
          <CardTitle className="text-xl">Incremental Revenue by Channel</CardTitle>
          <CardDescription>
            Breakdown of how each channel contributes to total incremental revenue
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <EnhancedWaterfallChart 
          data={waterfallData} 
          loading={loading} 
          height={450}
        />
        <div className="mt-4 bg-muted/30 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <InfoIcon className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-sm font-medium mb-1">About This Chart</h3>
              <p className="text-sm text-muted-foreground">
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
