
import React from "react";
import { ChannelSaturationCurve } from "../channels/ChannelSaturationCurve";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import { channelColors } from "@/data/mockData";

type ChannelSaturationCurvePanelProps = {
  activeScenario: string;
  customBudgets: Record<string, Record<string, number>>;
};

export function ChannelSaturationCurvePanel({ 
  activeScenario,
  customBudgets 
}: ChannelSaturationCurvePanelProps) {
  // Channel types to display
  const channelTypes = [
    { id: "search", name: "Search Advertising", color: channelColors.search },
    { id: "social", name: "Social Media", color: channelColors.social },
    { id: "display", name: "Display Advertising", color: channelColors.display },
    { id: "video", name: "Video Advertising", color: channelColors.video },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <CardTitle>Channel Saturation Curves</CardTitle>
        </div>
        <CardDescription>
          Visualize how spending changes affect performance along each channel's response curve
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            {channelTypes.map((channel) => (
              <TabsTrigger key={channel.id} value={channel.id}>
                {channel.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {channelTypes.map((channel) => (
            <TabsContent key={channel.id} value={channel.id}>
              <ChannelSaturationCurve 
                channelId={channel.id} 
                channelName={channel.name} 
                color={channel.color} 
                activeScenario={activeScenario}
                customBudgets={customBudgets}
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
