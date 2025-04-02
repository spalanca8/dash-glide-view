
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MediaTypesExplanationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Understanding Media Types</CardTitle>
        <CardDescription>
          How to interpret this analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium mb-1 flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#ef476f]"></div>
              Baseline
            </h4>
            <p className="text-muted-foreground">
              Revenue that would occur regardless of marketing activities, driven by brand 
              strength, seasonality, and market conditions.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-1 flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#4361ee]"></div>
              Paid Media
            </h4>
            <p className="text-muted-foreground">
              Channels where you directly invest marketing budget to drive performance, such 
              as search, social, display, and video ads.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-1 flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#06d6a0]"></div>
              Organic Media
            </h4>
            <p className="text-muted-foreground">
              Non-paid channels that generate traffic and conversions naturally, including 
              SEO, direct visits, and referral traffic.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-1 flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#ffd166]"></div>
              Non-Paid Media
            </h4>
            <p className="text-muted-foreground">
              Channels that influence performance without direct ad spend, such as affiliate 
              marketing, email, partnerships, and PR activities.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
