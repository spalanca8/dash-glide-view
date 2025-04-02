
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
    if (!data || data.length === 0) return [];

    // Calculate total revenue
    const totalRevenue = data.reduce((sum, channel) => sum + channel.revenue, 0);
    
    // Calculate baseline (70% of total as per example)
    const baselineRevenue = totalRevenue * 0.7;
    
    // Group channels by type for the waterfall display
    const groupedData = {
      baseline: baselineRevenue,
      search: data.find(c => c.id === 'search')?.revenue || 0,
      social: data.find(c => c.id === 'social')?.revenue || 0,
      video: data.find(c => c.id === 'video')?.revenue || 0,
      display: data.find(c => c.id === 'display')?.revenue || 0,
      email: data.find(c => c.id === 'email')?.revenue || 0,
      affiliate: data.find(c => c.id === 'affiliate')?.revenue || 0,
      total: totalRevenue,
    };
    
    // Calculate ratios for each channel against total
    const searchRatio = ((groupedData.search / totalRevenue) * 100).toFixed(1);
    const socialRatio = ((groupedData.social / totalRevenue) * 100).toFixed(1);
    const videoRatio = ((groupedData.video / totalRevenue) * 100).toFixed(1);
    const displayRatio = ((groupedData.display / totalRevenue) * 100).toFixed(1);
    const emailRatio = ((groupedData.email / totalRevenue) * 100).toFixed(1);
    const affiliateRatio = ((groupedData.affiliate / totalRevenue) * 100).toFixed(1);
    
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
        ratio: `${searchRatio}%`,
      },
      { 
        name: 'Social', 
        value: groupedData.social, 
        fill: '#ec4899',
        displayValue: groupedData.social,
        ratio: `${socialRatio}%`,
      },
      { 
        name: 'Video', 
        value: groupedData.video, 
        fill: '#ec4899',
        displayValue: groupedData.video,
        ratio: `${videoRatio}%`,
      },
      { 
        name: 'Display', 
        value: groupedData.display, 
        fill: '#ec4899',
        displayValue: groupedData.display,
        ratio: `${displayRatio}%`,
      },
      { 
        name: 'Email', 
        value: groupedData.email, 
        fill: '#ec4899',
        displayValue: groupedData.email,
        ratio: `${emailRatio}%`,
      },
      { 
        name: 'Affiliate', 
        value: groupedData.affiliate, 
        fill: '#ec4899', 
        displayValue: groupedData.affiliate,
        ratio: `${affiliateRatio}%`,
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
