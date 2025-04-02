import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, BrainCircuit, ChevronRight, Filter, LightbulbIcon, LineChart, BarChart3, Zap, TrendingUp, Target, Clock, Download, Brain, Sparkles } from "lucide-react";
import { RecommendationCard } from "@/components/recommendations/RecommendationCard";
import { Link } from "react-router-dom";
import { FilterExportControls } from "@/components/channels/FilterExportControls";

// Sample recommendation data (In a real app, this would come from an API)
const recommendationsData = [
  {
    id: "rec-001",
    title: "Search Campaign Performance",
    category: "campaign",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    summary: "Increasing bid adjustments for mobile devices by 15% could improve your search campaign conversion rate.",
    impact: "medium" as const,
    metrics: {
      current: 2.8,
      projected: 3.2,
      unit: "cvr"
    },
    detailsUrl: "/campaign?id=search-campaign"
  },
  {
    id: "rec-002",
    title: "Budget Allocation Recommendation",
    category: "budget",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    summary: "Moving 20% of your display budget to social channels could increase overall ROAS by approximately 8% based on recent performance trends.",
    impact: "high" as const,
    metrics: {
      current: 3.4,
      projected: 3.7,
      unit: "roas"
    },
    detailsUrl: "/budget?optimization=true"
  },
  {
    id: "rec-003",
    title: "Mobile Conversion Optimization",
    category: "optimization",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    summary: "Mobile conversion rates are 32% lower than desktop. Optimizing your mobile landing pages could significantly improve performance.",
    impact: "high" as const,
    metrics: {
      current: 1.2,
      projected: 1.8,
      unit: "cvr"
    },
    detailsUrl: "/analytics?focus=mobile-optimization"
  },
  {
    id: "rec-004",
    title: "Audience Targeting Expansion",
    category: "audience",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    summary: "Testing a lookalike audience based on your top 5% of customers could expand your reach while maintaining conversion efficiency.",
    impact: "medium" as const,
    metrics: {
      current: 240000,
      projected: 380000,
      unit: "reach"
    },
    detailsUrl: "/audience?analysis=lookalike"
  },
  {
    id: "rec-005",
    title: "Creative Performance Alert",
    category: "creative",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    summary: "Your top performing ad creative is showing fatigue with a 12% drop in CTR over the past week. Consider refreshing your creative assets.",
    impact: "high" as const,
    metrics: {
      current: 1.8,
      projected: 2.3,
      unit: "ctr"
    },
    detailsUrl: "/creative?alert=fatigue"
  },
  {
    id: "rec-006",
    title: "Channel Synergy Opportunity",
    category: "channel",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    summary: "Customers exposed to both video and display ads have a 28% higher conversion rate. Increasing cross-channel coordination could boost performance.",
    impact: "medium" as const,
    metrics: {
      current: 2.4,
      projected: 3.1,
      unit: "cvr"
    },
    detailsUrl: "/channels?analysis=synergy"
  }
];

const RecommendationsPage = () => {
  const [filter, setFilter] = useState("all");
  const [recommendations, setRecommendations] = useState(recommendationsData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter recommendations based on selected category
    if (filter === "all") {
      setRecommendations(recommendationsData);
    } else {
      setRecommendations(recommendationsData.filter(rec => rec.category === filter));
    }
  }, [filter]);

  // Format relative time (e.g., "2 days ago")
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 14) {
      return "1 week ago";
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else if (diffDays < 60) {
      return "1 month ago";
    } else {
      return `${Math.floor(diffDays / 30)} months ago`;
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Quick Recommendations"
        description="Get AI-powered insights and actionable recommendations to optimize your marketing strategy."
      >
        <FilterExportControls
          filterOptions={{ channels: false, metrics: false }}
          exportFileName="recommendations"
          contentId="recommendations-content"
        />
      </PageHeader>
      
      <div className="dashboard-card relative overflow-hidden mb-8 bg-gradient-to-br from-purple-100 to-blue-100 border-primary/20 shadow-lg">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-purple-400"></div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-primary flex items-center gap-2">
            <Brain className="h-5 w-5" />
            <span>How can AI recommendations help?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={BarChart3} 
              title="Performance Analysis" 
              description="Get detailed insights into your marketing performance across channels."
              color="bg-purple-100 text-purple-700 shadow-purple-200"
            />
            <FeatureCard 
              icon={Zap} 
              title="Smart Recommendations" 
              description="Receive actionable suggestions to optimize your campaigns and budget."
              color="bg-amber-100 text-amber-700 shadow-amber-200"
            />
            <FeatureCard 
              icon={Sparkles} 
              title="AI-Powered Insights" 
              description="Leverage advanced AI to uncover hidden opportunities and trends."
              color="bg-blue-100 text-blue-700 shadow-blue-200"
            />
          </div>
        </div>
      </div>

      <div id="recommendations-content" className="space-y-8">
        {/* Recommendations Filter Tabs */}
        <div className="flex flex-col gap-6">
          <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All Recommendations</TabsTrigger>
                <TabsTrigger value="campaign">Campaigns</TabsTrigger>
                <TabsTrigger value="budget">Budget</TabsTrigger>
                <TabsTrigger value="optimization">Optimization</TabsTrigger>
                <TabsTrigger value="audience">Audience</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Last updated: Today at 9:15 AM</span>
              </div>
            </div>
            
            {/* Recommendations List */}
            <TabsContent value={filter} className="m-0">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <Card key={i} className="animate-pulse bg-muted/30">
                      <CardContent className="p-6 h-40"></CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recommendations.map((recommendation) => (
                    <RecommendationCard
                      key={recommendation.id}
                      title={recommendation.title}
                      category={recommendation.category}
                      date={formatRelativeTime(recommendation.date)}
                      summary={recommendation.summary}
                      impact={recommendation.impact}
                      metrics={recommendation.metrics}
                      detailsUrl={recommendation.detailsUrl}
                    />
                  ))}

                  {recommendations.length === 0 && (
                    <div className="text-center py-12">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No recommendations found</h3>
                      <p className="text-muted-foreground mt-2">
                        There are currently no recommendations in this category.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Additional Resources Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="p-3 rounded-full bg-blue-100 w-fit mb-4">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Optimize Your Strategy</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to implement our AI recommendations effectively and improve your marketing ROI.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/guide">
                    View Strategy Guide <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="p-3 rounded-full bg-purple-100 w-fit mb-4">
                  <LineChart className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Performance Tracking</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Monitor the impact of implemented recommendations and track your progress over time.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/analytics">
                    View Analytics <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="p-3 rounded-full bg-emerald-100 w-fit mb-4">
                  <LightbulbIcon className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold mb-2">Custom Insights</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Request custom insights tailored to specific aspects of your marketing strategy.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/chat-ai">
                    Ask Our AI <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  color
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  color?: string;
}) => {
  return (
    <div className={`p-5 flex flex-col gap-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${color}`}>
      <div className="bg-white/70 rounded-lg p-3 w-12 h-12 flex items-center justify-center shadow-sm">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default RecommendationsPage;
