import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList
} from "recharts";
import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Gradient color palette with rounded corners
const categoryColors = {
  baseline: "url(#baselineGradient)",  // Purple gradient
  googleads: "url(#googleadsGradient)",
  facebookads: "url(#facebookadsGradient)",
  youtubeads: "url(#youtubeadsGradient)",
  tiktokads: "url(#tiktokadsGradient)",
  emailmarketing: "url(#emailmarketingGradient)",
  affiliatemarketing: "url(#affiliatemarketingGradient)",
  directtraffic: "url(#directtrafficGradient)",
  referraltraffic: "url(#referraltrafficGradient)",
  organicsearch: "url(#organicsearchGradient)",
  organicsocial: "url(#organicsocialGradient)",
  searchadvertising: "url(#searchadvertisingGradient)",
  socialmedia: "url(#socialmediaGradient)",
  displayadvertising: "url(#displayadvertisingGradient)",
  videoadvertising: "url(#videoadvertisingGradient)",
  total: "url(#totalGradient)"        // Gray gradient
};

type WaterfallDataItem = {
  name: string;
  value: number;
  baseline: number;
  type: string;
  percentage?: string;
};

type EnhancedWaterfallChartProps = {
  data: any[];
  loading?: boolean;
  height?: number;
  className?: string;
};

const getRandomValue = () => Math.floor(Math.random() * 1000000) + 100000;

export function EnhancedWaterfallChart({
  data,
  loading = false,
  height = 400,
  className,
}: EnhancedWaterfallChartProps) {
  if (loading) {
    return (
      <div className={cn("w-full", className)}>
        <Skeleton className="w-full" style={{ height }} />
      </div>
    );
  }

  const prepareWaterfallData = (): WaterfallDataItem[] => {
    if (!data || data.length === 0) return [];
    
    const latestData = data[data.length - 1];
    const values = {
      baseline: latestData.baseline || getRandomValue()+10000000,
      googleads: latestData.googleads || getRandomValue(),
      facebookads: latestData.facebookads || getRandomValue(),
      youtubeads: latestData.youtubeads || getRandomValue(),
      tiktokads: latestData.tiktokads || getRandomValue(),
      emailmarketing: latestData.emailmarketing || getRandomValue(),
      affiliatemarketing: latestData.affiliatemarketing || getRandomValue(),
      directtraffic: latestData.directtraffic || getRandomValue(),
      referraltraffic: latestData.referraltraffic || getRandomValue(),
      organicsearch: latestData.organicsearch || getRandomValue(),
      organicsocial: latestData.organicsocial || getRandomValue(),
      searchadvertising: latestData.searchadvertising || getRandomValue(),
      socialmedia: latestData.socialmedia || getRandomValue(),
      displayadvertising: latestData.displayadvertising || getRandomValue(),
      videoadvertising: latestData.videoadvertising || getRandomValue(),
    };

    const total = Object.values(values).reduce((sum, val) => sum + val, 0);

    const channels = [
      { name: 'Baseline', value: values.baseline, type: 'Baseline' },
      { name: 'Google Ads', value: values.googleads, type: 'GoogleAds' },
      { name: 'Facebook Ads', value: values.facebookads, type: 'FacebookAds' },
      { name: 'YouTube Ads', value: values.youtubeads, type: 'YouTubeAds' },
      { name: 'TikTok Ads', value: values.tiktokads, type: 'TikTokAds' },
      { name: 'Email Marketing', value: values.emailmarketing, type: 'EmailMarketing' },
      { name: 'Affiliate Marketing', value: values.affiliatemarketing, type: 'AffiliateMarketing' },
      { name: 'Direct Traffic', value: values.directtraffic, type: 'DirectTraffic' },
      { name: 'Referral Traffic', value: values.referraltraffic, type: 'ReferralTraffic' },
      { name: 'Organic Search', value: values.organicsearch, type: 'OrganicSearch' },
      { name: 'Organic Social', value: values.organicsocial, type: 'OrganicSocial' },
      { name: 'Search Advertising', value: values.searchadvertising, type: 'SearchAdvertising' },
      { name: 'Social Media', value: values.socialmedia, type: 'SocialMedia' },
      { name: 'Display Advertising', value: values.displayadvertising, type: 'DisplayAdvertising' },
      { name: 'Video Advertising', value: values.videoadvertising, type: 'VideoAdvertising' },
      { name: 'Total', value: total, type: 'Total' }
    ];

    let cumulative = 0;
    return channels.map((channel, index) => {
      const item = {
        name: channel.name,
        value: channel.value,
        baseline: cumulative,
        type: channel.type,
        percentage: `${((channel.value / total) * 100).toFixed(1)}%`
      };
      if (channel.type !== 'Total') {
        cumulative += channel.value;
      } else {
        item.baseline = 0; // Ensuring the total bar starts at 0
      }
      return item;
    });
  };

  const waterfallData = prepareWaterfallData();

  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, value } = props;
    const percentage = waterfallData.find((item) => item.value === value)?.percentage;
    
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="#374151"
        textAnchor="middle"
        fontSize={12}
        fontWeight={500}
      >
        {percentage}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataItem = payload[0].payload;
      const percentage = ((dataItem.value / (waterfallData[waterfallData.length - 1].value)) * 100).toFixed(1);
      return (
        <Card className="shadow-lg border-border/60 rounded-lg">
          <CardContent className="py-3 px-4">
            <p className="font-medium" style={{ color: payload[0].color }}>
              {dataItem.name}
            </p>
            <p className="text-muted-foreground text-sm">
              Value: ${dataItem.value.toLocaleString()} ({percentage}%)
            </p>
            {dataItem.type !== 'Total' && (
              <p className="text-muted-foreground text-sm">
                Cumulative: ${(dataItem.baseline + dataItem.value).toLocaleString()}
              </p>
            )}
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  return (
    <div className={cn("w-full", className)}>
      <div style={{ height }} className="relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={waterfallData}
            margin={{ top: 40, right: 30, left: 20, bottom: 5 }}
            barGap={0}
            barCategoryGap={10}
          >
            <defs>
              <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#6D28D9" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#5B21B6" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="googleadsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4285F4" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#2B7DE9" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#1A73E8" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="facebookadsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1877F2" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#166BDB" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#1466C0" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="youtubeadsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF0000" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#E60000" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#CC0000" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="tiktokadsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000000" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#333333" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#666666" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="emailmarketingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#2563EB" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="affiliatemarketingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#7C3AED" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#6D28D9" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="directtrafficGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#059669" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#047857" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="referraltrafficGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#D97706" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#B45309" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="organicsearchGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#2563EB" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="organicsocialGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#059669" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#047857" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="searchadvertisingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#D97706" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#B45309" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="socialmediaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#7C3AED" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#6D28D9" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="displayadvertisingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#2563EB" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="videoadvertisingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF0000" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#E60000" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#CC0000" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="paidGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#E58E0A" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#D97706" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="organicGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#0CA678" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="nonPaidGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#3074E5" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6B7280" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#5A6371" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#4B5563" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fontWeight: 500, fill: "#374151" }}
              tickLine={false}
              axisLine={{ stroke: "#D1D5DB" }}
              angle={-45} // Rotate x-axis labels vertically
              textAnchor="end" // Align text properly when vertical
              interval={0} // Ensure all labels are shown
              height={90} // Increase height for x-axis labels
              padding={{ left: 20, right: 20 }} // Add padding for better spacing
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#374151" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Invisible baseline bar */}
            <Bar dataKey="baseline" stackId="a" fill="transparent" />
            
            {/* Visible waterfall bars with rounded corners */}
            <Bar
              dataKey="value"
              stackId="a"
              radius={[4, 4, 0, 0]} // Rounded top corners
            >
              {waterfallData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={categoryColors[entry.type.toLowerCase().replace(/ /g, '') as keyof typeof categoryColors]}
                />
              ))}
              <LabelList dataKey="value" content={renderCustomizedLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" /> 
          Waterfall visualization showing incremental contributions to total revenue.
        </p>
      </div>
    </div>
  );
}
