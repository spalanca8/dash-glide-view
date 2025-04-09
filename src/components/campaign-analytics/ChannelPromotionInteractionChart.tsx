
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for the channel-promotion interaction
const channelPromotionData = [
  {
    channel: "Paid Social",
    promoOn: 1450,
    promoOff: 920,
  },
  {
    channel: "Search",
    promoOn: 1280,
    promoOff: 1050,
  },
  {
    channel: "Display",
    promoOn: 950,
    promoOff: 750,
  },
  {
    channel: "Email",
    promoOn: 1680,
    promoOff: 780,
  },
  {
    channel: "TV",
    promoOn: 1250,
    promoOff: 950,
  },
  {
    channel: "Video",
    promoOn: 1100,
    promoOff: 870,
  },
  {
    channel: "Audio",
    promoOn: 830,
    promoOff: 670,
  },
];

export const ChannelPromotionInteractionChart = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="text-base font-medium mb-1">Media Channel Performance with Promotions</h3>
          <p className="text-sm text-muted-foreground">
            Incremental revenue by channel when promotions are active vs. inactive
          </p>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={channelPromotionData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="channel"
                label={{
                  value: 'Media Channels',
                  position: 'insideBottom',
                  offset: -5
                }}
              />
              <YAxis 
                label={{ 
                  value: 'Incremental Revenue ($)', 
                  angle: -90, 
                  position: 'insideLeft' 
                }}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Incremental Revenue']}
              />
              <Legend />
              <Bar 
                dataKey="promoOn" 
                name="Promotion Active" 
                fill="#8884d8" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="promoOff" 
                name="Promotion Inactive" 
                fill="#82ca9d" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <strong>Insights:</strong> Promotions significantly amplify the effectiveness of Email marketing (+115%) 
            and Paid Social (+58%), while having more modest effects on Search (+22%). This suggests strategic 
            timing of promotions with certain channels can maximize ROI.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
