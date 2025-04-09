
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChannelPromotionInteractionChart } from "@/components/campaign-analytics/ChannelPromotionInteractionChart";
import { PromotionHaloWaterfallChart } from "@/components/campaign-analytics/PromotionHaloWaterfallChart";
import { ProductCategoryRevenueChart } from "@/components/campaign-analytics/ProductCategoryRevenueChart";
import { GitCompare, Radio, BarChart, Layers } from "lucide-react";

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
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" /> Product Category Revenue Impact
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Comparison of revenue across product categories during promotion vs. non-promotion periods
            </p>
            <ProductCategoryRevenueChart />
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" /> Promotion Halo Effect
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              How promotions drive incremental revenue through direct and indirect effects
            </p>
            <PromotionHaloWaterfallChart />
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
                <span><strong>Budget Allocation:</strong> During promotional periods, consider reallocating budget to high-synergy channels (Email, Paid Social) and away from channels showing minimal lift difference.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs font-medium mt-0.5">3</span>
                <span><strong>Testing Strategy:</strong> Design future media tests that isolate promotional periods to better understand interaction effects across different channels and promotion types.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs font-medium mt-0.5">4</span>
                <span><strong>Halo Effect:</strong> Promotions drive significant indirect revenue (40.6%) through non-promoted products, demonstrating their value beyond direct impact.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs font-medium mt-0.5">5</span>
                <span><strong>Category Strategy:</strong> Electronics and Home Goods show the highest revenue lift during promotions, suggesting these categories should be focal points for future promotional campaigns.</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
