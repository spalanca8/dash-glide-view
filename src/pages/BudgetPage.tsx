import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChannelBreakdownChart } from "@/components/dashboard/ChannelBreakdownChart";
import { BudgetAllocationChart } from "@/components/dashboard/BudgetAllocationChart";
import { BudgetWaterfallChart } from "@/components/dashboard/BudgetWaterfallChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DollarSign, 
  PieChart, 
  Download, 
  Check, 
  Minus,
  LineChart,
  TrendingUp,
  TrendingDown,
  BarChart3,
  InfoIcon
} from "lucide-react";
import {
  generateBudgetAllocation,
  generateBudgetRecommendations,
  channelColors,
} from "@/data/mockData";
import { cn } from "@/lib/utils";
import { ScenarioSelector } from "@/components/budget/ScenarioSelector";
import { ScenarioDetails } from "@/components/budget/ScenarioDetails";
import { ChannelSaturationCurvePanel } from "@/components/budget/ChannelSaturationCurvePanel";
import { CustomScenarioPanel } from "@/components/budget/CustomScenarioPanel";
import { toast } from "sonner";

type ScenarioMetricsType = {
  totalBudget: number;
  projectedROI: number;
  projectedRevenue: number;
};

const BudgetPage = () => {
  const [loading, setLoading] = useState(true);
  const [budgetData, setBudgetData] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState("current");
  const [activeScenario, setActiveScenario] = useState("bau");
  const [customScenarios, setCustomScenarios] = useState<Record<string, Record<string, number>>>({});
  const [customScenarioNames, setCustomScenarioNames] = useState<Record<string, string>>({});
  const [scenarioMetrics, setScenarioMetrics] = useState<Record<string, ScenarioMetricsType>>({
    bau: { totalBudget: 0, projectedROI: 0, projectedRevenue: 0 },
    "cost-savings": { totalBudget: 0, projectedROI: 0, projectedRevenue: 0 },
    "revenue-uplift": { totalBudget: 0, projectedROI: 0, projectedRevenue: 0 }
  });

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const budget = generateBudgetAllocation();
      const recs = generateBudgetRecommendations();
      
      setBudgetData(budget);
      setRecommendations(recs);

      // Initialize custom budgets with current values
      const bauBudgets: Record<string, number> = {};
      const csBudgets: Record<string, number> = {};
      const ruBudgets: Record<string, number> = {};

      recs.forEach(channel => {
        bauBudgets[channel.name] = channel.currentBudget;
        
        // Cost savings scenario - reduce budgets for low-impact channels
        const impactRatio = channel.impact / channel.currentBudget;
        const savingFactor = impactRatio < 0.1 ? 0.7 : impactRatio < 0.15 ? 0.85 : 0.95;
        csBudgets[channel.name] = Math.round(channel.currentBudget * savingFactor);
        
        // Revenue uplift scenario - use recommended budgets
        ruBudgets[channel.name] = channel.recommendedBudget;
      });

      setCustomScenarios({
        bau: bauBudgets,
        "cost-savings": csBudgets,
        "revenue-uplift": ruBudgets
      });

      // Calculate scenario metrics
      calculateScenarioMetrics(bauBudgets, csBudgets, ruBudgets, recs);
      
      setLoading(false);
    };

    loadData();
  }, []);

  // Calculate metrics for each scenario
  const calculateScenarioMetrics = (
    bauBudgets: Record<string, number>,
    csBudgets: Record<string, number>,
    ruBudgets: Record<string, number>,
    channels: any[]
  ) => {
    // BAU metrics
    const bauTotalBudget = Object.values(bauBudgets).reduce((sum, budget) => sum + budget, 0);
    const bauRevenue = channels.reduce((sum, channel) => {
      const budget = bauBudgets[channel.name] || channel.currentBudget;
      return sum + (budget * channel.impact / 100);
    }, 0);
    const bauROI = (bauRevenue / bauTotalBudget) * 1.2; // Increased ROI multiplier

    // Cost Savings metrics
    const csTotalBudget = Object.values(csBudgets).reduce((sum, budget) => sum + budget, 0);
    const csRevenue = channels.reduce((sum, channel) => {
      const budget = csBudgets[channel.name] || channel.currentBudget * 0.8;
      // Diminishing returns formula with higher efficiency
      const impactFactor = budget / channel.currentBudget < 0.8 ? 0.95 : 1.0;
      return sum + (budget * channel.impact / 100 * impactFactor);
    }, 0);
    const csROI = (csRevenue / csTotalBudget) * 1.5; // Increased ROI for cost savings

    // Revenue Uplift metrics
    const ruTotalBudget = Object.values(ruBudgets).reduce((sum, budget) => sum + budget, 0);
    const ruRevenue = channels.reduce((sum, channel) => {
      const budget = ruBudgets[channel.name] || channel.recommendedBudget;
      // Increasing impact with optimization - higher factor
      const impactFactor = budget > channel.currentBudget ? 1.4 : 1.1;
      return sum + (budget * channel.impact / 100 * impactFactor);
    }, 0);
    const ruROI = (ruRevenue / ruTotalBudget) * 1.7; // Increased ROI for revenue uplift

    setScenarioMetrics({
      bau: { 
        totalBudget: bauTotalBudget, 
        projectedROI: bauROI, 
        projectedRevenue: bauRevenue 
      },
      "cost-savings": { 
        totalBudget: csTotalBudget, 
        projectedROI: csROI, 
        projectedRevenue: csRevenue 
      },
      "revenue-uplift": { 
        totalBudget: ruTotalBudget, 
        projectedROI: ruROI, 
        projectedRevenue: ruRevenue 
      }
    });
  };

  // Apply custom scenario
  const applyCustomScenario = (budgets: Record<string, number>, scenarioName: string) => {
    const scenarioId = `custom-${Date.now()}`;
    
    // Save custom budgets
    setCustomScenarios(prev => ({
      ...prev,
      [scenarioId]: budgets
    }));

    // Save scenario name
    setCustomScenarioNames(prev => ({
      ...prev,
      [scenarioId]: scenarioName
    }));

    // Calculate metrics for the custom scenario
    const totalBudget = Object.values(budgets).reduce((sum, budget) => sum + budget, 0);
    const revenue = recommendations.reduce((sum, channel) => {
      const budget = budgets[channel.name] || channel.currentBudget;
      // Apply a different impact factor based on budget changes
      const budgetRatio = budget / channel.currentBudget;
      let impactFactor = 1;
      
      if (budgetRatio > 1.2) impactFactor = 1.3; // Higher multiplier for large increases
      else if (budgetRatio > 1) impactFactor = 1.25;
      else if (budgetRatio < 0.8) impactFactor = 0.9; 
      else if (budgetRatio < 1) impactFactor = 0.95;

      return sum + (budget * channel.impact / 100 * impactFactor);
    }, 0);
    
    const roi = (revenue / totalBudget) * 1.5; // Higher ROI multiplier
    
    // Update scenario metrics
    setScenarioMetrics(prev => ({
      ...prev,
      [scenarioId]: {
        totalBudget,
        projectedROI: roi,
        projectedRevenue: revenue
      }
    }));
    
    // Set active scenario to the new custom scenario
    setActiveScenario(scenarioId);
    
    toast.success(`Created new scenario: ${scenarioName}`);
  };

  // Apply recommended changes
  const applyRecommendations = () => {
    toast.success("Budget recommendations applied");
  };

  // Calculate totals
  const totalCurrentBudget = !loading
    ? recommendations.reduce((sum, channel) => sum + channel.currentBudget, 0)
    : 0;
    
  const activeBudgets = customScenarios[activeScenario] || {};
  const activeScenarioTotalBudget = !loading
    ? (activeScenario !== "custom-optimizer" 
      ? Object.values(activeBudgets).reduce((sum, budget) => sum + (budget as number), 0) || 0
      : totalCurrentBudget)
    : 0;
    
  // Prepare chart data for the active scenario
  const scenarioBudgetChart = !loading
    ? recommendations.map(item => {
        const customScenario = activeScenario.startsWith('custom-') ? customScenarios[activeScenario] || {} : {};
        return {
          name: item.name,
          value: activeScenario.startsWith('custom-') 
            ? customScenario[item.name] || item.currentBudget
            : activeBudgets[item.name] || item.currentBudget,
          color: item.color
        };
      })
    : [];

  // Comparison data between BAU and active scenario
  const comparisonData = (activeScenario !== "bau" && activeScenario !== "custom-optimizer") ? {
    budgetChange: scenarioMetrics[activeScenario]?.totalBudget - scenarioMetrics.bau.totalBudget,
    roiChange: scenarioMetrics[activeScenario]?.projectedROI - scenarioMetrics.bau.projectedROI,
    revenueChange: scenarioMetrics[activeScenario]?.projectedRevenue - scenarioMetrics.bau.projectedRevenue
  } : undefined;

  // Impact data for visualization
  const impactData = !loading ? recommendations.map(channel => {
    const currentBudget = channel.currentBudget;
    const scenarioBudget = activeBudgets[channel.name] || currentBudget;
    const budgetChange = scenarioBudget - currentBudget;
    
    // Calculate impact with diminishing returns for budget increases
    let impactChange = 0;
    if (budgetChange > 0) {
      // Diminishing returns on increases
      impactChange = (budgetChange / currentBudget) * channel.impact * 0.9;
    } else if (budgetChange < 0) {
      // Budget decreases have less than proportional impact reduction
      impactChange = (budgetChange / currentBudget) * channel.impact * 0.8;
    }
    
    return {
      name: channel.name,
      budgetChange: budgetChange,
      impactChange: impactChange,
      color: channel.color
    };
  }) : [];

  // Get the name of the active scenario for display
  const getActiveScenarioName = () => {
    if (activeScenario === "bau") return "Business As Usual";
    if (activeScenario === "cost-savings") return "Cost Savings";
    if (activeScenario === "revenue-uplift") return "Revenue Uplift";
    if (activeScenario === "custom-optimizer") return "Custom Optimizer";
    // For custom scenarios, return the custom name
    return customScenarioNames[activeScenario] || "Custom Scenario";
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Budget Optimizer"
        description="Data-driven budget allocation recommendations to maximize ROI"
      >
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="gap-1" onClick={applyRecommendations}>
            <Check className="h-4 w-4" />
            Apply Recommendations
          </Button>
        </div>
      </PageHeader>

      {/* Scenario Selector */}
      <div className="mb-8">
        <ScenarioSelector 
          activeScenario={activeScenario} 
          onScenarioChange={setActiveScenario} 
        />
      </div>

      {/* Custom Scenario Creator - Only show in custom-optimizer scenario */}
      {activeScenario === "custom-optimizer" && (
        <div className="mb-8">
          <CustomScenarioPanel 
            recommendations={recommendations || []} 
            currentBudget={totalCurrentBudget}
            onApplyCustomScenario={applyCustomScenario}
          />
        </div>
      )}

      {/* Only show Scenario Details if not on the custom-optimizer tab */}
      {activeScenario !== "custom-optimizer" && (
        <div className="mb-8">
          <ScenarioDetails 
            scenario={getActiveScenarioName()}
            totalBudget={scenarioMetrics[activeScenario]?.totalBudget || 0}
            projectedROI={scenarioMetrics[activeScenario]?.projectedROI || 0}
            projectedRevenue={scenarioMetrics[activeScenario]?.projectedRevenue || 0}
            comparisonData={comparisonData}
          />
        </div>
      )}
      {/* Budget allocation charts - Only show if not on custom-optimizer */}
      {activeScenario !== "custom-optimizer" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="dashboard-card p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <PieChart className="h-7 w-7 text-primary" />
                <div>
                  <h3 className="text-xl font-medium">Current Budget Allocation</h3>
                  <p className="text-base text-muted-foreground">
                    ${totalCurrentBudget.toLocaleString()} total budget
                  </p>
                </div>
              </div>
            </div>
            
            <div className="w-full h-[500px]">
              <BudgetAllocationChart 
                data={budgetData} 
                loading={loading} 
                title="Current allocation by channel"
              />
            </div>
          </div>
          {activeScenario === "bau" ? (
            <div className="dashboard-card p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <PieChart className="h-7 w-7 text-primary" />
                  <div>
                    <h3 className="text-xl font-medium">Budget Percentages</h3>
                    <p className="text-base text-muted-foreground">
                      ${activeScenarioTotalBudget.toLocaleString()} total budget
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {scenarioBudgetChart.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: channelColors[item.name] }}
                      />
                      <span className="text-base">{item.name}</span>
                    </div>
                    <span className="text-base font-medium">
                      {((item.value / activeScenarioTotalBudget) * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="dashboard-card p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <PieChart className="h-7 w-7 text-primary" />
                  <div>
                    <h3 className="text-xl font-medium">{getActiveScenarioName()} Allocation</h3>
                    <p className="text-base text-muted-foreground">
                      ${activeScenarioTotalBudget.toLocaleString()} total budget
                    </p>
                  </div>
                </div>
              </div>
              
              <BudgetAllocationChart 
                data={scenarioBudgetChart} 
                loading={loading} 
                title={`${getActiveScenarioName()} allocation by channel`}
              />
            </div>
          )}
        </div>
      )}
      {/* Impact analysis section - Only show if not on custom-optimizer */}
      {activeScenario !== "custom-optimizer" && (
        <div className="mb-8">
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <CardTitle>
                  {activeScenario === "bau" ? "Budget Allocation" : "Budget Reallocation"}
                </CardTitle>
              </div>
              <CardDescription>
                {activeScenario === "bau" 
                  ? "Current budget distribution and its impact across channels"
                  : "Projected performance impact by channel"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                {loading ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="h-32 w-32 bg-muted rounded animate-pulse"></div>
                  </div>
                ) : activeScenario === "bau" ? (
                  <BudgetWaterfallChart
                    data={impactData.map((item, index) => ({
                      name: item.name,
                      value: item.impactChange,
                      fill: index % 2 === 0 ? '#1e293b' : '#ec4899',
                      displayValue: item.impactChange,
                      ratio: `${Math.abs(item.impactChange).toFixed(1)}%`,
                      isTotal: index === impactData.length - 1
                    }))}
                    loading={loading}
                    height={400}
                  />
                ) : (
                  <ChartContainer
                    config={{
                      positive: { color: "#4ade80" }, // Green color for positive values
                      negative: { color: "#f87171" }  // Red color for negative values
                    }}
                    className="w-full h-full"
                  >
                    <ChannelBreakdownChart
                      data={impactData.map(item => ({
                        ...item,
                        impactChange: Math.random() * 40 - 20 // Random value between -20 and +20
                      })).sort((a, b) => Math.abs(b.impactChange) - Math.abs(a.impactChange))}
                      bars={[
                        {
                          dataKey: "impactChange",
                          label: "Impact %",
                          color: "#4ade80" // Set default color, will be overridden by ChartContainer config
                        }
                      ]}
                      xAxisKey="name"
                      height={400}
                    />
                  </ChartContainer>
                )}
              </div>
              {activeScenario === "bau" && (
                <div className="mt-6 bg-muted/30 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <InfoIcon className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="text-lg font-medium mb-2">About This Chart</h3>
                      <p className="text-base text-muted-foreground">
                        This waterfall chart shows the cumulative impact of maintaining the BAU (Business As Usual) budget allocation across channels. 
                        Each segment represents the projected impact of a channel's current budget allocation, with the total showing the net effect 
                        across all channels.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Channel Saturation Curves */}
      <ChannelSaturationCurvePanel
        activeScenario={activeScenario}
        customBudgets={customScenarios}
      />
      
      {/* Scenario comparison table */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-primary" />
            <CardTitle>Scenario Comparison</CardTitle>
          </div>
          <CardDescription>
            Compare budget allocations and projected outcomes across scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Channel</TableHead>
                  <TableHead>BAU Budget</TableHead>
                  <TableHead>
                    {activeScenario.startsWith("custom-") 
                      ? `${customScenarioNames[activeScenario] || "Custom"} Budget`
                      : activeScenario === "cost-savings" 
                      ? "Cost Savings Budget" 
                      : activeScenario === "revenue-uplift"
                      ? "Revenue Uplift Budget"
                      : "Custom Budget"}
                  </TableHead>
                  <TableHead>Recommended Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 3 }).map((_, j) => (
                        <TableCell key={j}>
                          <div className="h-4 bg-muted rounded animate-pulse"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  recommendations.map((channel, i) => {
                    const scenarioBudget = customScenarios[activeScenario]?.[channel.name] || channel.currentBudget;
                    const budgetChange = scenarioBudget - channel.currentBudget;
                    
                    let recommendedAction;
                    if (activeScenario.startsWith("custom-")) {
                      recommendedAction = budgetChange < 0 ? "Reduce Budget" : budgetChange > 0 ? "Increase Budget" : "Maintain Budget";
                    } else if (activeScenario === "cost-savings" && budgetChange < -1000) {
                      recommendedAction = "Reduce Budget";
                    } else if (activeScenario === "revenue-uplift" && budgetChange > 1000) {
                      recommendedAction = "Increase Budget";
                    } else {
                      recommendedAction = "Maintain Budget";
                    }
                    
                    return (
                      <TableRow key={i}>
                        <TableCell className="font-medium flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: channel.color }}
                          ></div>
                          {channel.name}
                        </TableCell>
                        <TableCell>${channel.currentBudget.toLocaleString()}</TableCell>
                        <TableCell>
                          <div
                            className={cn(
                              "flex items-center",
                              budgetChange < 0 ? "text-red-600" : budgetChange > 0 ? "text-green-600" : "text-muted-foreground"
                            )}
                          >
                            ${scenarioBudget.toLocaleString()}
                            {budgetChange !== 0 && (
                              <span className="ml-2 text-xs">
                                ({budgetChange > 0 ? "+" : ""}{((budgetChange / channel.currentBudget) * 100).toFixed(1)}%)
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={cn(
                              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                              recommendedAction === "Reduce Budget" 
                                ? "bg-red-100 text-red-800" 
                                : recommendedAction === "Increase Budget" 
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            )}
                          >
                            {recommendedAction === "Reduce Budget" && <TrendingDown className="h-3 w-3 mr-1" />}
                            {recommendedAction === "Increase Budget" && <TrendingUp className="h-3 w-3 mr-1" />}
                            {recommendedAction === "Maintain Budget" && <Minus className="h-3 w-3 mr-1" />}
                            {recommendedAction}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* Insights */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>Optimization Insights</CardTitle>
          </div>
          <CardDescription>
            Data-driven insights and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-sm">
            <div>
              <h4 className="font-medium mb-2 text-base">Key Findings</h4>
              <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                <li>
                  {activeScenario === "cost-savings" 
                    ? `Cost Savings scenario reduces budget by ${Math.abs(comparisonData?.budgetChange || 0).toLocaleString()} with minimal impact on performance.`
                    : activeScenario === "revenue-uplift"
                    ? `Revenue Uplift scenario can increase revenue by ${Math.round((comparisonData?.revenueChange || 0) / (scenarioMetrics.bau.projectedRevenue || 1) * 100)}% without increasing total budget.`
                    : activeScenario.startsWith("custom-")
                    ? `The ${customScenarioNames[activeScenario] || "Custom"} scenario ${comparisonData?.budgetChange < 0 ? "reduces" : "increases"} budget by ${Math.abs(comparisonData?.budgetChange || 0).toLocaleString()} with a projected ${comparisonData?.revenueChange > 0 ? "increase" : "decrease"} in revenue.`
                    : "Current allocation is relatively efficient, with room for optimization."}
                </li>
                <li>
                  {recommendations.sort((a, b) => b.impact / b.currentBudget - a.impact / a.currentBudget)[0]?.name} shows 
                  the highest ROI and would benefit from increased investment.
                </li>
                <li>
                  {recommendations.sort((a, b) => a.impact / a.currentBudget - b.impact / b.currentBudget)[0]?.name} shows 
                  diminishing returns and may benefit from budget reallocation.
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 text-base">Recommendations</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  {activeScenario === "cost-savings" 
                    ? "The Cost Savings scenario maintains most of the performance while reducing total budget. Consider implementing these changes for improved efficiency."
                    : activeScenario === "revenue-uplift"
                    ? "The Revenue Uplift scenario maximizes performance by reallocating budget to high-performing channels. This approach is recommended for growth objectives."
                    : activeScenario.startsWith("custom-")
                    ? `The ${customScenarioNames[activeScenario] || "Custom"} scenario provides a tailored approach based on your specific goals. Analyze the results to determine if it meets your objectives.`
                    : "Consider testing the recommended budget allocations to validate performance improvements before full implementation."}
                </p>
                <p>
                  Budget optimization should be an ongoing process, with regular updates based on new performance data and changing market conditions.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetPage;
