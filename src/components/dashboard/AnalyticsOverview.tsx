
import React, { useState, useEffect, useRef } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  generatePerformanceData, 
  generateSankeyData,
  channelColors,
  generateBudgetRecommendations,
  generateChannelData,
  generateBudgetAllocation
} from "@/data/mockData";

import { ROISummaryCard } from "@/components/dashboard/ROISummaryCard";
import { PerformanceSection } from "@/components/dashboard/PerformanceSection";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";
import { TimeSeriesSection } from "@/components/dashboard/TimeSeriesSection";
import { SectionNav } from "@/components/dashboard/SectionNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, LineChart, PieChart, Activity, Zap, LightbulbIcon, Target, Download, Filter } from "lucide-react";
import { Link } from "react-router-dom";

export function AnalyticsOverview() {
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [channelData, setChannelData] = useState<any[]>([]);
  const [budgetData, setBudgetData] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState("30d");
  const [activeSection, setActiveSection] = useState("roi-summary");

  // Refs for scrolling to sections
  const roiSummaryRef = useRef<HTMLDivElement>(null);
  const revenueTrendsRef = useRef<HTMLDivElement>(null);
  const channelPerformanceRef = useRef<HTMLDivElement>(null);
  const channelAnalysisRef = useRef<HTMLDivElement>(null);
  const campaignAnalysisRef = useRef<HTMLDivElement>(null);
  const budgetAllocationRef = useRef<HTMLDivElement>(null);
  const continueAnalysisRef = useRef<HTMLDivElement>(null);

  // Section definitions
  const sections = [
    { id: "roi-summary", title: "ROI Summary", ref: roiSummaryRef },
    { id: "revenue-trends", title: "Revenue Trends", ref: revenueTrendsRef },
    { id: "channel-performance", title: "Channel Performance", ref: channelPerformanceRef },
    { id: "channel-analysis", title: "Channel Analysis", ref: channelAnalysisRef },
    { id: "campaign-analysis", title: "Campaign Analysis", ref: campaignAnalysisRef },
    { id: "budget-allocation", title: "Budget Allocation", ref: budgetAllocationRef },
    { id: "continue-analysis", title: "Continue Analysis", ref: continueAnalysisRef }
  ];

  // Handle section change
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    const section = sections.find(s => s.id === sectionId);
    if (section && section.ref.current) {
      section.ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Intersection Observer for active section tracking during scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -50% 0px',
      threshold: 0
    };

    sections.forEach(section => {
      if (section.ref.current) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);
            }
          });
        }, observerOptions);

        observer.observe(section.ref.current);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [loading]); // Re-run when loading changes to ensure refs are attached

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90;
      const performance = generatePerformanceData(days);
      const channels = generateChannelData(timeframe === "7d" ? "Q1" : timeframe === "30d" ? "Q2" : "Q3");
      const budget = generateBudgetAllocation();
      
      setPerformanceData(performance);
      setChannelData(channels);
      setBudgetData(budget);
      setLoading(false);
    };
    
    loadData();
  }, [timeframe]);

  // Calculate top-level metrics
  const totalRevenue = !loading && performanceData.length
    ? performanceData.reduce((sum, day) => sum + day.totalRevenue, 0)
    : 0;
    
  const totalCost = !loading && channelData.length
    ? channelData.reduce((sum, channel) => sum + channel.cost, 0)
    : 0;
    
  const totalRoas = totalCost > 0 ? totalRevenue / totalCost : 0;
  
  const totalConversions = !loading && channelData.length
    ? channelData.reduce((sum, channel) => sum + (channel.revenue / channel.cpa), 0)
    : 0;
    
  // Find top and bottom performing channels
  const topChannel = !loading && channelData.length
    ? channelData.reduce((prev, current) => (prev.roas > current.roas) ? prev : current, channelData[0])
    : null;
    
  const bottomChannel = !loading && channelData.length
    ? channelData.reduce((prev, current) => (prev.roas < current.roas) ? prev : current, channelData[0])
    : null;

  // Calculate week-over-week changes for revenue and cost
  const revenueChange = 5.8; // Mocked for now, would calculate from actual data
  const costChange = 3.2;    // Mocked for now, would calculate from actual data
  const roasChange = revenueChange - costChange;
  const conversionChange = 4.2;

  // Prepare data for time series visualization
  const timeSeriesData = React.useMemo(() => {
    if (loading || performanceData.length === 0) return [];
    
    // Transform performance data for time series
    return performanceData.map((day, index) => {
      // Calculate estimated cost based on revenue and overall ROAS
      const dailyCost = day.totalRevenue / (totalRoas || 1);
      
      return {
        date: day.name,
        revenue: day.totalRevenue,
        cost: Math.round(dailyCost),
        roas: dailyCost > 0 ? +(day.totalRevenue / dailyCost).toFixed(2) : 0,
        // Keep these for possible future use
        baseline: Math.round(day.totalRevenue * 0.2),
        nonPaid: Math.round(day.totalRevenue * 0.15),
        organic: Math.round(day.totalRevenue * 0.25),
        paid: Math.round(day.totalRevenue * 0.4)
      };
    });
  }, [performanceData, loading, totalRoas]);

  // Navigation stories
  const analyticsStories = [
    {
      title: "Channel Analysis",
      description: "Dive deeper into each channel's performance and identify optimization opportunities",
      icon: BarChart,
      path: "/channels",
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Campaign Analysis",
      description: "Analyze campaigns across channels to understand what's working",
      icon: Activity,
      path: "/channel-details",
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Budget Optimizer",
      description: "Optimize your channel mix to maximize ROI and revenue",
      icon: PieChart,
      path: "/budget",
      color: "bg-green-100 text-green-700"
    },
    {
      title: "A/B Testing",
      description: "See test results and measure the impact of your experiments",
      icon: LineChart,
      path: "/ab-testing",
      color: "bg-amber-100 text-amber-700"
    }
  ];

  // Generate mock campaign data for the new section
  const topCampaigns = [
    {
      id: "camp-1",
      name: "Summer Sale Promotion",
      revenue: 32450,
      cost: 8500,
      impressions: 1240000,
      clicks: 65000,
      conversions: 2150,
      roas: 3.82
    },
    {
      id: "camp-2",
      name: "New Customer Acquisition",
      revenue: 28900,
      cost: 12000,
      impressions: 980000,
      clicks: 48000,
      conversions: 1850,
      roas: 2.41
    },
    {
      id: "camp-3",
      name: "Brand Awareness Campaign",
      revenue: 18200,
      cost: 6800,
      impressions: 1560000,
      clicks: 42000,
      conversions: 920,
      roas: 2.68
    }
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader 
        title="Strategic Overview" 
        description="Your marketing performance journey starts here with comprehensive insights and data visualization tools to make informed decisions."
      >
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" variant="outline" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Tabs 
            defaultValue="30d" 
            value={timeframe} 
            onValueChange={setTimeframe}
            className="w-[240px]"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
              <TabsTrigger value="90d">90D</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </PageHeader>
      
      {/* Performance Insights Section - Transformed from a box to a more sleek design */}
      <div className="bg-gradient-to-br from-blue-50 to-white/50 p-6 rounded-2xl shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-blue-100/70">
            <LightbulbIcon className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Key Performance Insights</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold mt-1">•</span> 
                <span>Your top performing channel is <span className="font-medium text-foreground">{topChannel?.name || 'Loading...'}</span> with a ROAS of {topChannel?.roas.toFixed(2) || '0'}x</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold mt-1">•</span> 
                <span>Overall ROAS is <span className="font-medium text-foreground">{totalRoas.toFixed(2)}x</span>, which is {roasChange >= 0 ? 'up' : 'down'} {Math.abs(roasChange).toFixed(1)}% vs. previous period</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold mt-1">•</span> 
                <span>Consider optimizing your budget allocation to improve performance of <span className="font-medium text-foreground">{bottomChannel?.name || 'Loading...'}</span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <SectionNav 
        sections={sections.map(s => ({ id: s.id, title: s.title }))}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      
      {/* Introduction Card */}
      <Card className="mb-8 border-l-4 border-l-blue-500 animate-fade-in">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-blue-100">
              <LightbulbIcon className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Your Analytics Journey</h2>
              <p className="text-muted-foreground">
                Follow your marketing performance story from high-level ROI metrics down to channel 
                optimization opportunities. Use the insights to optimize your strategy and improve results.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Part 1: Return on Investment - The Big Picture */}
      <div className="mb-10" ref={roiSummaryRef}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm">1</span>
            The Big Picture: ROI Summary
          </h2>
        </div>
        
        {/* Top-level ROI overview card */}
        <ROISummaryCard
          totalRevenue={totalRevenue}
          totalCost={totalCost}
          totalRoas={totalRoas}
          revenueChange={revenueChange}
          costChange={costChange}
          roasChange={roasChange}
          topChannel={topChannel}
          bottomChannel={bottomChannel}
        />
      </div>
      
      {/* Part 2: Revenue Trends Over Time */}
      <div className="mb-10" ref={revenueTrendsRef}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm">2</span>
            Revenue Trends Over Time
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/data" className="flex items-center gap-1">
              Detailed trends <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {/* Revenue and Cost Time Series */}
        <TimeSeriesSection
          data={timeSeriesData}
          loading={loading}
        />
      </div>
      
      {/* Part 3: Channel Performance */}
      <div className="mb-10" ref={channelPerformanceRef}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm">3</span>
            Channel Performance
          </h2>
        </div>
        
        {/* Performance chart */}
        <PerformanceSection
          performanceData={performanceData}
          loading={loading}
          channelColors={channelColors}
        />
      </div>
      
      {/* Part 4: Channel Analysis */}
      <div className="mb-10" ref={channelAnalysisRef}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm">4</span>
            Channel Analysis
          </h2>
        </div>
        
        {/* Channel Analysis with combined view */}
        <AnalyticsSection
          channelData={channelData}
          loading={loading}
          channelColors={channelColors}
        />
      </div>
      
      {/* Part 5: Campaign Analysis */}
      <div className="mb-10" ref={campaignAnalysisRef}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm">5</span>
            Campaign Analysis
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/channel-details" className="flex items-center gap-1">
              View all campaigns <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {/* Campaign performance cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {topCampaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-base">{campaign.name}</h3>
                    <p className="text-sm text-muted-foreground">Campaign ID: {campaign.id}</p>
                  </div>
                  <div className="p-2 rounded-full bg-blue-100">
                    <Target className="h-5 w-5 text-blue-700" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-lg font-semibold">${campaign.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ROAS</p>
                    <p className="text-lg font-semibold">{campaign.roas.toFixed(2)}x</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Impressions</p>
                    <p className="text-lg font-semibold">{(campaign.impressions / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Conversions</p>
                    <p className="text-lg font-semibold">{campaign.conversions.toLocaleString()}</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/channel-details?campaign=${campaign.id}`}>
                    View campaign details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Part 6: Budget Allocation */}
      <div className="mb-10" ref={budgetAllocationRef}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm">6</span>
            Budget Allocation
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/budget" className="flex items-center gap-1">
              Optimize Budget <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {generateBudgetRecommendations().map((recommendation) => (
            <Card key={recommendation.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-base">{recommendation.name}</h3>
                    <p className="text-sm text-muted-foreground">Channel Budget</p>
                  </div>
                  <div 
                    className="p-2 rounded-full"
                    style={{ backgroundColor: recommendation.color + "1A" }}
                  >
                    <PieChart 
                      className="h-5 w-5" 
                      style={{ color: recommendation.color }} 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Budget</p>
                    <p className="text-lg font-semibold">${recommendation.currentBudget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recommended Budget</p>
                    <p className="text-lg font-semibold">${recommendation.recommendedBudget.toLocaleString()}</p>
                  </div>
                  <div className="col-span-2">
                    <div 
                      className={`text-xs px-2 py-1 rounded ${
                        recommendation.change > 0 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {recommendation.change > 0 ? "+" : ""}{recommendation.change}% Change
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Part 7: Continue Your Analysis */}
      <div className="mb-10" ref={continueAnalysisRef}>
        <div className="mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm">7</span>
            Continue Your Analysis
          </h2>
          <p className="text-muted-foreground mt-1">Choose where to explore next based on your goals</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsStories.map((story, index) => (
            <Link to={story.path} key={index}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                <div className={`p-6 ${story.color}`}>
                  <story.icon className="h-10 w-10" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{story.title}</h3>
                  <p className="text-muted-foreground text-sm">{story.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Insights Card */}
      <Card className="mb-8 border-l-4 border-l-amber-500 animate-fade-in">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-amber-100">
              <Zap className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Key Insights</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span> 
                  <span>Your top performing channel is <span className="font-medium text-foreground">{topChannel?.name || 'Loading...'}</span> with a ROAS of {topChannel?.roas.toFixed(2) || '0'}x</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span> 
                  <span>Overall ROAS is <span className="font-medium text-foreground">{totalRoas.toFixed(2)}x</span>, which is {roasChange >= 0 ? 'up' : 'down'} {Math.abs(roasChange).toFixed(1)}% vs. previous period</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span> 
                  <span>Consider optimizing your budget allocation to improve performance of <span className="font-medium text-foreground">{bottomChannel?.name || 'Loading...'}</span></span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
