
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";
import { WaterfallChart } from "@/components/dashboard/WaterfallChart";

type IncrementalRevenueByFactorChartProps = {
  loading?: boolean;
};

export function IncrementalRevenueByFactorChart({ 
  loading = false 
}: IncrementalRevenueByFactorChartProps) {
  // Mock data for the Incremental Revenue by Factor chart
  const waterfallData = [
    { 
      name: 'Base Campaign Performance', 
      value: 650000, 
      fill: '#1e293b',
      isTotal: false,
    },
    { 
      name: 'Economic Growth', 
      value: 85000, 
      fill: '#3b82f6',
      isTotal: false,
    },
    { 
      name: 'Seasonal Effects', 
      value: 120000, 
      fill: '#10b981',
      isTotal: false,
    },
    { 
      name: 'Competitor Activity', 
      value: -45000, 
      fill: '#ef4444',
      isTotal: false,
    },
    { 
      name: 'Platform Algorithm Changes', 
      value: -35000, 
      fill: '#f59e0b',
      isTotal: false,
    },
    { 
      name: 'Privacy Regulations', 
      value: -25000, 
      fill: '#8b5cf6',
      isTotal: false,
    },
    { 
      name: 'Creative Improvements', 
      value: 95000, 
      fill: '#ec4899',
      isTotal: false,
    },
    { 
      name: 'Audience Targeting Enhancements', 
      value: 65000, 
      fill: '#06b6d4',
      isTotal: false,
    },
    { 
      name: 'Channel Optimization', 
      value: 90000, 
      fill: '#22c55e',
      isTotal: false,
    },
    { 
      name: 'Total Revenue', 
      value: 1000000, 
      fill: '#4f46e5', 
      isTotal: true,
    },
  ];

  const factorsContextualInfo = {
    "Economic Growth": "Overall market expansion due to improving economic conditions increased consumer spending propensity by approximately 8.5%.",
    "Seasonal Effects": "Holiday and promotional periods generated a 12% lift compared to typical baseline performance.",
    "Competitor Activity": "Major competitor campaigns and pricing strategies created headwinds of approximately 4.5% in revenue potential.",
    "Platform Algorithm Changes": "Updates to search and social platform algorithms reduced organic visibility by approximately 3.5%.",
    "Privacy Regulations": "GDPR, CCPA and iOS updates reduced targeting capabilities and measurement accuracy by approximately 2.5%.",
    "Creative Improvements": "New creative approaches and A/B testing improved conversion rates by approximately 9.5%.",
    "Audience Targeting Enhancements": "Refined audience segmentation and lookalike modeling improved campaign efficiency by 6.5%.",
    "Channel Optimization": "Reallocation of budget to higher-performing channels improved overall return by 9%."
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col space-y-1.5">
          <CardTitle className="text-2xl">Incremental Revenue by Factor</CardTitle>
          <CardDescription className="text-lg">
            Analysis of how different factors contribute to or detract from revenue performance
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="h-[500px] -mt-6">
          <WaterfallChart 
            data={waterfallData} 
            loading={loading} 
            height={500}
          />
        </div>
        <div className="mt-6 bg-muted/30 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <InfoIcon className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="text-lg font-medium mb-3">Factor Impact Explanations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {Object.entries(factorsContextualInfo).map(([factor, description]) => (
                  <div key={factor} className="flex items-start gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5"></span>
                    <div>
                      <h4 className="font-medium text-sm">{factor}</h4>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
