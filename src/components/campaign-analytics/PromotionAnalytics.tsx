
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IncrementalRevenueCounter } from "@/components/campaign-analytics/IncrementalRevenueCounter";
import { PromotionLiftChart } from "@/components/campaign-analytics/PromotionLiftChart";
import { PromotionCalendar } from "@/components/campaign-analytics/PromotionCalendar";
import { PromotionCostChart } from "@/components/campaign-analytics/PromotionCostChart";
import { EfficiencyRatioChart } from "@/components/campaign-analytics/EfficiencyRatioChart";
import { PromotionTypeChart } from "@/components/campaign-analytics/PromotionTypeChart";
import { PromotionElasticityPlot } from "@/components/campaign-analytics/PromotionElasticityPlot";
import { PromotionSaturationChart } from "@/components/campaign-analytics/PromotionSaturationChart";
import { PromotionEffectivenessChart } from "@/components/campaign-analytics/PromotionEffectivenessChart";
import { PromotionInteraction } from "@/components/campaign-analytics/PromotionInteraction";
import { Activity, DollarSign, Calendar, BarChart3, DollarSign as DollarIcon, PercentIcon, TrendingUp, GitCompare } from "lucide-react";
import type { CampaignSubPage } from "@/pages/CampaignAnalytics";

interface PromotionAnalyticsProps {
  activeSubPage: CampaignSubPage;
}

export const PromotionAnalytics = ({
  activeSubPage,
}: PromotionAnalyticsProps) => {
  return (
    <div className="space-y-6">
      <Tabs value={activeSubPage} className="w-full">
        <TabsContent value="impact" className={activeSubPage === "impact" ? "block" : "hidden"}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Promotion Impact
                  </CardTitle>
                  <CardDescription>
                    Analysis of promotion performance and revenue impact
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="col-span-1">
                  <CardContent className="pt-6">
                    <IncrementalRevenueCounter />
                  </CardContent>
                </Card>
                <Card className="col-span-3 md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Promotion Lift Calculator</CardTitle>
                    <CardDescription>
                      Baseline vs Actual revenue comparison
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PromotionLiftChart />
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <DollarIcon className="h-5 w-5 text-primary" /> Promotion Efficiency Ratio
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Revenue per $1 spent histogram
                  </p>
                  <EfficiencyRatioChart />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <PercentIcon className="h-5 w-5 text-primary" /> Promotion Type Breakdown
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Flash Sale vs BOGO vs %-Off comparison
                  </p>
                  <PromotionTypeChart />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" /> Stacked Promotion Calendar
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Gantt chart of active campaigns
                </p>
                <PromotionCalendar />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cost-analysis" className={activeSubPage === "cost-analysis" ? "block" : "hidden"}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Cost Analysis
                  </CardTitle>
                  <CardDescription>
                    Detailed analysis of promotion costs, efficiency, and types
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" /> Promotion Cost Timeseries
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Area chart with cohort overlays
                </p>
                <PromotionCostChart />
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" /> Promotion Elasticity Analysis
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Impact of promotion investment on incremental revenue
                </p>
                <PromotionElasticityPlot />
              </div>
              
              <div className="mt-8">
                <PromotionSaturationChart />
              </div>
              
              <PromotionEffectivenessChart />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="interaction" className={activeSubPage === "interaction" ? "block" : "hidden"}>
          <PromotionInteraction />
        </TabsContent>
      </Tabs>
    </div>
  );
};
