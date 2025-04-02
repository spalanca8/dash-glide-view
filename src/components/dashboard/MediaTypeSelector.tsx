
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { mediaGroupColors } from "./MediaGroupBreakdownChart";
import { ChannelDropdown } from "./ChannelDropdown";

export interface ChannelOption {
  value: string;
  label: string;
  color?: string;
  group: string;
}

type MediaTypeSelectorProps = {
  activeType: string;
  onTypeChange: (type: string) => void;
  activeChannel?: string;
  onChannelChange?: (channel: string) => void;
  channelOptions?: ChannelOption[];
};

export function MediaTypeSelector({
  activeType,
  onTypeChange,
  activeChannel = "all",
  onChannelChange,
  channelOptions = []
}: MediaTypeSelectorProps) {
  // Filter channels by the currently active media type
  const filteredChannels = channelOptions.filter(
    channel => activeType === "all" || channel.group === activeType
  );

  const handleMediaTypeChange = (type: string) => {
    onTypeChange(type);
    // Reset channel selection when media type changes
    if (onChannelChange) {
      onChannelChange("all");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium">Media Type Analysis</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Info className="h-4 w-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p>Compare performance across different media types to understand incremental contribution.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Tabs
        defaultValue="all"
        value={activeType}
        onValueChange={handleMediaTypeChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            All
          </TabsTrigger>
          <TabsTrigger value="paid" className="border-l-2" style={{ borderColor: mediaGroupColors.paid }}>
            Paid
          </TabsTrigger>
          <TabsTrigger value="organic" className="border-l-2" style={{ borderColor: mediaGroupColors.organic }}>
            Organic
          </TabsTrigger>
          <TabsTrigger value="nonPaid" className="border-l-2" style={{ borderColor: mediaGroupColors.nonPaid }}>
            Non-Paid
          </TabsTrigger>
          <TabsTrigger value="baseline" className="border-l-2" style={{ borderColor: mediaGroupColors.baseline }}>
            Baseline
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Channel dropdown selector */}
      {filteredChannels.length > 0 && onChannelChange && (
        <div className="pt-2">
          <div className="text-sm text-muted-foreground mb-2">Select Channel</div>
          <ChannelDropdown
            channels={filteredChannels}
            value={activeChannel}
            onChange={onChannelChange}
            placeholder="Select a channel"
            disabled={activeType === "all"}
          />
        </div>
      )}
    </div>
  );
}
