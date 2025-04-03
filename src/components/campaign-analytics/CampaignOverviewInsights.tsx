
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, LineChart, Target, ChevronRight } from "lucide-react";

export const CampaignOverviewInsights = () => {
  return (
    <Card className="border-emerald-100 bg-emerald-50/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2 text-emerald-800">
          <Brain className="h-5 w-5 text-yellow-500" /> Campaign Overview Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-emerald-600" />
              <h3 className="font-medium text-emerald-800">Performance Trends</h3>
            </div>
            <ul className="ml-7 list-disc space-y-2 text-sm text-emerald-700">
              <li>Cross-channel campaigns outperform single-channel by 37% on ROAS</li>
              <li>Video + Display combinations show highest engagement rates</li>
              <li>Tuesday and Wednesday have lowest CPM across all channels</li>
              <li>Campaigns with A/B tested creatives outperform others by 24%</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium text-blue-800">Audience Insights</h3>
            </div>
            <ul className="ml-7 list-disc space-y-2 text-sm text-blue-700">
              <li>35-44 age group converts at 3.2% vs. 1.8% average</li>
              <li>Urban audiences show 22% higher CTR than suburban</li>
              <li>First-time visitors convert best on educational content</li>
              <li>Returning customers respond best to loyalty messaging</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ChevronRight className="h-5 w-5 text-purple-600" />
              <h3 className="font-medium text-purple-800">Next Steps</h3>
            </div>
            <ul className="ml-7 list-disc space-y-2 text-sm text-purple-700">
              <li>Conduct deeper analysis of video CPV increase</li>
              <li>Test new audience segments in 35-44 demographic</li>
              <li>Optimize mobile journey touchpoints</li>
              <li>Implement multi-touch attribution model</li>
              <li>Create cross-campaign creative testing program</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
