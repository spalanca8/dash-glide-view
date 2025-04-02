
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, LineChart, Wallet, Users, Layout, BarChart4, ChevronRight, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";

type MetricsData = {
  current: number;
  projected: number;
  unit: string;
};

type RecommendationCardProps = {
  title: string;
  category: string;
  date: string;
  summary: string;
  impact: "low" | "medium" | "high";
  metrics: MetricsData;
  detailsUrl: string;
};

export function RecommendationCard({
  title,
  category,
  date,
  summary,
  impact,
  metrics,
  detailsUrl
}: RecommendationCardProps) {
  // Get the appropriate icon based on category
  const getCategoryIcon = () => {
    switch (category) {
      case "campaign":
        return <BarChart3 className="h-5 w-5 text-blue-600" />;
      case "budget":
        return <Wallet className="h-5 w-5 text-green-600" />;
      case "optimization":
        return <TrendingUp className="h-5 w-5 text-amber-600" />;
      case "audience":
        return <Users className="h-5 w-5 text-purple-600" />;
      case "creative":
        return <Layout className="h-5 w-5 text-red-600" />;
      case "channel":
        return <LineChart className="h-5 w-5 text-indigo-600" />;
      default:
        return <Zap className="h-5 w-5 text-primary" />;
    }
  };

  // Format the metrics value based on the unit
  const formatMetric = (value: number, unit: string) => {
    switch (unit) {
      case "roas":
        return `${value.toFixed(1)}x`;
      case "cvr":
      case "ctr":
        return `${value.toFixed(1)}%`;
      case "reach":
        return value >= 1000000 
          ? `${(value / 1000000).toFixed(1)}M` 
          : `${(value / 1000).toFixed(0)}K`;
      default:
        return value.toFixed(1);
    }
  };

  // Get the label for the unit
  const getUnitLabel = (unit: string) => {
    switch (unit) {
      case "roas":
        return "ROAS";
      case "cvr":
        return "Conversion Rate";
      case "ctr":
        return "Click-Through Rate";
      case "reach":
        return "Audience Reach";
      default:
        return unit.toUpperCase();
    }
  };

  // Get impact color
  const getImpactColor = () => {
    switch (impact) {
      case "high":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate percentage improvement
  const improvementPercentage = ((metrics.projected - metrics.current) / metrics.current * 100).toFixed(1);

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Left section with icon and category */}
          <div className="p-6 md:w-64 bg-muted/20 flex flex-col justify-between">
            <div>
              <div className="p-3 rounded-full bg-primary/10 w-fit mb-3">
                {getCategoryIcon()}
              </div>
              <h3 className="font-semibold text-lg mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{date}</p>
              <div className={`text-xs px-2 py-1 rounded w-fit ${getImpactColor()}`}>
                {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
              </div>
            </div>
          </div>

          {/* Right section with summary and metrics */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-sm md:text-base mb-6">
                {summary}
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current</p>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">
                      {formatMetric(metrics.current, metrics.unit)}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {getUnitLabel(metrics.unit)}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Projected</p>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-green-600">
                      {formatMetric(metrics.projected, metrics.unit)}
                    </span>
                    <span className="text-xs text-green-600 ml-2">
                      +{improvementPercentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" asChild>
                <Link to={detailsUrl}>
                  Get more details <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
