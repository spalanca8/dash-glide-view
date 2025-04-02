
import React from "react";
import { ArrowUp } from "lucide-react";

interface ChannelBreakdownDisplayProps {
  channelData: any[];
  loading: boolean;
  mediaType: string;
}

export function ChannelBreakdownDisplay({ channelData, loading, mediaType }: ChannelBreakdownDisplayProps) {
  if (loading) {
    return <div className="animate-pulse h-64 bg-muted rounded-lg"></div>;
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">
        {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} Media Channel Breakdown
      </h3>
      <div className="space-y-6">
        {channelData.map((channel, index) => {
          const totalValue = channelData.reduce((sum, ch) => sum + ch.value, 0);
          const percentage = ((channel.value / totalValue) * 100).toFixed(1);
          
          return (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: channel.color }}
                  ></div>
                  <span className="font-medium">{channel.name}</span>
                </div>
                <div className="flex items-center text-sm font-medium">
                  <ArrowUp className="h-3 w-3 mr-1 text-green-600" />
                  <span>${channel.value.toLocaleString()} ({percentage}%)</span>
                </div>
              </div>
              
              <div className="w-full bg-accent rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: channel.color,
                  }}
                ></div>
              </div>
              <div className="text-xs text-right mt-1 text-muted-foreground">
                {percentage}% of total
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
