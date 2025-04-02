
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, MapPin, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { channelColors, channelNames } from "@/data/mockData";

interface ChannelJourneyComparisonProps {
  data: {
    channels: Array<{
      id: string;
      name: string;
      colorClass: string;
      conversions: number;
      journeyContribution: {
        awareness: number;
        consideration: number;
        conversion: number;
        advocacy: number;
      };
    }>;
  };
  loading: boolean;
}

export const ChannelJourneyComparison: React.FC<ChannelJourneyComparisonProps> = ({
  data,
  loading
}) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    );
  }

  // Journey stage labels
  const journeyStages = [
    { id: "awareness", label: "Beginning of Path" },
    { id: "consideration", label: "Middle of Path" },
    { id: "conversion", label: "Near Conversion" },
    { id: "advocacy", label: "Post-Conversion" }
  ];
  
  // Helper to get color intensity based on percentage
  const getColorIntensity = (percentage: number): string => {
    if (percentage === 0) return "bg-gray-100 opacity-30";
    if (percentage < 10) return "opacity-40";
    if (percentage < 20) return "opacity-60";
    if (percentage < 30) return "opacity-80";
    return "opacity-100";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Customer Journey Driver Analysis
            </CardTitle>
            <CardDescription>
              Channel effectiveness at different stages of the customer journey
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Info className="h-4 w-4" /> How this works
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[750px]">
            {/* Header */}
            <div className="grid grid-cols-12 mb-6">
              <div className="col-span-3 px-2 font-medium text-sm">Channel</div>
              <div className="col-span-6 grid grid-cols-4 gap-1 px-2">
                {journeyStages.map((stage) => (
                  <div key={stage.id} className="text-center font-medium text-sm">
                    {stage.label}
                  </div>
                ))}
              </div>
              <div className="col-span-3 text-right px-2 font-medium text-sm"># Conversions</div>
            </div>

            {/* Channel rows */}
            <div className="space-y-3">
              {data.channels.map((channel, index) => {
                // Get channel color from the standardized colors
                const channelColor = channel.id in channelColors
                  ? `bg-[${channelColors[channel.id as keyof typeof channelColors]}]`
                  : channel.colorClass;
                
                return (
                  <div key={index} className="grid grid-cols-12 items-center">
                    {/* Channel name */}
                    <div className={`col-span-3 p-2 rounded-l-md ${channelColor} bg-opacity-20 font-medium`}>
                      {channelNames[channel.id as keyof typeof channelNames] || channel.name}
                    </div>
                    
                    {/* Journey stages */}
                    <div className="col-span-6 grid grid-cols-4 gap-1 p-1">
                      {Object.entries(channel.journeyContribution).map(([stage, percentage], i) => {
                        // Ensure all percentages have a value (even if 0%)
                        const displayPercentage = percentage || 0;
                        return (
                          <div key={stage} className="flex justify-center p-1">
                            <div 
                              className={`h-8 w-8 rounded-md flex items-center justify-center bg-blue-500 ${getColorIntensity(displayPercentage)}`}
                              title={`${displayPercentage}% contribution at ${journeyStages[i]?.label}`}
                            >
                              <span className="text-xs font-medium text-white">
                                {`${displayPercentage}%`}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Conversions */}
                    <div className="col-span-3 p-2 rounded-r-md bg-gray-100 text-right font-medium">
                      {channel.conversions.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-8 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-100 opacity-30 rounded-sm"></div>
                  <span className="text-xs text-muted-foreground">0%</span>
                </div>
                <div className="flex items-center space-x-2">
                  {[10, 20, 30, 40, 50].map((value, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className={`w-4 h-4 bg-blue-500 ${getColorIntensity(value)} rounded-sm`}></div>
                      <span className="text-xs text-muted-foreground">
                        {`${value}%`}
                        {value === 50 ? "+" : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-xs text-muted-foreground max-w-[200px] text-right">
                % reflects the overall weighting of a channel at a particular position in the path
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
