
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";

export const JourneyInsightsCard = () => {
  return (
    <Card className="mt-6 border-purple-100 bg-purple-50/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2 text-purple-800">
          <Lightbulb className="h-5 w-5 text-yellow-500" /> Journey Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h3 className="font-medium text-green-800">Key Patterns</h3>
            </div>
            <ul className="ml-7 list-disc space-y-2 text-sm text-green-700">
              <li>Social media is most common first touchpoint (42% of journeys)</li>
              <li>Email remarketing shows highest conversion rate at touchpoint #3</li>
              <li>Average customer journey involves 3.2 touchpoints before conversion</li>
              <li>Weekend engagement peaks between 6-9pm showing 23% higher conversion rates</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <h3 className="font-medium text-amber-800">Friction Points</h3>
            </div>
            <ul className="ml-7 list-disc space-y-2 text-sm text-amber-700">
              <li>Display to landing page pathway shows 65% drop-off rate</li>
              <li>Mobile journey completion rate 17% lower than desktop</li>
              <li>Cart abandonment highest when payment is the last touchpoint</li>
              <li>Attribution models differ by up to 30% in channel value assessment</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
