
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { WaterfallChart } from "@/components/dashboard/WaterfallChart";

// Mock data for the promotion halo effect waterfall chart
const haloEffectData = [
  {
    name: "Baseline",
    value: 10500000,
    fill: "#8338ec", // Purple for baseline
    ratio: "54.4%",
  },
  {
    name: "Promoted Products",
    value: 960000,
    fill: "#f94144", // Red for promoted products
    ratio: "5.0%",
  },
  {
    name: "OrganicSocial",
    value: 925000, 
    fill: "#43aa8b", // Teal
    ratio: "4.8%",
  },
  {
    name: "EmailMarketing",
    value: 905000,
    fill: "#4cc9f0", // Light blue
    ratio: "4.7%",
  },
  {
    name: "TikTokAds",
    value: 885000,
    fill: "#4361ee", // Blue
    ratio: "4.6%",
  },
  {
    name: "DirectTraffic",
    value: 790000,
    fill: "#3a0ca3", // Darker blue
    ratio: "4.1%",
  },
  {
    name: "GoogleAds",
    value: 710000,
    fill: "#4361ee", // Blue
    ratio: "3.7%",
  },
  {
    name: "SocialMedia",
    value: 710000,
    fill: "#4cc9f0", // Light blue
    ratio: "3.7%",
  },
  {
    name: "SearchAdvertising",
    value: 615000,
    fill: "#f8961e", // Orange
    ratio: "3.2%",
  },
  {
    name: "DisplayAdvertising",
    value: 580000,
    fill: "#f9c74f", // Yellow
    ratio: "3.0%",
  },
  {
    name: "AffiliateMarketing",
    value: 480000,
    fill: "#90be6d", // Green
    ratio: "2.5%",
  },
  {
    name: "ReferralTraffic",
    value: 425000,
    fill: "#7209b7", // Purple
    ratio: "2.2%",
  },
  {
    name: "FacebookAds",
    value: 385000,
    fill: "#f72585", // Pink
    ratio: "2.0%",
  },
  {
    name: "OrganicSearch",
    value: 270000,
    fill: "#4cc9f0", // Light blue
    ratio: "1.4%",
  },
  {
    name: "VideoAdvertising",
    value: 110000,
    fill: "#7209b7", // Purple
    ratio: "0.6%",
  },
  {
    name: "Total",
    value: 19250000,
    fill: "#555555", // Gray for total
    isTotal: true,
    ratio: "100.0%",
  },
];

export const PromotionHaloWaterfallChart = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="text-base font-medium mb-1">Promotion Halo Effect - Revenue Breakdown</h3>
          <p className="text-sm text-muted-foreground">
            How promotions drive incremental revenue across both promoted and non-promoted products
          </p>
        </div>

        <div className="h-[400px]">
          <WaterfallChart data={haloEffectData} height={400} />
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <strong>Insights:</strong> While promoted products contribute 5.0% directly to incremental revenue, 
            the halo effect on non-promoted products through various channels generates an additional 40.6% in revenue. 
            This demonstrates that promotions create significant secondary value beyond their direct impact.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
