
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { ChartPie, Target, TrendingUp, DollarSign, PercentIcon } from "lucide-react";

type CustomScenarioProps = {
  recommendations: any[];
  currentBudget: number;
  onApplyCustomScenario: (budgets: Record<string, number>, scenarioName: string) => void;
};

export function CustomScenarioPanel({ 
  recommendations, 
  currentBudget,
  onApplyCustomScenario 
}: CustomScenarioProps) {
  const { toast } = useToast();
  const [optimizationTarget, setOptimizationTarget] = useState<"roi" | "mroi" | "savings" | "budget">("roi");
  const [targetROI, setTargetROI] = useState<number>(2.5);
  const [targetMROI, setTargetMROI] = useState<number>(1.2);
  const [savingsPercent, setSavingsPercent] = useState<number>(10);
  const [newBudget, setNewBudget] = useState<number>(currentBudget * 1.1); // 10% higher by default

  // Generate optimized budget allocations based on selected target
  const generateOptimizedBudgets = () => {
    // This is a simplified simulation algorithm
    // In a real implementation, this would use more sophisticated optimization logic
    
    const budgets: Record<string, number> = {};
    
    if (optimizationTarget === "roi") {
      // Sort channels by their ROI potential and allocate more to high ROI channels
      const sortedByImpact = [...recommendations].sort(
        (a, b) => (b.impact / b.currentBudget) - (a.impact / a.currentBudget)
      );
      
      // Allocate budget with bias towards high ROI channels
      sortedByImpact.forEach(channel => {
        const impactRatio = channel.impact / channel.currentBudget;
        const multiplier = impactRatio > 0.15 ? 1.2 : impactRatio > 0.1 ? 1.0 : 0.8;
        budgets[channel.name] = Math.round(channel.currentBudget * multiplier);
      });
    } 
    else if (optimizationTarget === "mroi") {
      // Optimize for marginal ROI - focus on channels with best incremental returns
      recommendations.forEach(channel => {
        const baseMultiplier = Math.min(1.5, Math.max(0.5, targetMROI));
        const effectiveMultiplier = channel.recommendedBudget > channel.currentBudget ? baseMultiplier : 1/baseMultiplier;
        budgets[channel.name] = Math.round(channel.currentBudget * effectiveMultiplier);
      });
    }
    else if (optimizationTarget === "savings") {
      // Cut budget across channels based on their performance
      recommendations.forEach(channel => {
        const impactRatio = channel.impact / channel.currentBudget;
        // Cut more from low-performing channels
        const savingsMultiplier = impactRatio > 0.15 ? (savingsPercent * 0.5) / 100 : (savingsPercent * 1.5) / 100;
        budgets[channel.name] = Math.round(channel.currentBudget * (1 - savingsMultiplier));
      });
    }
    else if (optimizationTarget === "budget") {
      // Redistribute the new budget based on channel performance
      const totalCurrentBudget = recommendations.reduce((sum, ch) => sum + ch.currentBudget, 0);
      const budgetRatio = newBudget / totalCurrentBudget;
      
      recommendations.forEach(channel => {
        const impactRatio = channel.impact / channel.currentBudget;
        // Allocate more to high-performing channels
        const adjustedRatio = impactRatio > 0.15 ? budgetRatio * 1.2 : impactRatio > 0.1 ? budgetRatio : budgetRatio * 0.8;
        budgets[channel.name] = Math.round(channel.currentBudget * adjustedRatio);
      });
    }

    // Apply the custom budgets scenario
    const scenarioName = getScenarioName();
    onApplyCustomScenario(budgets, scenarioName);
    
    toast({
      title: "Custom scenario created",
      description: `${scenarioName} scenario has been applied.`,
    });
  };

  const getScenarioName = (): string => {
    switch(optimizationTarget) {
      case "roi": return `Target ROI ${targetROI.toFixed(1)}x`;
      case "mroi": return `Target MROI ${targetMROI.toFixed(1)}x`;
      case "savings": return `${savingsPercent}% Cost Savings`;
      case "budget": return `Custom Budget $${newBudget.toLocaleString()}`;
      default: return "Custom Scenario";
    }
  };

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  
  const formatSliderValue = (value: number): string => {
    switch(optimizationTarget) {
      case "roi": return `${value.toFixed(1)}x`;
      case "mroi": return `${value.toFixed(1)}x`;
      case "savings": return `${value}%`;
      case "budget": return formatCurrency(value);
      default: return String(value);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ChartPie className="h-5 w-5 text-primary" />
          <CardTitle>Custom Budget Optimizer</CardTitle>
        </div>
        <CardDescription>
          Optimize your budget allocation based on specific targets and objectives
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={optimizationTarget} onValueChange={(v) => setOptimizationTarget(v as any)} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="roi" className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Target ROI</span>
              <span className="sm:hidden">ROI</span>
            </TabsTrigger>
            <TabsTrigger value="mroi" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Target MROI</span>
              <span className="sm:hidden">MROI</span>
            </TabsTrigger>
            <TabsTrigger value="savings" className="flex items-center gap-1">
              <PercentIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Cost Savings</span>
              <span className="sm:hidden">Savings</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Custom Budget</span>
              <span className="sm:hidden">Budget</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="space-y-6">
            <TabsContent value="roi" className="space-y-4">
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Target Return on Investment (ROI)</span>
                  <span className="font-medium">{targetROI.toFixed(1)}x</span>
                </div>
                <Slider 
                  value={[targetROI]} 
                  min={1.0} 
                  max={4.0} 
                  step={0.1} 
                  onValueChange={(values) => setTargetROI(values[0])} 
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>1.0x</span>
                  <span>4.0x</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Optimize budget to achieve a target ROI of {targetROI.toFixed(1)}x across all channels.
              </p>
            </TabsContent>
            
            <TabsContent value="mroi" className="space-y-4">
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Target Marginal ROI (MROI)</span>
                  <span className="font-medium">{targetMROI.toFixed(1)}x</span>
                </div>
                <Slider 
                  value={[targetMROI]} 
                  min={0.5} 
                  max={2.0} 
                  step={0.1} 
                  onValueChange={(values) => setTargetMROI(values[0])} 
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>0.5x</span>
                  <span>2.0x</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Optimize for marginal ROI to ensure each incremental dollar spent delivers {targetMROI.toFixed(1)}x return.
              </p>
            </TabsContent>
            
            <TabsContent value="savings" className="space-y-4">
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Cost Savings Target</span>
                  <span className="font-medium">{savingsPercent}%</span>
                </div>
                <Slider 
                  value={[savingsPercent]} 
                  min={5} 
                  max={30} 
                  step={1} 
                  onValueChange={(values) => setSavingsPercent(values[0])} 
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>5%</span>
                  <span>30%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Reduce total budget by {savingsPercent}% while minimizing impact on performance.
              </p>
            </TabsContent>
            
            <TabsContent value="budget" className="space-y-4">
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>New Total Budget</span>
                  <span className="font-medium">${newBudget.toLocaleString()}</span>
                </div>
                <Slider 
                  value={[newBudget]} 
                  min={currentBudget * 0.7} 
                  max={currentBudget * 1.5} 
                  step={1000} 
                  onValueChange={(values) => setNewBudget(values[0])} 
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>${(currentBudget * 0.7).toLocaleString()}</span>
                  <span>${(currentBudget * 1.5).toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm mb-2">Or enter a specific budget:</p>
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(Number(e.target.value))}
                  className="max-w-xs"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Reallocate a total budget of ${newBudget.toLocaleString()} across channels for optimal performance.
              </p>
            </TabsContent>
          </div>
          
          <div className="mt-6">
            <Button 
              onClick={generateOptimizedBudgets} 
              className="w-full md:w-auto"
            >
              Apply {getScenarioName()} Scenario
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
