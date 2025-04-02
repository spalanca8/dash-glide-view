import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { SectionNav } from "@/components/dashboard/SectionNav";
import { 
  ChevronRight, 
  Lightbulb, 
  Target, 
  BarChart3, 
  ArrowUpRight, 
  Zap,
  TrendingUp,
  PieChart,
  LineChart,
  AreaChart,
  Users,
  Layers,
  HelpCircle,
  FileBarChart
} from "lucide-react";
import { Link } from "react-router-dom";
// Note: We're removing the ChannelSaturationCurve import since we won't need it anymore
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";

const journeySections = [
  { id: "roi", title: "ROI Summary" },
  { id: "revenue", title: "Revenue Trends" },
  { id: "channel", title: "Channel Performance" },
  { id: "attribution", title: "Attribution" },
  { id: "optimization", title: "Optimization" },
  { id: "forecasting", title: "Forecasting" },
  { id: "insights", title: "Insights" }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("roi");
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Calculate progress based on active section
  const journeyProgress = ((journeySections.findIndex(s => s.id === activeSection) + 1) / journeySections.length) * 100;
  
  useEffect(() => {
    // Animate progress on load
    const timer = setTimeout(() => {
      setProgress(journeyProgress);
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [journeyProgress]);
  
  // Add default values for saturation curve props
  const defaultCustomBudgets = {
    "bau": { "social": 15000, "search": 20000, "display": 10000, "video": 5000 },
    "cost-savings": { "social": 13500, "search": 18000, "display": 9000, "video": 4500 },
    "revenue-uplift": { "social": 18000, "search": 24000, "display": 12000, "video": 6000 }
  };
  
  return (
    <div className="space-y-8">
      <Helmet>
        <title>Analytics Dashboard - Artefact</title>
      </Helmet>
      
      {/* Remove the header section with progress */}
      
      {/* Hero Section with gradient background */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-purple-50/30 rounded-2xl p-8 border border-indigo-100/50 shadow-lg animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <div className="p-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 animate-float shadow-sm">
            <Target className="h-10 w-10 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">Marketing Analytics Dashboard</h1>
            <p className="text-muted-foreground text-balance text-lg">
              Gain actionable insights from your marketing data with comprehensive analytics and visualizations
            </p>
          </div>
          <Link 
            to="/data" 
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors shadow-md"
          >
            <span>View Detailed Data</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Analytics Overview with enhanced styling */}
        <Card className="bg-white/90 rounded-xl shadow-md border-indigo-100/50 overflow-hidden">
          <CardContent className="p-6">
            <AnalyticsOverview />
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Insights Section */}
      <div className="space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">Quick Insights</h2>
            <p className="text-muted-foreground">Get a snapshot of your marketing performance</p>
          </div>
          <Link 
            to="/channels" 
            className="flex items-center text-primary font-medium hover:underline mt-2 md:mt-0"
          >
            View all channels <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {/* Quick Action Cards - Enhanced Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-white to-blue-50/50 border-blue-100/50 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col gap-3">
              <div className="p-3 rounded-full bg-blue-50 w-fit">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Channel Analysis</h3>
                <p className="text-sm text-muted-foreground">Compare performance across channels</p>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium text-blue-600">4 active channels</span>
                <ChevronRight className="h-4 w-4 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-green-50/50 border-green-100/50 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col gap-3">
              <div className="p-3 rounded-full bg-green-50 w-fit">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Revenue Tracking</h3>
                <p className="text-sm text-muted-foreground">Monitor trends and predictions</p>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium text-green-600">+12.5% this month</span>
                <ChevronRight className="h-4 w-4 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-amber-50/50 border-amber-100/50 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col gap-3">
              <div className="p-3 rounded-full bg-amber-50 w-fit">
                <Zap className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Quick Insights</h3>
                <p className="text-sm text-muted-foreground">Actionable recommendations</p>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium text-amber-600">3 new insights</span>
                <ChevronRight className="h-4 w-4 text-amber-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-purple-50/50 border-purple-100/50 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col gap-3">
              <div className="p-3 rounded-full bg-purple-50 w-fit">
                <PieChart className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Budget Allocation</h3>
                <p className="text-sm text-muted-foreground">Optimize spending distribution</p>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium text-purple-600">Budget review due</span>
                <ChevronRight className="h-4 w-4 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Saturation Curve Analysis - Enhanced */}
      
      {/* Help & Resources Section */}
      <div className="bg-gradient-to-br from-emerald-50/30 to-teal-50/30 rounded-2xl p-8 border border-emerald-100/50 shadow-md animate-fade-in" style={{ animationDelay: "400ms" }}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Help & Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pages Guide */}
          <Link to="/guide" className="flex flex-col gap-4 p-6 rounded-xl bg-white/80 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="p-3 rounded-full bg-blue-50 w-fit">
              <Layers className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Pages Guide</h3>
              <p className="text-sm text-muted-foreground">
                Explore available pages and understand their functions
              </p>
            </div>
          </Link>
          
          {/* Metrics Guide */}
          <Link to="/metrics-guide" className="flex flex-col gap-4 p-6 rounded-xl bg-white/80 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="p-3 rounded-full bg-green-50 w-fit">
              <FileBarChart className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Metrics Guide</h3>
              <p className="text-sm text-muted-foreground">
                Learn about the key metrics and how to interpret them
              </p>
            </div>
          </Link>
          
          {/* FAQ */}
          <Link to="/faq" className="flex flex-col gap-4 p-6 rounded-xl bg-white/80 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="p-3 rounded-full bg-purple-50 w-fit">
              <HelpCircle className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">FAQ</h3>
              <p className="text-sm text-muted-foreground">
                Find answers to commonly asked questions about analytics
              </p>
            </div>
          </Link>
        </div>
        
        <div className="mt-6 text-center">
          <Link
            to="/methodologies"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md"
          >
            <Lightbulb className="h-4 w-4" />
            <span>Learn Analytics Methodologies</span>
          </Link>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-gradient-to-br from-indigo-50/30 to-white rounded-2xl p-8 border border-indigo-100/50 shadow-md animate-fade-in" style={{ animationDelay: "500ms" }}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Comprehensive Analytics Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-4 p-4 rounded-xl bg-white/80 border border-gray-100 shadow-sm">
            <div className="p-3 rounded-full bg-blue-50 w-fit">
              <LineChart className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Advanced Forecasting</h3>
              <p className="text-sm text-muted-foreground">
                Use machine learning algorithms to predict future performance and identify trends before they emerge.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 p-4 rounded-xl bg-white/80 border border-gray-100 shadow-sm">
            <div className="p-3 rounded-full bg-green-50 w-fit">
              <AreaChart className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Multi-Channel Attribution</h3>
              <p className="text-sm text-muted-foreground">
                Understand the true impact of each marketing channel with sophisticated attribution modeling.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 p-4 rounded-xl bg-white/80 border border-gray-100 shadow-sm">
            <div className="p-3 rounded-full bg-purple-50 w-fit">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Audience Insights</h3>
              <p className="text-sm text-muted-foreground">
                Gain deeper understanding of your audience segments and their behaviors across touchpoints.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link
            to="/guide"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-md"
          >
            <Layers className="h-4 w-4" />
            <span>Explore All Features</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
