
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Info, TrendingUp, LineChart as LineChartIcon, PieChart, BarChart4, Activity, ArrowUpDown, AreaChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaTypeSelector, ChannelOption } from "@/components/dashboard/MediaTypeSelector";
import { MediaGroupBreakdownChart } from "@/components/dashboard/MediaGroupBreakdownChart";
import { MediaSaturationChart } from "@/components/dashboard/MediaSaturationChart";
import { ChannelBreakdownDisplay } from "@/components/dashboard/ChannelBreakdownDisplay";
import { ChannelInsights } from "@/components/dashboard/ChannelInsights";
import { MarginalReturnsChart } from "@/components/dashboard/MarginalReturnsChart";
import { mediaGroupColors } from "@/components/dashboard/MediaGroupBreakdownChart";
import { channelSaturationData } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { StackedAreaChart } from "@/components/dashboard/StackedAreaChart";

interface MediaTypeAnalysisSectionProps {
  mediaGroupData: any[];
  saturationData: any[];
  marginalReturnsData: any[];
  channelData: any[];
  mediaType: string;
  setMediaType: (type: string) => void;
  loading: boolean;
  channelOptions?: ChannelOption[];
  selectedChannel?: string;
  setSelectedChannel?: (channel: string) => void;
  timeSeriesData?: any[];
}

export function MediaTypeAnalysisSection({
  mediaGroupData,
  saturationData,
  marginalReturnsData,
  channelData,
  mediaType,
  setMediaType,
  loading,
  channelOptions = [],
  selectedChannel = "all",
  setSelectedChannel,
  timeSeriesData = []
}: MediaTypeAnalysisSectionProps) {
  const [insightView, setInsightView] = React.useState("breakdown");

  // Get the latest data for the selected media type
  const latestData = !loading && mediaGroupData.length > 0 
    ? mediaGroupData[mediaGroupData.length - 1] 
    : null;

  // Calculate growth rate from previous period (simulate by taking a ~5-15% change)
  const getGrowthRate = (type: string) => {
    const baseRate = Math.random() > 0.5 ? 
      5 + Math.random() * 10 : // positive 5-15%
      -1 * (5 + Math.random() * 10); // negative 5-15%
    return baseRate.toFixed(1);
  };

  // Generate summary metrics for the current media type
  const getMetricsForMediaType = () => {
    if (!latestData || mediaType === "all") return null;
    
    return {
      revenue: latestData[mediaType],
      contribution: Math.round((latestData[mediaType] / latestData.total) * 100),
      growth: getGrowthRate(mediaType),
      channelCount: channelOptions.filter(c => c.group === mediaType).length
    };
  };

  // Get media groups to display based on selected media type
  const getMediaGroupsToDisplay = () => {
    const allGroups = [
      { dataKey: "baseline", color: mediaGroupColors.baseline, label: "Baseline" },
      { dataKey: "nonPaid", color: mediaGroupColors.nonPaid, label: "Non-Paid Media" },
      { dataKey: "organic", color: mediaGroupColors.organic, label: "Organic Media" },
      { dataKey: "paid", color: mediaGroupColors.paid, label: "Paid Media" }
    ];
    
    if (mediaType === "all") {
      return allGroups;
    } else {
      // Return only the selected media type
      return allGroups.filter(group => group.dataKey === mediaType);
    }
  };

  const mediaTypeMetrics = getMetricsForMediaType();
  const mediaGroupsToDisplay = getMediaGroupsToDisplay();
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <MediaTypeSelector 
          activeType={mediaType} 
          onTypeChange={setMediaType}
          activeChannel={selectedChannel}
          onChannelChange={setSelectedChannel}
          channelOptions={channelOptions}
        />
        
        {/* Add summary stats for selected media type */}
        {mediaType !== "all" && mediaTypeMetrics && (
          <div className="mt-4 flex flex-wrap gap-6">
            <div>
              <div className="text-sm text-muted-foreground">Revenue</div>
              <div className="text-xl font-semibold mt-1">${mediaTypeMetrics.revenue.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Contribution</div>
              <div className="text-xl font-semibold mt-1">{mediaTypeMetrics.contribution}%</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Growth</div>
              <div className={`text-xl font-semibold mt-1 flex items-center ${Number(mediaTypeMetrics.growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Number(mediaTypeMetrics.growth) >= 0 ? '+' : ''}{mediaTypeMetrics.growth}%
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Channels</div>
              <div className="text-xl font-semibold mt-1">{mediaTypeMetrics.channelCount}</div>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">
            {mediaType === "all" ? "All Media Types" : 
             mediaType === "paid" ? "Paid Media Analysis" :
             mediaType === "organic" ? "Organic Media Analysis" :
             mediaType === "nonPaid" ? "Non-Paid Media Analysis" : 
             "Baseline Analysis"}
          </h3>
          
          {/* Add media type badge */}
          {mediaType !== "all" && (
            <Badge 
              variant="outline" 
              className="flex items-center gap-1"
              style={{ borderColor: mediaGroupColors[mediaType as keyof typeof mediaGroupColors] }}
            >
              <div 
                className="w-2 h-2 rounded-full mr-1"
                style={{ backgroundColor: mediaGroupColors[mediaType as keyof typeof mediaGroupColors] }}
              ></div>
              {mediaType === "paid" ? "Paid Media" :
               mediaType === "organic" ? "Organic Media" :
               mediaType === "nonPaid" ? "Non-Paid Media" : 
               "Baseline"}
            </Badge>
          )}
        </div>

        <Tabs
          defaultValue="breakdown"
          value={insightView}
          onValueChange={setInsightView}
          className="w-full mb-6"
        >
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="breakdown" className="flex items-center gap-1">
              <BarChart4 className="h-4 w-4" /> Breakdown
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-1">
              <AreaChart className="h-4 w-4" /> Trends Over Time
            </TabsTrigger>
            <TabsTrigger value="saturation" className="flex items-center gap-1">
              <LineChartIcon className="h-4 w-4" /> Saturation
            </TabsTrigger>
            <TabsTrigger value="marginal" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" /> Returns
            </TabsTrigger>
            {mediaType !== "all" && (
              <TabsTrigger value="channels" className="flex items-center gap-1">
                <Activity className="h-4 w-4" /> Channels
              </TabsTrigger>
            )}
          </TabsList>

          {/* Breakdown Chart */}
          <TabsContent value="breakdown" className="mt-0">
            <MediaGroupBreakdownChart
              data={mediaGroupData}
              mediaGroups={mediaGroupsToDisplay}
              loading={loading}
              height={400}
              stacked={true}
            />
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> 
                This chart shows the monthly contribution of {mediaType === "all" ? "each media type" : "the selected media type"} to total revenue.
                {selectedChannel !== "all" && " Filtered by selected channel."}
              </p>
            </div>
          </TabsContent>

          {/* Trends Over Time Chart */}
          <TabsContent value="trends" className="mt-0">
            <StackedAreaChart 
              data={timeSeriesData}
              areaGroups={mediaGroupsToDisplay}
              loading={loading}
              height={400}
              xAxisKey="date"
            />
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> 
                This stacked area chart visualizes how {mediaType === "all" ? "each media group" : "the selected media group"} contributes to the total revenue over time, 
                showing both proportional and absolute changes.
              </p>
            </div>
          </TabsContent>

          {/* Saturation Chart */}
          <TabsContent value="saturation" className="mt-0">
            <MediaSaturationChart
              data={saturationData}
              curves={[
                { dataKey: "search", color: channelSaturationData.search.color, label: "Search" },
                { dataKey: "social", color: channelSaturationData.social.color, label: "Social" },
                { dataKey: "display", color: channelSaturationData.display.color, label: "Display" }
              ]}
              loading={loading}
              height={400}
            />
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> 
                Saturation curves show how incremental revenue changes as media spend increases, highlighting diminishing returns.
                <span className="font-medium ml-1">Current spending points are marked with white centers, and maximum saturation points with black dots.</span>
              </p>
            </div>
          </TabsContent>

          {/* Marginal Returns Chart */}
          <TabsContent value="marginal" className="mt-0">
            <MarginalReturnsChart data={marginalReturnsData} />
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> 
                The marginal returns chart shows the average and incremental return on ad spend (ROAS) at different spending levels.
                <span className="font-medium">Note:</span> When the marginal ROAS drops below 1.0, additional spend becomes unprofitable.
              </p>
            </div>
          </TabsContent>

          {/* Channels Chart */}
          {mediaType !== "all" && (
            <TabsContent value="channels" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ChannelBreakdownDisplay 
                  channelData={channelData} 
                  loading={loading} 
                  mediaType={mediaType} 
                />
                <ChannelInsights 
                  mediaType={mediaType} 
                />
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}

