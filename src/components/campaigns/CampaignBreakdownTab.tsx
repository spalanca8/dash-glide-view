
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  BarChart3, 
  DollarSign, 
  Users, 
  Percent, 
  BarChart4, 
  LineChart,
  Globe,
  Image,
  Video,
  MessageSquare,
  Music,
  Gift,
  ShoppingBag,
  ChevronRight,
  Sparkles,
  PieChart,
  Share2
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterExportControls } from "@/components/channels/FilterExportControls";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { CampaignCostMetricsChart } from "./CampaignCostMetricsChart";

interface CampaignBreakdownTabProps {
  campaignData: any;
  loading: boolean;
  campaign: {
    id: string;
    name: string;
  };
}

export const CampaignBreakdownTab: React.FC<CampaignBreakdownTabProps> = ({
  campaignData,
  loading,
  campaign
}) => {
  if (loading) {
    return <div className="space-y-6">
      <Skeleton className="h-12 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
      <Skeleton className="h-[350px] w-full" />
    </div>;
  }
  
  if (!campaignData) {
    return <div className="text-center py-12">
      <h3 className="text-lg font-medium text-muted-foreground">Select a campaign to view detailed breakdown</h3>
    </div>;
  }
  
  const roas = campaignData.revenue / campaignData.cost;
  const ctr = (campaignData.clicks / campaignData.impressions) * 100;
  const conversionRate = (campaignData.conversions / campaignData.clicks) * 100;
  
  // Generate cost metrics data
  const costMetricsData = campaignData.dailyData.map((day: any) => {
    const cpc = day.cost / Math.max(day.clicks, 1); // Cost per click
    const cpm = (day.cost / Math.max(day.impressions, 1)) * 1000; // Cost per 1000 impressions
    const cpv = day.cost / Math.max(day.impressions * 0.4, 1); // Cost per view (assuming 40% of impressions are views)
    
    return {
      date: day.date,
      cpc,
      cpm,
      cpv
    };
  });

  // Define creative types based on campaign ID
  // Different creative types for each campaign
  const getCreativesForCampaign = (campaignId: string) => {
    switch (campaignId) {
      case "camp1": // Summer Sale 2023
        return {
          creativeTypesIcons: {
            "video": <Video className="h-4 w-4 text-primary" />,
            "image": <Image className="h-4 w-4 text-primary" />,
            "carousel": <BarChart4 className="h-4 w-4 text-primary" />
          },
          creatives: [
            {
              type: "video",
              name: "Summer Lifestyle Video",
              performance: 92,
              impressions: 348259,
              clicks: 14732,
              ctr: 4.2
            },
            {
              type: "image",
              name: "Beach Collection Banner",
              performance: 87,
              impressions: 286427,
              clicks: 11457,
              ctr: 4.0
            },
            {
              type: "carousel",
              name: "Swimwear Collection Carousel",
              performance: 76,
              impressions: 192845,
              clicks: 6750,
              ctr: 3.5
            }
          ]
        };
        
      case "camp2": // Holiday Promotion
        return {
          creativeTypesIcons: {
            "image": <Image className="h-4 w-4 text-primary" />,
            "gift": <Gift className="h-4 w-4 text-primary" />,
            "message": <MessageSquare className="h-4 w-4 text-primary" />
          },
          creatives: [
            {
              type: "gift",
              name: "Gift Guide Interactive Feature",
              performance: 95,
              impressions: 392158,
              clicks: 18912,
              ctr: 4.8
            },
            {
              type: "image",
              name: "Holiday Family Portrait",
              performance: 89,
              impressions: 274235,
              clicks: 12615,
              ctr: 4.6
            },
            {
              type: "message",
              name: "Season's Greetings Message",
              performance: 82,
              impressions: 186452,
              clicks: 7832,
              ctr: 4.2
            }
          ]
        };
        
      case "camp3": // Back to School
        return {
          creativeTypesIcons: {
            "shopping": <ShoppingBag className="h-4 w-4 text-primary" />,
            "video": <Video className="h-4 w-4 text-primary" />,
            "carousel": <ChevronRight className="h-4 w-4 text-primary" />
          },
          creatives: [
            {
              type: "shopping",
              name: "Student Essentials Bundle",
              performance: 91,
              impressions: 325640,
              clicks: 15942,
              ctr: 4.9
            },
            {
              type: "video",
              name: "Dorm Room Makeover Video",
              performance: 84,
              impressions: 246580,
              clicks: 10108,
              ctr: 4.1
            },
            {
              type: "carousel",
              name: "School Supplies Guide",
              performance: 79,
              impressions: 187420,
              clicks: 7121,
              ctr: 3.8
            }
          ]
        };
        
      case "camp4": // Spring Collection
        return {
          creativeTypesIcons: {
            "sparkles": <Sparkles className="h-4 w-4 text-primary" />,
            "image": <Image className="h-4 w-4 text-primary" />,
            "pie": <PieChart className="h-4 w-4 text-primary" />
          },
          creatives: [
            {
              type: "sparkles",
              name: "New Arrivals Showcase",
              performance: 94,
              impressions: 368750,
              clicks: 17532,
              ctr: 4.8
            },
            {
              type: "image",
              name: "Spring Lookbook Gallery",
              performance: 86,
              impressions: 264920,
              clicks: 11394,
              ctr: 4.3
            },
            {
              type: "pie",
              name: "Color Trends Infographic",
              performance: 80,
              impressions: 198640,
              clicks: 7648,
              ctr: 3.9
            }
          ]
        };
        
      case "camp5": // Black Friday
        return {
          creativeTypesIcons: {
            "shopping": <ShoppingBag className="h-4 w-4 text-primary" />,
            "music": <Music className="h-4 w-4 text-primary" />,
            "share": <Share2 className="h-4 w-4 text-primary" />
          },
          creatives: [
            {
              type: "shopping",
              name: "Doorbusters Countdown Timer",
              performance: 97,
              impressions: 452180,
              clicks: 24868,
              ctr: 5.5
            },
            {
              type: "music",
              name: "Shopping Playlist Interactive Ad",
              performance: 91,
              impressions: 312460,
              clicks: 15935,
              ctr: 5.1
            },
            {
              type: "share",
              name: "Flash Sale Social Share Card",
              performance: 85,
              impressions: 224980,
              clicks: 10349,
              ctr: 4.6
            }
          ]
        };
        
      default:
        return {
          creativeTypesIcons: {
            "video": <Video className="h-4 w-4 text-primary" />,
            "image": <Image className="h-4 w-4 text-primary" />,
            "message": <MessageSquare className="h-4 w-4 text-primary" />
          },
          creatives: [
            {
              type: "video",
              name: "Product Demo Video",
              performance: 92,
              impressions: 348259,
              clicks: 14732,
              ctr: 4.2
            },
            {
              type: "image",
              name: "Lifestyle Banner Image",
              performance: 87,
              impressions: 286427,
              clicks: 11457,
              ctr: 4.0
            },
            {
              type: "message",
              name: "Customer Testimonials",
              performance: 76,
              impressions: 192845,
              clicks: 6750,
              ctr: 3.5
            }
          ]
        };
    }
  };
  
  // Get creatives based on the current campaign
  const { creativeTypesIcons, creatives } = getCreativesForCampaign(campaign.id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Campaign Breakdown: {campaign.name}</h2>
        <FilterExportControls 
          filterOptions={{ 
            metrics: true,
            channels: false
          }}
        />
      </div>
      
      {/* Key campaign metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Campaign Revenue"
          value={`$${campaignData.revenue.toLocaleString()}`}
          change={7.2}
          description="vs. previous period"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Campaign ROAS"
          value={`${roas.toFixed(2)}x`}
          change={4.5}
          description="vs. previous period"
          icon={<BarChart3 className="h-4 w-4" />}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${conversionRate.toFixed(2)}%`}
          change={2.3}
          description="vs. previous period"
          icon={<Percent className="h-4 w-4" />}
        />
        <MetricCard
          title="CTR"
          value={`${ctr.toFixed(2)}%`}
          change={-1.1}
          description="vs. previous period"
          icon={<Users className="h-4 w-4" />}
        />
      </div>
      
      {/* Performance over time */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance Over Time</CardTitle>
          <CardDescription>Daily metrics for the selected campaign</CardDescription>
        </CardHeader>
        <CardContent>
          <PerformanceChart
            data={campaignData.dailyData}
            lines={[
              {
                dataKey: "revenue",
                color: "#4361ee",
                label: "Revenue",
                yAxisId: "left"
              },
              {
                dataKey: "cost",
                color: "#f72585",
                label: "Cost",
                yAxisId: "left"
              }
            ]}
            height={350}
          />
        </CardContent>
      </Card>
      
      {/* NEW: Campaign Cost Metrics Chart */}
      <CampaignCostMetricsChart 
        data={costMetricsData}
        loading={loading}
      />
      
      {/* Creative performance with campaign-specific creatives */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Creatives</CardTitle>
          <CardDescription>Performance analysis of campaign creatives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {creatives.map((creative: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    {creativeTypesIcons[creative.type]}
                    <span className="font-medium">{creative.name}</span>
                  </div>
                  <span className="text-sm">Performance Score: {creative.performance}/100</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex gap-2 items-center">
                    <BarChart4 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Impressions:</span>
                    <span className="font-medium">{creative.impressions.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Clicks:</span>
                    <span className="font-medium">{creative.clicks.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Percent className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">CTR:</span>
                    <span className="font-medium">{creative.ctr}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full bg-primary"
                    style={{ width: `${creative.performance}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Audience & Geographic Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Target Audience</CardTitle>
            <CardDescription>Primary demographics for this campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="text-sm font-medium mb-1">Age Groups</h4>
                  <div className="flex flex-wrap gap-2">
                    {campaignData.targetAudience.map((age: string, index: number) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {age}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <LineChart className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="text-sm font-medium mb-1">Engagement Metrics</h4>
                  <p className="text-sm text-muted-foreground">
                    This campaign has a {conversionRate > 3 ? "high" : conversionRate > 1.5 ? "moderate" : "low"} conversion rate of {conversionRate.toFixed(2)}% 
                    with a {ctr > 3 ? "strong" : ctr > 1.5 ? "average" : "weak"} CTR of {ctr.toFixed(2)}%.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <BarChart3 className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="text-sm font-medium mb-1">Performance Assessment</h4>
                  <p className="text-sm text-muted-foreground">
                    Overall campaign efficiency is {roas > 4 ? "excellent" : roas > 2 ? "good" : "needs improvement"} 
                    with a ROAS of {roas.toFixed(2)}x.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Campaign performance by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignData.geographicData.map((region: any, index: number) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{region.region}</span>
                    </div>
                    <span className="text-sm">{region.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${region.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
