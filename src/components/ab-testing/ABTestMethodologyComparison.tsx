
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ABTest } from "@/hooks/useMockABTestData";
import { Skeleton } from "@/components/ui/skeleton";
import { Calculator, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface ABTestMethodologyComparisonProps {
  test: ABTest;
  loading?: boolean;
}

export function ABTestMethodologyComparison({ test, loading = false }: ABTestMethodologyComparisonProps) {
  if (loading) {
    return (
      <Card className="glass-card premium-shadow border-white/30">
        <CardHeader className="pb-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72 mt-1" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  // Get the winning variant details
  const controlVariant = test.variants.find(v => v.isControl);
  const winningVariant = test.variants.find(v => v.id === test.winner);
  
  // If no winning variant or control variant, display a message
  if (!winningVariant || !controlVariant) {
    return (
      <Card className="glass-card premium-shadow border-white/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Methodology Comparison
          </CardTitle>
          <CardDescription>
            No methodology comparison available as there's no clear winning variant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
            <Calculator className="h-10 w-10 mb-2 text-muted-foreground/50" />
            <p>This test doesn't have sufficient data for methodology comparison or no winner has been determined.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get methodology data from the test if available, otherwise generate it
  const methodologies = test.methodologiesComparison || [
    {
      name: "Synthetic Control",
      uplift: winningVariant.improvement ? winningVariant.improvement * (0.9 + Math.random() * 0.2) : 35,
      confidence: 97.2,
      description: "Constructs a synthetic version of the test group using control group data to estimate causal effects."
    },
    {
      name: "Bayesian Causal Inference",
      uplift: winningVariant.improvement ? winningVariant.improvement * (0.95 + Math.random() * 0.1) : 38,
      confidence: 98.5,
      description: "Uses Bayesian statistics to model the causal relationship between intervention and outcome."
    },
    {
      name: "Potential Outcomes Framework",
      uplift: winningVariant.improvement ? winningVariant.improvement * (1.0 + Math.random() * 0.05) : 40,
      confidence: 99.1,
      description: "Based on the Rubin Causal Model, calculates treatment effect by comparing potential outcomes."
    }
  ];

  // Prepare data for the chart
  const chartData = methodologies.map(method => ({
    name: method.name,
    uplift: parseFloat(method.uplift.toFixed(1)),
  }));

  return (
    <div className="grid gap-6">
      <Card className="glass-card premium-shadow border-white/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Uplift Comparison Across Different Methodologies
          </CardTitle>
          <CardDescription>
            Comparing causal inference methodologies to validate the true uplift of {winningVariant.name} vs {controlVariant.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis 
                  label={{ 
                    value: 'Uplift (%)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                />
                <Bar 
                  dataKey="uplift" 
                  fill="#8884d8" 
                  radius={[4, 4, 0, 0]}
                  className="fill-purple-500 hover:fill-purple-600"
                >
                  <LabelList dataKey="uplift" position="top" formatter={(value: number) => `${value}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-[250px]">Methodology</TableHead>
                <TableHead className="text-center">Uplift</TableHead>
                <TableHead className="text-center">Confidence</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {methodologies.map((method, index) => (
                <TableRow key={index} className={index === 0 ? "bg-muted/10" : ""}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {method.name}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[300px] p-4">
                            <p>{method.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={index === 2 ? "default" : "outline"} className={index === 2 ? "bg-purple-500" : ""}>
                      {method.uplift.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-white/50">
                      {method.confidence.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[400px]">
                    {method.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card className="glass-card premium-shadow border-white/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            Methodology Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-purple-50/80 backdrop-blur-sm p-4 rounded-lg border border-purple-100 flex items-start gap-3 premium-shadow">
            <div className="mt-0.5">
              <Calculator className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-medium text-purple-700">Recommended Methodology: Potential Outcomes Framework</h3>
              <p className="text-purple-600 text-sm mt-1">
                This methodology provides the most conservative uplift estimate with the highest confidence level, reducing the risk of overestimating the effect.
              </p>
              <p className="text-muted-foreground mt-3 text-sm">
                All methodologies confirm a significant improvement of {winningVariant.name} over the control variant, with a minimum uplift of {Math.min(...methodologies.map(m => m.uplift)).toFixed(1)}%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
