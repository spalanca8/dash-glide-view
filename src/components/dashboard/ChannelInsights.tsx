
import React from "react";
import { Info, TrendingUp, ArrowUp } from "lucide-react";

interface ChannelInsightsProps {
  mediaType: string;
}

export function ChannelInsights({ mediaType }: ChannelInsightsProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Key Insights</h3>
      <div className="space-y-4 text-sm border rounded-lg p-4 bg-muted/20">
        {mediaType === "paid" && (
          <>
            <p className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 text-primary mt-1" /> 
              <span>Search shows the highest ROI among paid channels, with every $1 generating $2.3 in incremental revenue.</span>
            </p>
            <p className="flex items-start gap-2">
              <Info className="h-4 w-4 text-primary mt-1" /> 
              <span>Display ads are reaching saturation at current spending levels, with diminishing returns above $15K monthly spend.</span>
            </p>
            <p className="flex items-start gap-2">
              <ArrowUp className="h-4 w-4 text-primary mt-1" /> 
              <span>Social media shows potential for growth, with consistent performance improvements over the last 3 months.</span>
            </p>
          </>
        )}
        
        {mediaType === "organic" && (
          <>
            <p className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 text-primary mt-1" /> 
              <span>SEO delivers the highest organic contribution, driven by content investments from the previous quarter.</span>
            </p>
            <p className="flex items-start gap-2">
              <Info className="h-4 w-4 text-primary mt-1" /> 
              <span>Direct traffic shows strong brand recognition, with users seeking out your products specifically.</span>
            </p>
            <p className="flex items-start gap-2">
              <ArrowUp className="h-4 w-4 text-primary mt-1" /> 
              <span>Referral traffic presents an opportunity for growth through partnership expansion.</span>
            </p>
          </>
        )}
        
        {mediaType === "nonPaid" && (
          <>
            <p className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 text-primary mt-1" /> 
              <span>Affiliate marketing provides a steady, performance-based contribution with minimal overhead.</span>
            </p>
            <p className="flex items-start gap-2">
              <Info className="h-4 w-4 text-primary mt-1" /> 
              <span>Email shows high engagement and conversion rates from your existing customer base.</span>
            </p>
            <p className="flex items-start gap-2">
              <ArrowUp className="h-4 w-4 text-primary mt-1" /> 
              <span>PR activities demonstrate lasting impact on awareness and consideration metrics.</span>
            </p>
          </>
        )}
        
        {mediaType === "baseline" && (
          <>
            <p className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 text-primary mt-1" /> 
              <span>Brand strength accounts for nearly half of baseline performance, highlighting the value of long-term brand building.</span>
            </p>
            <p className="flex items-start gap-2">
              <Info className="h-4 w-4 text-primary mt-1" /> 
              <span>Seasonal factors create predictable patterns that should inform campaign timing and budgeting.</span>
            </p>
            <p className="flex items-start gap-2">
              <ArrowUp className="h-4 w-4 text-primary mt-1" /> 
              <span>Market conditions impact baseline performance, with macroeconomic factors explaining 23% of variation.</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
