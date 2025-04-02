import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart2, CheckCircle, Clock, FileBarChart, Settings, Zap, TrendingUp, LineChart, DollarSign, TargetIcon, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { FlowingBackground } from "@/components/ui/FlowingBackground";

const GettingStartedPage = () => {
  return (
    <div className="space-y-8 relative">
      <FlowingBackground className="opacity-20" />
      
      {/* Hero section with value proposition */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-purple-50/30 rounded-2xl p-8 border border-indigo-100/50 shadow-lg">
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 shadow-sm">
              <BarChart2 className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Welcome to Your Marketing Intelligence Platform</h1>
          <p className="text-lg text-muted-foreground text-center">
            Transform raw marketing data into actionable insights to drive revenue growth and optimize marketing ROI
          </p>
        </div>
      </div>
      
      {/* Business Impact Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Why This Platform Matters</CardTitle>
          <CardDescription>
            The business impact our analytics delivers for marketing leaders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col gap-3">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium">15-20% ROI Improvement</h3>
              <p className="text-muted-foreground">
                Our clients typically see a 15-20% improvement in marketing ROI within the first three months by optimizing channel allocation based on our analytics.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium">Precision Targeting</h3>
              <p className="text-muted-foreground">
                Identify high-value audience segments and optimize campaigns for specific customer journeys, resulting in higher conversion rates and customer lifetime value.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium">Budget Optimization</h3>
              <p className="text-muted-foreground">
                Move beyond gut feelings with data-driven budget allocation that maximizes return across all marketing channels and eliminates wasteful spending.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* The Platform Story */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">The Story Behind This Platform</CardTitle>
          <CardDescription>
            How we built a solution to solve the most challenging marketing problems
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <p>
            In today's complex marketing landscape, teams struggle with disconnected data sources, unclear attribution, and difficulty measuring true ROI. This platform was built to solve these exact challenges.
          </p>
          
          <p>
            Working with marketing leaders across industries, we identified the critical need for a unified view of marketing performance that goes beyond basic metrics to reveal genuine business impact. Our solution combines multi-touch attribution, incremental measurement, and predictive analytics to give you both a comprehensive view and actionable insights.
          </p>
          
          <p>
            What makes this platform different is how it connects marketing activities directly to business outcomes, helping you understand not just what happened, but why it happened and what to do next.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Setup Card */}
        <Card>
          <CardHeader>
            <Clock className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Quick Setup</CardTitle>
            <CardDescription>
              Complete these tasks to get your dashboard ready
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-0.5">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Create your account</p>
                  <p className="text-sm text-muted-foreground">
                    You're already logged in and ready to go
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-0.5">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Connect your data sources</p>
                  <p className="text-sm text-muted-foreground">
                    Import your marketing and analytics data from Google, Meta, and other platforms
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-0.5">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Configure your metrics</p>
                  <p className="text-sm text-muted-foreground">
                    Set up key performance indicators that align with your business goals
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button asChild>
                  <Link to="/settings">
                    Continue Setup <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Tools Explained */}
        <Card>
          <CardHeader>
            <Zap className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Key Tools Explained</CardTitle>
            <CardDescription>
              Understand the powerful analytics capabilities at your disposal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link to="/analytics" className="flex items-start gap-4 group hover:bg-muted p-2 rounded-lg transition-colors">
                <div className="mt-0.5">
                  <FileBarChart className="h-5 w-5 text-primary group-hover:text-primary" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-primary">Analytics Overview</p>
                  <p className="text-sm text-muted-foreground">
                    A high-level view of all marketing performance with real-time metrics and trends
                  </p>
                </div>
              </Link>
              
              <Link to="/channels" className="flex items-start gap-4 group hover:bg-muted p-2 rounded-lg transition-colors">
                <div className="mt-0.5">
                  <LineChart className="h-5 w-5 text-primary group-hover:text-primary" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-primary">Channel Analysis</p>
                  <p className="text-sm text-muted-foreground">
                    Compare performance across channels, identify optimization opportunities and ROI improvements
                  </p>
                </div>
              </Link>
              
              <Link to="/incremental" className="flex items-start gap-4 group hover:bg-muted p-2 rounded-lg transition-colors">
                <div className="mt-0.5">
                  <TrendingUp className="h-5 w-5 text-primary group-hover:text-primary" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-primary">Incremental Analysis</p>
                  <p className="text-sm text-muted-foreground">
                    Measure the true incremental impact of marketing activities beyond baseline performance
                  </p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How to Use This Platform */}
      <Card>
        <CardHeader>
          <CardTitle>How to Get Maximum Value</CardTitle>
          <CardDescription>
            A proven workflow to drive business decisions with data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-2 p-4 border border-border rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="font-medium">Analyze Current Performance</h3>
              <p className="text-sm text-muted-foreground">
                Begin with the Analytics Overview to identify your baseline metrics, spot anomalies, and understand current ROI across channels
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-2 p-4 border border-border rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="font-medium">Optimize Allocation</h3>
              <p className="text-sm text-muted-foreground">
                Use Channel Analysis to find underperforming areas and opportunities for budget reallocation to maximize returns
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-2 p-4 border border-border rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="font-medium">Measure & Iterate</h3>
              <p className="text-sm text-muted-foreground">
                Track the incremental impact of your changes and continuously refine your strategy based on performance data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center mt-8">
        <Button size="lg" asChild>
          <Link to="/analytics">
            Explore Your Analytics Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default GettingStartedPage;
