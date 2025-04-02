
import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, BarChart3, LineChart, PieChart, TrendingUp, Target, Layers } from "lucide-react";

export default function FAQPage() {
  return (
    <div className="space-y-8 pb-8 animate-fade-in">
      <PageHeader 
        title="Frequently Asked Questions" 
        description="Find answers to common questions about analytics methodologies and features" 
      />
      
      {/* Hero Section */}
      <div className="relative p-8 rounded-xl overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="absolute inset-0 bg-black opacity-5 pattern-grid-lg mix-blend-multiply"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <HelpCircle className="h-8 w-8" />
            <h2 className="text-2xl font-bold">Analytics FAQs</h2>
          </div>
          <p className="text-lg max-w-3xl opacity-90">
            Get answers to the most commonly asked questions about marketing analytics methodologies, 
            metrics interpretation, and platform features.
          </p>
        </div>
      </div>
      
      {/* FAQ Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Methodology FAQs */}
        <Card className="md:col-span-3 border-t-4 border-t-blue-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-blue-100">
                <Layers className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle>Methodology Questions</CardTitle>
            </div>
            <CardDescription>
              Understanding different marketing analytics approaches and when to use them
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Marketing Mix Modeling (MMM)?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-3">
                    Marketing Mix Modeling (MMM) is a statistical analysis technique that uses 
                    historical data to estimate the impact of various marketing tactics on sales 
                    and other KPIs. It helps determine which marketing activities contribute most 
                    to business results.
                  </p>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">Strategic Planning</Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">Budget Allocation</Badge>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>What is Multi-Touch Attribution (MTA)?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-3">
                    Multi-Touch Attribution is a method of tracking and assigning credit to various 
                    marketing touchpoints along the customer journey. Unlike MMM which uses aggregate 
                    data, MTA tracks individual user paths to conversion, allowing for more granular 
                    understanding of which channels influence purchase decisions.
                  </p>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">Tactical Execution</Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700">Customer Journey</Badge>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>What is Incrementality Testing?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-3">
                    Incrementality Testing measures the true causal impact of marketing activities by 
                    comparing outcomes between test groups (exposed to marketing) and control groups 
                    (not exposed). This helps determine whether marketing efforts actually cause 
                    desired outcomes or if they would have happened anyway.
                  </p>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">Validation</Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">Causal Impact</Badge>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>How do these methodologies complement each other?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-3">
                    These methodologies work best when used together as part of a unified analytics approach:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li><span className="font-medium text-blue-700">MMM</span> provides the big-picture view for strategic planning and budget allocation</li>
                    <li><span className="font-medium text-purple-700">Incrementality Testing</span> validates the causal impact of specific marketing activities</li>
                    <li><span className="font-medium text-green-700">MTA</span> optimizes tactical execution and customer journeys in real-time</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        
        {/* Metrics FAQs */}
        <Card className="md:col-span-3 border-t-4 border-t-green-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-green-100">
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle>Metrics & KPI Questions</CardTitle>
            </div>
            <CardDescription>
              Understanding how to interpret and use key performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="metric-1">
                <AccordionTrigger>What is the difference between ROAS and ROI?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-3">
                    <span className="font-medium">Return on Ad Spend (ROAS)</span> measures the gross revenue generated for every dollar spent on advertising. 
                    It's calculated as Revenue ÷ Ad Spend.
                  </p>
                  <p className="text-muted-foreground mb-3">
                    <span className="font-medium">Return on Investment (ROI)</span> measures the net profit generated relative to the total investment. 
                    It's calculated as (Revenue - Cost) ÷ Cost, expressed as a percentage.
                  </p>
                  <p className="text-muted-foreground">
                    The key difference is that ROI accounts for all costs (including production, overhead, etc.), 
                    while ROAS only considers advertising spend.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="metric-2">
                <AccordionTrigger>What is marginal ROAS and why is it important?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-3">
                    Marginal ROAS measures the return on each additional dollar spent on a marketing channel. 
                    Unlike average ROAS, which looks at overall performance, marginal ROAS helps determine 
                    the point of diminishing returns - when additional spending yields decreasing benefits.
                  </p>
                  <p className="text-muted-foreground">
                    It's crucial for budget optimization because it helps identify when to stop increasing spend 
                    on a particular channel and reallocate resources to channels with higher marginal returns.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="metric-3">
                <AccordionTrigger>How do I interpret channel saturation curves?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-3">
                    Channel saturation curves show the relationship between spending and returns for a marketing channel:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li><span className="font-medium">Growth phase</span>: Returns increase proportionally or faster than spend</li>
                    <li><span className="font-medium">Efficiency phase</span>: Returns still increase but at a slower rate</li>
                    <li><span className="font-medium">Saturation phase</span>: Additional spend generates minimal or no incremental returns</li>
                  </ul>
                  <p className="text-muted-foreground mt-3">
                    The optimal spend level is typically found at the inflection point where the curve begins to flatten, 
                    just before diminishing returns become significant.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        
        {/* Platform FAQs */}
        <Card className="md:col-span-3 border-t-4 border-t-purple-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-purple-100">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <CardTitle>Platform & Features Questions</CardTitle>
            </div>
            <CardDescription>
              How to use the analytics platform effectively
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="platform-1">
                <AccordionTrigger>How often is the data updated?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    The analytics dashboard is updated daily with the previous day's performance data. 
                    Marketing mix models are typically refreshed weekly, while real-time data from 
                    digital channels may be updated more frequently throughout the day.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="platform-2">
                <AccordionTrigger>How can I export data from the platform?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Data can be exported in several formats including CSV, Excel, and PDF. Each visualization 
                    includes an export button in the top-right corner. For more customized exports, use the 
                    Data Export tool in the Settings menu to select specific metrics, time periods, and formats.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="platform-3">
                <AccordionTrigger>How can I customize the dashboard views?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    You can customize dashboard views by:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Using the "Customize View" option in the top menu of each page</li>
                    <li>Dragging and dropping widgets to rearrange them</li>
                    <li>Adding or removing metrics from charts through the settings icon</li>
                    <li>Creating saved views for different reporting needs</li>
                    <li>Setting default time periods and comparison ranges</li>
                  </ul>
                  <p className="text-muted-foreground mt-3">
                    Your customizations are saved to your user profile and will persist across sessions.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
