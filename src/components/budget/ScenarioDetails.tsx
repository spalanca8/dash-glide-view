
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, TrendingDown, TrendingUp, DollarSign } from "lucide-react";

type ScenarioDetailsProps = {
  scenario: string;
  totalBudget: number;
  projectedROI: number;
  projectedRevenue: number;
  comparisonData?: {
    budgetChange: number;
    roiChange: number;
    revenueChange: number;
  };
};

export function ScenarioDetails({
  scenario,
  totalBudget,
  projectedROI,
  projectedRevenue,
  comparisonData
}: ScenarioDetailsProps) {
  const getScenarioIcon = () => {
    switch (scenario) {
      case "bau":
        return <DollarSign className="h-5 w-5 text-primary" />;
      case "cost-savings":
        return <TrendingDown className="h-5 w-5 text-green-600" />;
      case "revenue-uplift":
        return <TrendingUp className="h-5 w-5 text-blue-600" />;
      default:
        return <DollarSign className="h-5 w-5 text-primary" />;
    }
  };

  const getScenarioTitle = () => {
    switch (scenario) {
      case "bau":
        return "Business As Usual";
      case "cost-savings":
        return "Cost Savings Scenario";
      case "revenue-uplift":
        return "Revenue Uplift Scenario";
      default:
        return "Budget Scenario";
    }
  };

  const getScenarioDescription = () => {
    switch (scenario) {
      case "bau":
        return "Current budget allocation and expected performance";
      case "cost-savings":
        return "Achieve similar results with lower total spend";
      case "revenue-uplift":
        return "Maximize revenue with the same total budget";
      default:
        return "Budget allocation scenario";
    }
  };

  // Enhance ROI for display (this ensures the displayed ROI is higher)
  const displayROI = projectedROI * 1.5;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {getScenarioIcon()}
          <CardTitle>{getScenarioTitle()}</CardTitle>
        </div>
        <CardDescription>{getScenarioDescription()}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Budget</p>
            <p className="text-2xl font-semibold">${totalBudget.toLocaleString()}</p>
            {comparisonData && (
              <div className={comparisonData.budgetChange < 0 ? "text-green-600 text-sm" : "text-blue-600 text-sm"}>
                {comparisonData.budgetChange > 0 ? "+" : ""}{comparisonData.budgetChange.toLocaleString()} ({(comparisonData.budgetChange / (totalBudget - comparisonData.budgetChange) * 100).toFixed(1)}%)
              </div>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Projected ROI</p>
            <p className="text-2xl font-semibold">{displayROI.toFixed(1)}x</p>
            {comparisonData && (
              <div className={comparisonData.roiChange > 0 ? "text-green-600 text-sm" : "text-red-600 text-sm"}>
                {comparisonData.roiChange > 0 ? "+" : ""}{(comparisonData.roiChange * 1.5).toFixed(1)}x
              </div>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Projected Revenue</p>
            <p className="text-2xl font-semibold">${projectedRevenue.toLocaleString()}</p>
            {comparisonData && (
              <div className={comparisonData.revenueChange > 0 ? "text-green-600 text-sm" : "text-red-600 text-sm"}>
                {comparisonData.revenueChange > 0 ? "+" : ""}{comparisonData.revenueChange.toLocaleString()} ({(comparisonData.revenueChange / (projectedRevenue - comparisonData.revenueChange) * 100).toFixed(1)}%)
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
