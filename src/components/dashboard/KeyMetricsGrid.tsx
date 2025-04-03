
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { channelColors } from "@/data/mockData";

type KeyMetricsGridProps = {
  totalRevenue: number;
  totalCost: number;
  totalRoas: number;
  totalConversions: number;
  revenueChange: number;
  costChange: number;
  roasChange: number;
  conversionChange: number;
  loading: boolean;
  campaignData?: any[] | null;
};

export function KeyMetricsGrid({
  totalRevenue,
  totalCost,
  totalRoas,
  totalConversions,
  revenueChange,
  costChange,
  roasChange,
  conversionChange,
  loading,
  campaignData = null,
}: KeyMetricsGridProps) {
  // If we have campaign data, show the overview metrics in the style requested
  if (campaignData && campaignData.length > 0) {
    // Calculate metrics for campaigns
    const metrics = [
      {
        name: "Revenue Overview",
        property: "revenue",
        format: (val: number | undefined | null) => {
          if (val === undefined || val === null) return "$0";
          return `$${val.toLocaleString()}`;
        },
        average: campaignData.reduce((sum, item) => sum + (item.revenue || 0), 0) / campaignData.length,
        best: campaignData.reduce((best, item) => (item.revenue || 0) > (best?.revenue || 0) ? item : best, campaignData[0]),
        worst: campaignData.reduce((worst, item) => (item.revenue || 0) < (worst?.revenue || 0) ? item : worst, campaignData[0])
      },
      {
        name: "Cost Overview",
        property: "cost",
        format: (val: number | undefined | null) => {
          if (val === undefined || val === null) return "$0";
          return `$${val.toLocaleString()}`;
        },
        average: campaignData.reduce((sum, item) => sum + (item.cost || 0), 0) / campaignData.length,
        // For cost, lower is better
        best: campaignData.reduce((best, item) => (item.cost || 0) < (best?.cost || 0) ? item : best, campaignData[0]),
        worst: campaignData.reduce((worst, item) => (item.cost || 0) > (worst?.cost || 0) ? item : worst, campaignData[0])
      },
      {
        name: "ROAS Overview",
        property: "roas",
        format: (val: number | undefined | null) => {
          if (val === undefined || val === null) return "0.00x";
          return `${val.toFixed(2)}x`;
        },
        average: campaignData.reduce((sum, item) => {
          const roas = item.revenue / item.cost;
          return sum + (isFinite(roas) ? roas : 0);
        }, 0) / campaignData.length,
        best: campaignData.reduce((best, item) => {
          const bestRoas = best.revenue / best.cost;
          const itemRoas = item.revenue / item.cost;
          return (isFinite(itemRoas) && itemRoas > bestRoas) ? item : best;
        }, campaignData[0]),
        worst: campaignData.reduce((worst, item) => {
          const worstRoas = worst.revenue / worst.cost;
          const itemRoas = item.revenue / item.cost;
          return (isFinite(itemRoas) && itemRoas < worstRoas) ? item : worst;
        }, campaignData[0])
      },
      {
        name: "Conversion Overview",
        property: "conversionRate",
        format: (val: number | undefined | null) => {
          if (val === undefined || val === null) return "0.00%";
          return `${val.toFixed(2)}%`;
        },
        average: campaignData.reduce((sum, item) => {
          return sum + (item.conversionRate || 0);
        }, 0) / campaignData.length,
        best: campaignData.reduce((best, item) => {
          return (item.conversionRate || 0) > (best.conversionRate || 0) ? item : best;
        }, campaignData[0]),
        worst: campaignData.reduce((worst, item) => {
          return (item.conversionRate || 0) < (worst.conversionRate || 0) ? item : worst;
        }, campaignData[0])
      }
    ];

    return (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.name} className="overflow-hidden border hover:shadow-md transition-shadow">
            <div className="bg-primary/10 py-3 px-6">
              <h3 className="text-lg font-medium">{metric.name}</h3>
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <span className="text-sm font-medium text-muted-foreground">Average:</span>
                <span className="text-xl ">{metric.format(metric.average)}</span>
              </div>
              
              <div className="space-y-5">
                <div className="group relative overflow-hidden rounded-md p-3 transition-all hover:bg-primary/5">
                  <div className="absolute left-0 top-0 h-full w-1 bg-green-500"></div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowUp className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Best:</span>
                    </div>
                  </div>
                  <div className="mt-1 flex justify-between items-center">
                    <span className="font-medium text-sm">{metric.best?.name || "N/A"}</span>
                    <span className="">
                      {metric.format(metric.best?.[metric.property])}
                    </span>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden rounded-md p-3 transition-all hover:bg-primary/5">
                  <div className="absolute left-0 top-0 h-full w-1 bg-red-500"></div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowDown className="h-5 w-5 text-red-500" />
                      <span className="text-sm font-medium">Worst:</span>
                    </div>
                  </div>
                  <div className="mt-1 flex justify-between items-center">
                    <span className="font-medium text-sm">{metric.worst?.name || "N/A"}</span>
                    <span className="">
                      {metric.format(metric.worst?.[metric.property])}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Default display for when we don't have campaign data
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="stats-card animate-fade-in">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
          <div className="text-muted-foreground"><DollarSign className="h-4 w-4" /></div>
        </div>
        
        <div className="mt-1">
          {loading ? (
            <div className="h-8 w-24 bg-muted rounded animate-pulse"></div>
          ) : (
            <h3 className="text-2xl ">${totalRevenue.toLocaleString()}</h3>
          )}
        </div>
        
        {revenueChange !== undefined && (
          <div className="flex items-center mt-1">
            <span className={`text-xs font-medium flex items-center ${revenueChange > 0 ? 'text-green-600' : revenueChange < 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
              {revenueChange > 0 && <ArrowUp className="mr-1 h-3 w-3" />}
              {revenueChange < 0 && <ArrowDown className="mr-1 h-3 w-3" />}
              {revenueChange > 0 ? '+' : ''}{revenueChange}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              vs. previous period
            </span>
          </div>
        )}
      </div>
      
      <div className="stats-card animate-fade-in">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-muted-foreground">Marketing Spend</p>
          <div className="text-muted-foreground"><Wallet className="h-4 w-4" /></div>
        </div>
        
        <div className="mt-1">
          {loading ? (
            <div className="h-8 w-24 bg-muted rounded animate-pulse"></div>
          ) : (
            <h3 className="text-2xl ">${totalCost.toLocaleString()}</h3>
          )}
        </div>
        
        {costChange !== undefined && (
          <div className="flex items-center mt-1">
            <span className={`text-xs font-medium flex items-center ${costChange > 0 ? 'text-red-600' : costChange < 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
              {costChange > 0 && <ArrowUp className="mr-1 h-3 w-3" />}
              {costChange < 0 && <ArrowDown className="mr-1 h-3 w-3" />}
              {costChange > 0 ? '+' : ''}{costChange}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              vs. previous period
            </span>
          </div>
        )}
      </div>
      
      <div className="stats-card animate-fade-in">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-muted-foreground">Return on Ad Spend</p>
          <div className="text-muted-foreground"><TrendingUp className="h-4 w-4" /></div>
        </div>
        
        <div className="mt-1">
          {loading ? (
            <div className="h-8 w-24 bg-muted rounded animate-pulse"></div>
          ) : (
            <h3 className="text-2xl ">{totalRoas.toFixed(2)}x</h3>
          )}
        </div>
        
        {roasChange !== undefined && (
          <div className="flex items-center mt-1">
            <span className={`text-xs font-medium flex items-center ${roasChange > 0 ? 'text-green-600' : roasChange < 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
              {roasChange > 0 && <ArrowUp className="mr-1 h-3 w-3" />}
              {roasChange < 0 && <ArrowDown className="mr-1 h-3 w-3" />}
              {roasChange > 0 ? '+' : ''}{roasChange}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              vs. previous period
            </span>
          </div>
        )}
      </div>
      
      <div className="stats-card animate-fade-in">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-muted-foreground">Total Conversions</p>
          <div className="text-muted-foreground"><Users className="h-4 w-4" /></div>
        </div>
        
        <div className="mt-1">
          {loading ? (
            <div className="h-8 w-24 bg-muted rounded animate-pulse"></div>
          ) : (
            <h3 className="text-2xl ">{Math.round(totalConversions).toLocaleString()}</h3>
          )}
        </div>
        
        {conversionChange !== undefined && (
          <div className="flex items-center mt-1">
            <span className={`text-xs font-medium flex items-center ${conversionChange > 0 ? 'text-green-600' : conversionChange < 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
              {conversionChange > 0 && <ArrowUp className="mr-1 h-3 w-3" />}
              {conversionChange < 0 && <ArrowDown className="mr-1 h-3 w-3" />}
              {conversionChange > 0 ? '+' : ''}{conversionChange}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              vs. previous period
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// Need to import the icons used in the original component
import { DollarSign, Wallet, TrendingUp, Users } from "lucide-react";
