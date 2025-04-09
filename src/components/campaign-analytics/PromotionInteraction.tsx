
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChannelPromotionInteractionChart } from "@/components/campaign-analytics/ChannelPromotionInteractionChart";
import { PromotionFatigueChart } from "@/components/campaign-analytics/PromotionFatigueChart";
import { GitCompare, Radio } from "lucide-react";

export const PromotionInteraction = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <GitCompare className="h-5 w-5 text-primary" />
                Promotion Interaction & Strategic Effects
              </CardTitle>
              <CardDescription>
                Analysis of how promotions interact with other marketing channels and their strategic impact
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              <Radio className="h-5 w-5 text-primary" /> Channel-Promotion Interaction
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              How promotions amplify or reduce the effectiveness of each media channel
            </p>
            <ChannelPromotionInteractionChart />
          </div>
          
          <div className="mt-8">
            <PromotionFatigueChart />
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg mt-8">
            <h3 className="text-base font-medium mb-2">Strategic Implications</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs font-medium mt-0.5">1</span>
                <span><strong>Channel Synergy:</strong> Email and Paid Social show the strongest synergistic effects with promotions, suggesting these channels should be prioritized during promotional periods.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs font-medium mt-0.5">2</span>
                <span><strong>Promotion Fatigue Management:</strong> Given the diminishing returns seen in the fatigue analysis, limit promotion frequency to 5-6 times per customer segment to maintain effectiveness.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs font-medium mt-0.5">3</span>
                <span><strong>Budget Allocation:</strong> During promotional periods, consider reallocating budget to high-synergy channels (Email, Paid Social) and away from channels showing minimal lift difference.</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
