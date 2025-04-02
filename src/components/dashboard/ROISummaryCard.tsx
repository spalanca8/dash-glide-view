
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Wallet, BarChart3 } from "lucide-react";

type ROISummaryCardProps = {
  totalRevenue: number;
  totalCost: number;
  totalRoas: number;
  revenueChange: number;
  costChange: number;
  roasChange: number;
  topChannel: { name: string; roas: number } | null;
  bottomChannel: { name: string; roas: number } | null;
};

export function ROISummaryCard({
  totalRevenue,
  totalCost,
  totalRoas,
  revenueChange,
  costChange,
  roasChange,
  topChannel,
  bottomChannel,
}: ROISummaryCardProps) {
  return (
    <Card className="mb-8 animate-fade-in border-l-4 border-l-primary">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Title and main metrics */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-3">Marketing ROI Summary</h2>
            <p className="text-muted-foreground mb-5">
              Overall campaign performance for the selected period
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-primary/5 rounded-lg p-4 flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10 mt-1">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Return</div>
                  <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                  <div className={`text-sm flex items-center gap-1 ${revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {revenueChange >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(revenueChange)}% vs. prev
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/5 rounded-lg p-4 flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10 mt-1">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Investment</div>
                  <div className="text-2xl font-bold">${totalCost.toLocaleString()}</div>
                  <div className={`text-sm flex items-center gap-1 ${costChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {costChange >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(costChange)}% vs. prev
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/5 rounded-lg p-4 flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10 mt-1">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Overall ROAS</div>
                  <div className="text-2xl font-bold">{totalRoas.toFixed(2)}x</div>
                  <div className={`text-sm flex items-center gap-1 ${roasChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {roasChange >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(roasChange).toFixed(1)}% vs. prev
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Performance insights */}
          <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8">
            <h3 className="text-lg font-medium mb-4">Performance Insights</h3>
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-4 flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-2 text-green-700">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-green-800">Top Performer</div>
                  <div className="text-xl font-semibold">{topChannel?.name || 'Loading...'}</div>
                  <div className="text-sm text-green-700">{topChannel ? `${topChannel.roas.toFixed(2)}x ROAS` : ''}</div>
                  <div className="text-xs text-green-600 mt-1">Keep investing in this channel</div>
                </div>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4 flex items-start gap-3">
                <div className="rounded-full bg-red-100 p-2 text-red-700">
                  <TrendingUp className="h-5 w-5 transform rotate-180" />
                </div>
                <div>
                  <div className="text-sm font-medium text-red-800">Needs Attention</div>
                  <div className="text-xl font-semibold">{bottomChannel?.name || 'Loading...'}</div>
                  <div className="text-sm text-red-700">{bottomChannel ? `${bottomChannel.roas.toFixed(2)}x ROAS` : ''}</div>
                  <div className="text-xs text-red-600 mt-1">Consider optimizing strategy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
