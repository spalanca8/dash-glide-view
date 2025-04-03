
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ArrowUp, ArrowDown } from "lucide-react";
import { Sparkline } from "@/components/campaign-analytics/Sparkline";

export const CostEfficiencyTrends = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Cost Efficiency Trends
            </CardTitle>
            <CardDescription>
              CPC/CPM/CPV sparklines with 30/60/90-day comparisons
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Cost per Click (CPC)</h3>
              <div className="flex items-center text-green-600">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span className="text-sm">12.4%</span>
              </div>
            </div>
            <div className="text-2xl font-bold mb-2">$1.24</div>
            <Sparkline 
              data={[2.1, 1.9, 1.8, 1.7, 1.5, 1.6, 1.4, 1.3, 1.2, 1.24]} 
              color="#22c55e" 
              decreaseIsGood={true}
            />
            <div className="mt-2 text-xs text-muted-foreground">
              vs $1.42 (30 days ago)
            </div>
          </div>
          
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Cost per Mille (CPM)</h3>
              <div className="flex items-center text-green-600">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span className="text-sm">8.2%</span>
              </div>
            </div>
            <div className="text-2xl font-bold mb-2">$8.75</div>
            <Sparkline 
              data={[9.5, 9.8, 9.2, 8.9, 9.1, 8.8, 8.6, 8.7, 8.8, 8.75]} 
              color="#22c55e" 
              decreaseIsGood={true}
            />
            <div className="mt-2 text-xs text-muted-foreground">
              vs $9.53 (30 days ago)
            </div>
          </div>
          
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Cost per View (CPV)</h3>
              <div className="flex items-center text-red-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">3.8%</span>
              </div>
            </div>
            <div className="text-2xl font-bold mb-2">$0.043</div>
            <Sparkline 
              data={[0.039, 0.038, 0.040, 0.041, 0.042, 0.039, 0.041, 0.042, 0.044, 0.043]} 
              color="#ef4444" 
              decreaseIsGood={true}
            />
            <div className="mt-2 text-xs text-muted-foreground">
              vs $0.041 (30 days ago)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
