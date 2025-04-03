
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, Info } from "lucide-react";

export const CampaignInsightsCard = () => {
  return (
    <Card className="mt-6 border-indigo-100 bg-indigo-50/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2 text-indigo-800">
          <Lightbulb className="h-5 w-5 text-yellow-500" /> Campaign Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h3 className="font-medium text-green-800">Efficiency Highlights</h3>
            </div>
            <ul className="ml-7 list-disc space-y-2 text-sm text-green-700">
              <li>CPC reduced by 12.4% over past 30 days, showing improved targeting</li>
              <li>CPM decreased 8.2% month-over-month, indicating better reach efficiency</li>
              <li>"Summer Sale" campaign achieved highest ROI at 4.7x, outperforming benchmarks by 35%</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium text-blue-800">Strategic Recommendations</h3>
            </div>
            <ul className="ml-7 list-disc space-y-2 text-sm text-blue-700">
              <li>Address rising CPV trend (+3.8%) by optimizing video length and engagement elements</li>
              <li>Focus on 35-44 age demographic showing highest conversion rates</li>
              <li>Replicate success factors from "Summer Sale" campaign for upcoming promotions</li>
              <li>Implement multi-touch attribution model to better understand customer journeys</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
