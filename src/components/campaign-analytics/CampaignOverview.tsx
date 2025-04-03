
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkline } from "@/components/campaign-analytics/Sparkline";
import { ROILeaderboard } from "@/components/campaign-analytics/ROILeaderboard";
import { DemographicChart } from "@/components/campaign-analytics/DemographicChart";
import { AttributionComparison } from "@/components/campaign-analytics/AttributionComparison";
import { ConversionPathSankey } from "@/components/campaign-analytics/ConversionPathSankey";
import { TouchpointHeatmap } from "@/components/campaign-analytics/TouchpointHeatmap";
import { BarChart3, Route, ArrowUp, ArrowDown, Lightbulb, AlertTriangle, TrendingUp, Info, ChevronRight, Brain, LineChart, Target } from "lucide-react";
import type { CampaignSubPage } from "@/pages/CampaignAnalytics";

interface CampaignOverviewProps {
  activeSubPage: CampaignSubPage;
  dateRange: [Date, Date];
}

export const CampaignOverview = ({ activeSubPage, dateRange }: CampaignOverviewProps) => {
  // Create a wrapper Tabs component that will provide context for TabsContent
  return (
    <div className="space-y-6">
      <Tabs value={activeSubPage} className="w-full">
        <TabsContent value="totals" className={activeSubPage === "totals" ? "block" : "hidden"}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Cost Efficiency Trends
                  </CardTitle>
                  <CardDescription>
                    CPC/CPM/CPV sparklines with 30/60/90-day comparisons
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg border bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Cost per Click (CPC)</h3>
                    <div className="flex items-center text-green-600">
                      <ArrowDown className="h-4 w-4 mr-1" />
                      <span className="text-sm">12.4%</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">$1.24</div>
                  <Sparkline 
                    data={[2.1, 1.9, 1.8, 1.7, 1.5, 1.6, 1.4, 1.3, 1.2, 1.24]} 
                    color="#22c55e" 
                    decreaseIsGood={true}
                  />
                  <div className="mt-2 text-xs text-muted-foreground">
                    vs $1.42 (30 days ago)
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Cost per Mille (CPM)</h3>
                    <div className="flex items-center text-green-600">
                      <ArrowDown className="h-4 w-4 mr-1" />
                      <span className="text-sm">8.2%</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">$8.75</div>
                  <Sparkline 
                    data={[9.5, 9.8, 9.2, 8.9, 9.1, 8.8, 8.6, 8.7, 8.8, 8.75]} 
                    color="#22c55e" 
                    decreaseIsGood={true}
                  />
                  <div className="mt-2 text-xs text-muted-foreground">
                    vs $9.53 (30 days ago)
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Cost per View (CPV)</h3>
                    <div className="flex items-center text-red-600">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span className="text-sm">3.8%</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">$0.043</div>
                  <Sparkline 
                    data={[0.039, 0.038, 0.040, 0.041, 0.042, 0.039, 0.041, 0.042, 0.044, 0.043]} 
                    color="#ef4444" 
                    decreaseIsGood={true}
                  />
                  <div className="mt-2 text-xs text-muted-foreground">
                    vs $0.041 (30 days ago)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Incremental Revenue Leaderboard</CardTitle>
                <CardDescription>Top 5 campaigns by ROI</CardDescription>
              </CardHeader>
              <CardContent>
                <ROILeaderboard />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audience Breakdown</CardTitle>
                <CardDescription>Demographic pyramid chart</CardDescription>
              </CardHeader>
              <CardContent>
                <DemographicChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="journey" className={activeSubPage === "journey" ? "block" : "hidden"}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Route className="h-5 w-5 text-primary" />
                    Customer Journey Mapping
                  </CardTitle>
                  <CardDescription>
                    Multi-touch attribution model comparison, conversion path visualization, and touchpoint heatmap
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="attribution">
                <TabsList className="mb-4 bg-muted/50">
                  <TabsTrigger value="attribution">Multi-touch Attribution</TabsTrigger>
                  <TabsTrigger value="conversion">Conversion Path</TabsTrigger>
                  <TabsTrigger value="heatmap">Touchpoint Heatmap</TabsTrigger>
                </TabsList>
                
                <TabsContent value="attribution" className="pt-4">
                  <AttributionComparison />
                </TabsContent>
                
                <TabsContent value="conversion" className="pt-4">
                  <ConversionPathSankey />
                </TabsContent>
                
                <TabsContent value="heatmap" className="pt-4">
                  <TouchpointHeatmap />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
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
        </TabsContent>
      </Tabs>
      
      {/* Add Campaign Insights Overview Key Takeaways */}
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
    </div>
  );
};
