
import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileBarChart, BarChart3, LineChart, PieChart, TrendingUp, DollarSign, Target, Percent, Users, Layers } from "lucide-react";

export default function MetricsGuidePage() {
  return (
    <div className="space-y-8 pb-8 animate-fade-in">
      <PageHeader 
        title="Metrics Guide" 
        description="Understanding key marketing analytics metrics and how to interpret them" 
      />
      
      {/* Hero Section */}
      <div className="relative p-8 rounded-xl overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <div className="absolute inset-0 bg-black opacity-5 pattern-grid-lg mix-blend-multiply"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <FileBarChart className="h-8 w-8" />
            <h2 className="text-2xl font-bold">Marketing Analytics Metrics</h2>
          </div>
          <p className="text-lg max-w-3xl opacity-90">
            Learn about the key metrics used in marketing analytics, how they're calculated, 
            and what insights they provide for decision-making.
          </p>
        </div>
      </div>
      
      {/* Metrics Categories */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto mb-6">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attribution">Attribution</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>
        
        {/* Performance Metrics */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-t-4 border-t-blue-500">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-blue-100">
                    <LineChart className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle>Conversion Rate</CardTitle>
                </div>
                <CardDescription>
                  The percentage of users who take a desired action
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Formula</h4>
                    <div className="p-3 bg-slate-50 rounded-lg inline-block font-mono text-sm">
                      (Conversions / Total Visitors) × 100
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Interpretation</h4>
                    <p className="text-sm text-slate-700">
                      Higher conversion rates indicate more effective marketing funnel and user experience. 
                      Compare across channels, campaigns, and time periods to identify optimization opportunities.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Benchmarks</h4>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="p-2 bg-red-50 rounded-md text-center">
                        <span className="block text-red-600 font-medium">Poor</span>
                        <span className="text-slate-700">{'<'} 1%</span>
                      </div>
                      <div className="p-2 bg-amber-50 rounded-md text-center">
                        <span className="block text-amber-600 font-medium">Average</span>
                        <span className="text-slate-700">1% - 3%</span>
                      </div>
                      <div className="p-2 bg-green-50 rounded-md text-center">
                        <span className="block text-green-600 font-medium">Good</span>
                        <span className="text-slate-700">{'>'} 3%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-purple-500">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-purple-100">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <CardTitle>Click-Through Rate (CTR)</CardTitle>
                </div>
                <CardDescription>
                  The ratio of users who click on a specific link to the number of total users who view the page/ad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Formula</h4>
                    <div className="p-3 bg-slate-50 rounded-lg inline-block font-mono text-sm">
                      (Clicks / Impressions) × 100
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Interpretation</h4>
                    <p className="text-sm text-slate-700">
                      CTR measures how compelling your ads or content are to your audience. 
                      A higher CTR indicates more relevant or engaging creative elements.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Benchmarks by Channel</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-slate-50 rounded-md">
                        <span>Search Ads</span>
                        <span className="font-medium">3% - 5%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded-md">
                        <span>Display Ads</span>
                        <span className="font-medium">0.5% - 1%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded-md">
                        <span>Email Marketing</span>
                        <span className="font-medium">2% - 5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Attribution Metrics */}
        <TabsContent value="attribution" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-t-4 border-t-green-500">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-green-100">
                    <Layers className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle>Assisted Conversions</CardTitle>
                </div>
                <CardDescription>
                  The number of conversions in which a channel appeared in the conversion path but wasn't the final conversion touch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Interpretation</h4>
                    <p className="text-sm text-slate-700">
                      Assisted conversions help identify channels that play a supportive role in the conversion process. 
                      Channels with high assisted conversions but low direct conversions may be undervalued in 
                      last-click attribution models.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Key Considerations</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li>Compare assisted vs. direct conversions ratio to understand channel roles</li>
                      <li>High assist/low direct typically indicates awareness or research phase channels</li>
                      <li>Look for channels that both assist and convert directly for highest value</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-amber-500">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-amber-100">
                    <Target className="h-5 w-5 text-amber-600" />
                  </div>
                  <CardTitle>Attribution Models Comparison</CardTitle>
                </div>
                <CardDescription>
                  Comparing how different attribution models distribute credit for conversions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Common Attribution Models</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-slate-50 rounded-md">
                        <span className="font-medium block">Last Click</span>
                        <span className="text-slate-700">100% credit to final touchpoint before conversion</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-md">
                        <span className="font-medium block">First Click</span>
                        <span className="text-slate-700">100% credit to first touchpoint in conversion path</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-md">
                        <span className="font-medium block">Linear</span>
                        <span className="text-slate-700">Equal credit distributed across all touchpoints</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-md">
                        <span className="font-medium block">Time Decay</span>
                        <span className="text-slate-700">More credit to touchpoints closer to conversion</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">When to Use Each Model</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li><span className="font-medium">Last Click:</span> Direct response, short purchase cycles</li>
                      <li><span className="font-medium">First Click:</span> Brand awareness, top-of-funnel evaluation</li>
                      <li><span className="font-medium">Linear:</span> Equal consideration of all marketing efforts</li>
                      <li><span className="font-medium">Time Decay:</span> Longer sales cycles with recency importance</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Audience Metrics */}
        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-t-4 border-t-indigo-500">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-indigo-100">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  <CardTitle>Lifetime Value (LTV)</CardTitle>
                </div>
                <CardDescription>
                  The predicted total revenue a customer will generate throughout their relationship with your business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Formula</h4>
                    <div className="p-3 bg-slate-50 rounded-lg inline-block font-mono text-sm">
                      Average Order Value × Purchase Frequency × Customer Lifespan
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Interpretation</h4>
                    <p className="text-sm text-slate-700">
                      LTV helps determine how much you can afford to spend on customer acquisition and retention. 
                      Higher LTV customers justify higher acquisition costs and targeted retention strategies.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">LTV:CAC Ratio</h4>
                    <p className="text-sm text-slate-700">
                      The ratio between LTV and Customer Acquisition Cost (CAC) indicates marketing efficiency:
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-sm mt-2">
                      <div className="p-2 bg-red-50 rounded-md text-center">
                        <span className="block text-red-600 font-medium">Poor</span>
                        <span className="text-slate-700">{'<'} 1:1</span>
                      </div>
                      <div className="p-2 bg-amber-50 rounded-md text-center">
                        <span className="block text-amber-600 font-medium">Healthy</span>
                        <span className="text-slate-700">3:1</span>
                      </div>
                      <div className="p-2 bg-green-50 rounded-md text-center">
                        <span className="block text-green-600 font-medium">Excellent</span>
                        <span className="text-slate-700">{'>'} 5:1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-rose-500">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-rose-100">
                    <LineChart className="h-5 w-5 text-rose-600" />
                  </div>
                  <CardTitle>Customer Acquisition Cost (CAC)</CardTitle>
                </div>
                <CardDescription>
                  The total cost of acquiring a new customer, including marketing and sales expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Formula</h4>
                    <div className="p-3 bg-slate-50 rounded-lg inline-block font-mono text-sm">
                      Total Marketing & Sales Costs / Number of New Customers
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Interpretation</h4>
                    <p className="text-sm text-slate-700">
                      CAC helps evaluate the efficiency of your marketing and sales efforts. Rising CAC may indicate 
                      market saturation, increased competition, or ineffective campaigns.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">CAC by Channel</h4>
                    <p className="text-sm text-slate-700 mb-2">
                      Compare CAC across different acquisition channels to optimize budget allocation:
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-slate-50 rounded-md">
                        <span>Organic Search</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700">Lower CAC</Badge>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded-md">
                        <span>Paid Social</span>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700">Medium CAC</Badge>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded-md">
                        <span>Outbound Sales</span>
                        <Badge variant="outline" className="bg-red-50 text-red-700">Higher CAC</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Financial Metrics */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-t-4 border-t-emerald-500">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-emerald-100">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <CardTitle>Return on Ad Spend (ROAS)</CardTitle>
                </div>
                <CardDescription>
                  A measure of revenue generated relative to advertising spend
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Formula</h4>
                    <div className="p-3 bg-slate-50 rounded-lg inline-block font-mono text-sm">
                      Revenue / Advertising Spend
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Interpretation</h4>
                    <p className="text-sm text-slate-700">
                      ROAS of 3:1 means $3 in revenue for every $1 spent on advertising. However, a "good" ROAS 
                      depends on your profit margins and business model.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Target ROAS by Industry</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-slate-50 rounded-md">
                        <span>E-commerce (low margin)</span>
                        <span className="font-medium">4:1+</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded-md">
                        <span>E-commerce (high margin)</span>
                        <span className="font-medium">3:1+</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded-md">
                        <span>Lead Generation</span>
                        <span className="font-medium">5:1+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-sky-500">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-sky-100">
                    <Percent className="h-5 w-5 text-sky-600" />
                  </div>
                  <CardTitle>Cost Per Acquisition (CPA)</CardTitle>
                </div>
                <CardDescription>
                  The cost of acquiring a customer who completes a desired action
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Formula</h4>
                    <div className="p-3 bg-slate-50 rounded-lg inline-block font-mono text-sm">
                      Total Campaign Cost / Number of Acquisitions
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Interpretation</h4>
                    <p className="text-sm text-slate-700">
                      CPA varies widely by industry and action type. A lower CPA generally indicates more 
                      efficient marketing, but must be balanced against conversion quality and LTV.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Improvement Strategies</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li>Improve targeting precision to reach high-intent audiences</li>
                      <li>Optimize landing pages for better conversion rates</li>
                      <li>Test different ad creatives and messages</li>
                      <li>Implement retargeting for lower-funnel conversions</li>
                      <li>Use bid adjustments based on performance data</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Advanced Metrics Section */}
      <Card className="border-l-4 border-l-indigo-500 bg-indigo-50/50">
        <CardContent className="p-5">
          <h3 className="text-lg font-medium mb-2">Advanced Metric Analysis</h3>
          <p className="text-muted-foreground mb-4">
            Understanding the relationship between metrics is crucial for comprehensive marketing analysis. 
            Consider these advanced approaches:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-indigo-700 mb-2">Correlation Analysis</h4>
              <p className="text-sm text-muted-foreground">
                Identify relationships between different metrics to understand how they influence each other.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-indigo-700 mb-2">Segmentation Analysis</h4>
              <p className="text-sm text-muted-foreground">
                Compare metrics across different customer segments to identify high-value audiences.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-indigo-700 mb-2">Trend Analysis</h4>
              <p className="text-sm text-muted-foreground">
                Track metrics over time to identify seasonal patterns and long-term performance trends.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
