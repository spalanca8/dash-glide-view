
import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Lightbulb, 
  Layers, 
  FileBarChart, 
  Radio, 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  LineChart, 
  Settings,
  ArrowRight,
  Info
} from "lucide-react";

export default function GuidePage() {
  return (
    <div className="space-y-8 pb-8 animate-fade-in">
      <PageHeader 
        title="Pages Guide" 
        description="Explore all features and sections of this application" 
      />
      
      {/* Hero Section */}
      <div className="relative p-8 rounded-xl overflow-hidden bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
        <div className="absolute inset-0 bg-black opacity-5 pattern-grid-lg mix-blend-multiply"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Welcome to Marketing Mix Modeling</h2>
          <p className="text-lg max-w-3xl opacity-90 mb-4">
            Discover how our platform helps you measure, analyze, and optimize your marketing performance across channels.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" asChild>
              <Link to="/">Start Exploring</Link>
            </Button>
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
              <Link to="/methodologies">Learn About Methodologies</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-10">
        {/* Overview Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <LayoutDashboard className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Overview</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Analytics Overview Page */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow border-t-4 border-t-blue-500">
              <CardContent className="p-0">
                <div className="bg-blue-50 p-4">
                  <LayoutDashboard className="h-10 w-10 text-blue-600" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">Analytics Overview</h3>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">Overview</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Get a comprehensive view of your marketing performance with key metrics and insights.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/">
                      Go to Analytics Overview <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Analytics Methodologies Page */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow border-t-4 border-t-purple-500">
              <CardContent className="p-0">
                <div className="bg-purple-50 p-4">
                  <Lightbulb className="h-10 w-10 text-purple-600" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">Analytics Methodologies</h3>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100">Overview</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Learn about the statistical methods and models used to analyze marketing performance.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/methodologies">
                      Go to Methodologies <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Data Overview Page */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow border-t-4 border-t-indigo-500">
              <CardContent className="p-0">
                <div className="bg-indigo-50 p-4">
                  <Layers className="h-10 w-10 text-indigo-600" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">Data Overview</h3>
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">Overview</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Explore the data sources and historical trends in your marketing analytics.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/data">
                      Go to Data Overview <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Analysis Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Analysis</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Exploratory Data Analysis Page */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow border-t-4 border-t-emerald-500">
              <CardContent className="p-0">
                <div className="bg-emerald-50 p-4">
                  <FileBarChart className="h-10 w-10 text-emerald-600" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">Exploratory Data Analysis</h3>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">Analysis</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Deep dive into your marketing metrics and KPIs with interactive visualizations.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/metrics">
                      Go to Metrics <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Channel Analysis Page */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow border-t-4 border-t-pink-500">
              <CardContent className="p-0">
                <div className="bg-pink-50 p-4">
                  <Radio className="h-10 w-10 text-pink-600" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">Channel Analysis</h3>
                    <Badge variant="outline" className="bg-pink-50 text-pink-700 hover:bg-pink-100">Analysis</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Compare performance across marketing channels to identify strengths and opportunities.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/channels">
                      Go to Channel Analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Campaign Analysis Page */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow border-t-4 border-t-amber-500">
              <CardContent className="p-0">
                <div className="bg-amber-50 p-4">
                  <BarChart3 className="h-10 w-10 text-amber-600" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">Campaign Analysis</h3>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100">Analysis</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Analyze individual campaign performance and optimization opportunities.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/channel-details">
                      Go to Campaign Analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Incremental Analysis Page */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow border-t-4 border-t-sky-500">
              <CardContent className="p-0">
                <div className="bg-sky-50 p-4">
                  <TrendingUp className="h-10 w-10 text-sky-600" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">Incremental Analysis</h3>
                    <Badge variant="outline" className="bg-sky-50 text-sky-700 hover:bg-sky-100">Analysis</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Measure the true incremental impact of your marketing activities beyond baseline.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/incremental">
                      Go to Incremental Analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Additional Tools Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <PieChart className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Optimization Tools</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Budget Optimizer Page */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow border-t-4 border-t-green-500">
              <CardContent className="p-0">
                <div className="bg-green-50 p-4">
                  <PieChart className="h-10 w-10 text-green-600" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">Budget Optimizer</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">Tool</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Optimize your marketing budget allocation across channels for maximum ROI.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/budget">
                      Go to Budget Optimizer <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* A/B Testing Page */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow border-t-4 border-t-violet-500">
              <CardContent className="p-0">
                <div className="bg-violet-50 p-4">
                  <LineChart className="h-10 w-10 text-violet-600" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">A/B Testing</h3>
                    <Badge variant="outline" className="bg-violet-50 text-violet-700 hover:bg-violet-100">Tool</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Analyze experimental results and optimize your marketing campaigns.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/ab-testing">
                      Go to A/B Testing <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Settings Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Settings className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">System Settings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Settings Page */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow border-t-4 border-t-slate-500">
              <CardContent className="p-0">
                <div className="bg-slate-50 p-4">
                  <Settings className="h-10 w-10 text-slate-600" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">Settings</h3>
                    <Badge variant="outline" className="bg-slate-50 text-slate-700 hover:bg-slate-100">System</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Configure your dashboard preferences, integrations, and user settings.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/settings">
                      Go to Settings <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      
      {/* Info Card */}
      <Card className="border-l-4 border-l-blue-500 bg-blue-50/50">
        <CardContent className="p-5 flex gap-4">
          <div className="bg-blue-100 rounded-full p-2 h-min">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              This guide provides an overview of all main sections of the application. Each page contains detailed information and interactive elements to help you analyze your marketing performance.
            </p>
            <Button variant="outline" size="sm" className="bg-white">Contact Support</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
