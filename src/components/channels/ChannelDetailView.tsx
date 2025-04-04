import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { channelColors } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown, BarChart, LineChart, TrendingUp, Info } from "lucide-react";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { ChannelImpressionsCostChart } from "./ChannelImpressionsCostChart";
import { ChannelSaturationCurve } from "./ChannelSaturationCurve";
import { ChannelInsights } from "@/components/dashboard/ChannelInsights";

interface ChannelDetailViewProps {
  channelData: any;
  trendsData: any[];
  loading: boolean;
}

export function ChannelDetailView({ channelData, trendsData, loading }: ChannelDetailViewProps) {
  const [activeDetailTab, setActiveDetailTab] = useState("overview");
  
  const defaultCustomBudgets = {
    "bau": { [channelData?.id || 'default']: channelData?.cost || 10000 },
    "cost-savings": { [channelData?.id || 'default']: (channelData?.cost || 10000) * 0.9 },
    "revenue-uplift": { [channelData?.id || 'default']: (channelData?.cost || 10000) * 1.2 }
  };

  const relevantExternalFactors = {
    search: {
      "Competitor Activity": "Increased competitor keyword bidding has raised CPCs by approximately 18% year-over-year.",
      "Industry Trends": "Growing adoption of voice search is changing keyword strategies and performance."
    },
    social: {
      "Platform Algorithm Changes": "Recent updates to social platform algorithms have reduced organic reach by approximately 25%.",
      "Privacy Regulations": "New privacy features are limiting targeting capabilities and attribution accuracy."
    },
    email: {
      "Deliverability Changes": "Email service provider updates have affected inbox placement rates.",
      "User Engagement Patterns": "Shifting email consumption patterns affect optimal send times and frequency."
    },
    display: {
      "Ad Blocking Technology": "Increased adoption of ad blockers has reduced potential reach.",
      "Viewability Standards": "Changing viewability requirements affect campaign performance metrics."
    },
    video: {
      "Streaming Behavior": "Shifts from traditional to streaming platforms require adaptation of video strategies.",
      "Content Consumption Habits": "Shorter attention spans demand more engaging first few seconds of video content."
    },
    affiliate: {
      "Publisher Landscape": "Changes in affiliate publisher ecosystem affect program performance.",
      "Commission Structures": "Competitive commission rates influence publisher promotion priorities."
    }
  };

  if (loading) {
    return <Skeleton className="w-full h-[500px]" />;
  }

  const channelColor = channelColors[channelData.id as keyof typeof channelColors] || "#4361ee";

  const mroi = (channelData.revenue / channelData.cost).toFixed(2);
  
  const isPerformingWell = channelData.roas > 2;
  
  const channelTrendsData = trendsData.map(item => ({
    name: item.name,
    date: item.date,
    value: item[channelData.id] || 0
  }));

  const channelExternalFactors = relevantExternalFactors[channelData.id as keyof typeof relevantExternalFactors];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: channelColor }}
              ></div>
              <CardTitle>{channelData.name} Channel</CardTitle>
            </div>
            <Badge 
              variant={isPerformingWell ? "default" : "destructive"}
              className="flex items-center gap-1"
            >
              {isPerformingWell ? (
                <><ArrowUp className="h-3 w-3" /> Performing Well</>
              ) : (
                <><ArrowDown className="h-3 w-3" /> Needs Optimization</>
              )}
            </Badge>
          </div>
          <CardDescription>
            Detailed performance metrics and insights for {channelData.name}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-muted/40 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Revenue</div>
              <div className="text-2xl font-bold">${channelData.revenue.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {Math.random() > 0.5 ? (
                  <span className="text-green-600 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" /> 
                    {(Math.random() * 20).toFixed(1)}% vs prev
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <ArrowDown className="h-3 w-3 mr-1" /> 
                    {(Math.random() * 10).toFixed(1)}% vs prev
                  </span>
                )}
              </div>
            </div>
            
            <div className="bg-muted/40 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Cost</div>
              <div className="text-2xl font-bold">${channelData.cost.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {Math.random() > 0.5 ? (
                  <span className="text-green-600 flex items-center">
                    <ArrowDown className="h-3 w-3 mr-1" /> 
                    {(Math.random() * 15).toFixed(1)}% vs prev
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" /> 
                    {(Math.random() * 8).toFixed(1)}% vs prev
                  </span>
                )}
              </div>
            </div>
            
            <div className="bg-muted/40 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">ROAS</div>
              <div className="text-2xl font-bold">{channelData.roas}x</div>
              <div className="text-xs text-muted-foreground mt-1">
                {channelData.roas > 2 ? (
                  <span className="text-green-600">Above target (2.0x)</span>
                ) : (
                  <span className="text-amber-600">Below target (2.0x)</span>
                )}
              </div>
            </div>
            
            <div className="bg-muted/40 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">MROI</div>
              <div className="text-2xl font-bold">{mroi}x</div>
              <div className="text-xs text-muted-foreground mt-1">
                {Number(mroi) > 1.5 ? (
                  <span className="text-green-600">Efficient spend</span>
                ) : (
                  <span className="text-amber-600">Diminishing returns</span>
                )}
              </div>
            </div>
          </div>
          
          <Tabs value={activeDetailTab} onValueChange={setActiveDetailTab}>
            <TabsList className="w-full md:w-auto mb-4">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <BarChart className="h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-1">
                <LineChart className="h-4 w-4" /> Trends
              </TabsTrigger>
              <TabsTrigger value="saturation" className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> Saturation Analysis
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Performance Overview</h3>
                  <div className="text-sm space-y-4">
                    <p>
                      <strong>{channelData.name}</strong> is currently 
                      {channelData.roas > 2 ? " outperforming " : " underperforming "} 
                      compared to other channels with a ROAS of <strong>{channelData.roas}x</strong> 
                      and conversion rate of <strong>{channelData.conversion}%</strong>.
                    </p>
                    <p>
                      Cost per acquisition (CPA) is <strong>${channelData.cpa}</strong>, which is
                      {channelData.cpa < 150 ? " below " : " above "} 
                      the average CPA across all channels.
                    </p>
                    <p>
                      Based on the current performance, 
                      {Number(mroi) > 1.5 ? 
                        " there is opportunity to increase budget allocation to this channel." : 
                        " it's recommended to optimize campaign targeting and messaging."}
                    </p>
                  </div>
                </div>
                
                <div>
                  <ChannelInsights mediaType={
                    channelData.id === "search" || channelData.id === "social" || 
                    channelData.id === "display" || channelData.id === "video" ? 
                    "paid" : channelData.id === "email" || channelData.id === "affiliate" ?
                    "nonPaid" : "organic"
                  } />
                </div>
              </div>

              {channelExternalFactors && (
                <div className="bg-blue-50/30 rounded-lg p-4 border border-blue-100">
                  <h3 className="text-lg font-medium mb-3 text-blue-800 flex items-center gap-1.5">
                    <Info className="h-5 w-5 text-blue-600" />
                    External Factors Impacting {channelData.name}
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(channelExternalFactors).map(([factor, impact]) => (
                      <div key={factor} className="flex items-start gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mt-1.5"></span>
                        <div>
                          <h4 className="font-medium text-sm">{factor}</h4>
                          <p className="text-sm text-muted-foreground">{impact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-medium mb-4">Performance Drivers</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="text-sm font-medium mb-1">Top Creative</div>
                    <div className="text-2xl font-bold">Creative #32</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      2.8x ROAS, 5.2% CTR
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="text-sm font-medium mb-1">Top Audience</div>
                    <div className="text-2xl font-bold">Urban Millennials</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      3.1x ROAS, $42 CPA
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="text-sm font-medium mb-1">Peak Performance</div>
                    <div className="text-2xl font-bold">Weekends</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      30% higher conversion rates
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Performance Over Time</h3>
                <PerformanceChart
                  data={channelTrendsData}
                  lines={[
                    { dataKey: "value", color: channelColor, label: "Revenue" }
                  ]}
                  height={300}
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Impressions & Cost Trends</h3>
                <ChannelImpressionsCostChart
                  channelId={channelData.id}
                  data={trendsData}
                  color={channelColor}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="saturation" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Diminishing Returns Analysis</h3>
                <p className="text-sm mb-4">
                  This chart shows how increased spending affects returns for the {channelData.name} channel. 
                  The point where the marginal returns curve crosses the 1.0x line indicates the optimal 
                  budget allocation level.
                </p>
                <ChannelSaturationCurve
                  channelId={channelData.id}
                  channelName={channelData.name}
                  color={channelColor}
                  activeScenario="bau"
                  customBudgets={defaultCustomBudgets}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-md font-medium mb-2">Current Budget Efficiency</h4>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-2xl font-bold">
                      {Number(mroi) > 1.5 ? "Efficient" : "Approaching Saturation"}
                    </div>
                    {Number(mroi) > 1.5 ? (
                      <ArrowUp className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowDown className="h-5 w-5 text-amber-600" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {Number(mroi) > 1.5 ? 
                      `Current MROI of ${mroi}x suggests room for increased investment in ${channelData.name}.` :
                      `With an MROI of ${mroi}x, this channel is nearing its optimal spending level.`
                    }
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="text-md font-medium mb-2">Recommendation</h4>
                  <div className="text-lg font-medium mb-1">
                    {Number(mroi) > 1.5 ? (
                      <span className="text-green-600">Increase Budget by 15-20%</span>
                    ) : Number(mroi) > 1.0 ? (
                      <span className="text-amber-600">Maintain Current Budget</span>
                    ) : (
                      <span className="text-red-600">Reduce Budget by 10-15%</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {Number(mroi) > 1.5 ? 
                      `Based on current performance trends, increasing investment could yield positive returns.` :
                      Number(mroi) > 1.0 ?
                      `Current spending is near optimal levels. Focus on creative optimization instead.` :
                      `Channel shows diminishing returns. Shift budget to higher-performing channels.`
                    }
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
