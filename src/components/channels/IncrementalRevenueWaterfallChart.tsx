
import React from "react";
import { EnhancedWaterfallChart } from "@/components/dashboard/EnhancedWaterfallChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";
import { channelColors } from "@/data/mockData";

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
      name: 'Google Ads', 
      value: 80000, 
      fill: channelColors.google,
      displayValue: 80000,
      ratio: '8%',
    },
    { 
      name: 'Facebook Ads', 
      value: 70000, 
      fill: channelColors.facebook,
      displayValue: 70000,
      ratio: '7%',
    },
    { 
      name: 'TikTok Ads', 
      value: 50000, 
      fill: channelColors.tiktok,
      displayValue: 50000,
      ratio: '5%',
    },
    { 
      name: 'Video Advertising', 
      value: 60000, 
      fill: channelColors.video,
      displayValue: 60000,
      ratio: '6%',
    },
    { 
      name: 'Email Marketing', 
      value: 30000, 
      fill: channelColors.email,
      displayValue: 30000,
      ratio: '3%',
    },
    { 
      name: 'Affiliate Marketing', 
      value: 10000, 
      fill: channelColors.affiliate, 
      displayValue: 10000,
      ratio: '1%',
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

  // Calculate total revenue from all the specified channels and baseline
  const totalChannelsRevenue = data.reduce((sum, channel) => {
    if (channel && typeof channel.revenue === 'number') {
      return sum + channel.revenue;
    }
    return sum;
  }, 0);
  
  // If total revenue is 0 or NaN, use default values
  if (!totalChannelsRevenue || isNaN(totalChannelsRevenue)) {
    return defaultData;
  }
  
  // Calculate baseline as 70% of the total
  const baselineRevenue = totalChannelsRevenue * 0.7;
  
  // The remaining 30% will be distributed among the channels
  const incrementalRevenue = totalChannelsRevenue - baselineRevenue;
  
  // Get revenue for each requested channel
  const getChannelRevenue = (id: string) => {
    const channel = data.find(c => c.id === id);
    return channel && typeof channel.revenue === 'number' ? channel.revenue : 0;
  };
  
  // Get the sum of all incremental channel revenues to calculate proportions
  const googleRevenue = getChannelRevenue('google');
  const facebookRevenue = getChannelRevenue('facebook');
  const tiktokRevenue = getChannelRevenue('tiktok');
  const videoRevenue = getChannelRevenue('video');
  const emailRevenue = getChannelRevenue('email');
  const affiliateRevenue = getChannelRevenue('affiliate');
  
  const totalIncrementalRaw = googleRevenue + facebookRevenue + tiktokRevenue + 
                              videoRevenue + emailRevenue + affiliateRevenue;
  
  // Calculate proportions for each channel of the incremental 30%
  const calculateAdjustedValue = (channelRevenue: number) => {
    if (totalIncrementalRaw === 0) return 0;
    return (channelRevenue / totalIncrementalRaw) * incrementalRevenue;
  };
  
  // Adjusted revenues to ensure they sum to exactly 30% of total
  const adjustedGoogleRevenue = calculateAdjustedValue(googleRevenue);
  const adjustedFacebookRevenue = calculateAdjustedValue(facebookRevenue);
  const adjustedTiktokRevenue = calculateAdjustedValue(tiktokRevenue);
  const adjustedVideoRevenue = calculateAdjustedValue(videoRevenue);
  const adjustedEmailRevenue = calculateAdjustedValue(emailRevenue);
  const adjustedAffiliateRevenue = calculateAdjustedValue(affiliateRevenue);
  
  // Ensure we have valid numbers
  const safeValue = (value: number) => isNaN(value) || value === null ? 0 : Math.max(0, value);
  
  // Calculate percentage of total for each channel
  const calculateRatio = (value: number) => {
    if (!totalChannelsRevenue || isNaN(value) || value === 0) return '0%';
    const ratio = (value / totalChannelsRevenue) * 100;
    return `${Math.max(0, Math.min(100, ratio)).toFixed(1)}%`;
  };

  // Create the waterfall data array with the specified channels only
  const waterfallData: WaterfallDataItem[] = [
    { 
      name: 'Baseline', 
      value: safeValue(baselineRevenue),
      fill: '#1e293b',
      displayValue: safeValue(baselineRevenue),
      ratio: calculateRatio(baselineRevenue),
    },
    { 
      name: 'Video Advertising', 
      value: safeValue(adjustedVideoRevenue),
      fill: channelColors.video,
      displayValue: safeValue(adjustedVideoRevenue),
      ratio: calculateRatio(adjustedVideoRevenue),
    },
    { 
      name: 'Google Ads', 
      value: safeValue(adjustedGoogleRevenue),
      fill: channelColors.google,
      displayValue: safeValue(adjustedGoogleRevenue),
      ratio: calculateRatio(adjustedGoogleRevenue),
    },
    { 
      name: 'TikTok Ads', 
      value: safeValue(adjustedTiktokRevenue),
      fill: channelColors.tiktok,
      displayValue: safeValue(adjustedTiktokRevenue),
      ratio: calculateRatio(adjustedTiktokRevenue),
    },
    { 
      name: 'Facebook Ads', 
      value: safeValue(adjustedFacebookRevenue),
      fill: channelColors.facebook,
      displayValue: safeValue(adjustedFacebookRevenue),
      ratio: calculateRatio(adjustedFacebookRevenue),
    },
    { 
      name: 'Email Marketing', 
      value: safeValue(adjustedEmailRevenue),
      fill: channelColors.email,
      displayValue: safeValue(adjustedEmailRevenue),
      ratio: calculateRatio(adjustedEmailRevenue),
    },
    { 
      name: 'Affiliate Marketing', 
      value: safeValue(adjustedAffiliateRevenue),
      fill: channelColors.affiliate, 
      displayValue: safeValue(adjustedAffiliateRevenue),
      ratio: calculateRatio(adjustedAffiliateRevenue),
    },
    { 
      name: 'Total', 
      value: safeValue(totalChannelsRevenue),
      fill: '#ec4899', 
      isTotal: true,
      displayValue: safeValue(totalChannelsRevenue),
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
