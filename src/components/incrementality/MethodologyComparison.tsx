import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ABTest } from "@/hooks/useMockABTestData";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Calculator, HelpCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MethodologyComparisonProps {
  test: ABTest;
}
export function MethodologyComparison({ test }: MethodologyComparisonProps) {
  const controlVariant = test.variants.find(v => v.isControl);
  const winningVariant = test.winner ? test.variants.find(v => v.id === test.winner) : test.variants.find(v => !v.isControl);
  
  if (!controlVariant || !winningVariant) {
    return (
      <Card className="glass-card premium-shadow border-white/30 w-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Methodology Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Insufficient data for methodology comparison.</p>
        </CardContent>
      </Card>
    );
  }
  
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
  
  const chartData = methodologies.map(method => ({
    name: method.name,
    uplift: parseFloat(method.uplift.toFixed(1)),
  }));
  
  return (
    <Card className="glass-card premium-shadow border-white/30 w-full max-w-[1400px] h-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Methodology Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="h-[600px] w-full">  {/* Increased height from 500px to 600px */}
          <ChartContainer config={{ uplift: { color: "#8884d8" } }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 40, right: 40, left: 20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" fontSize={14} />
                <YAxis fontSize={14} label={{ value: 'Uplift (%)', angle: -90, position: 'insideLeft', offset: 20 }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Uplift']} />
                <Bar dataKey="uplift" fill="#8884d8" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="uplift" position="top" formatter={(value: number) => `${value}%`} fontSize={14} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[200px] text-base">Methodology</TableHead>
              <TableHead className="text-center text-base">Uplift</TableHead>
              <TableHead className="text-center text-base">Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {methodologies.map((method, index) => (
              <TableRow key={index} className={index === 2 ? "bg-muted/10" : ""}>
                <TableCell className="font-medium text-base">
                  <div className="flex items-center gap-2">
                    {method.name}
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-5 w-5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[400px] p-4 text-sm">
                          <p>{method.description}</p>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={index === 2 ? "default" : "outline"} className={index === 2 ? "bg-purple-500 text-base" : "text-base"}>
                    {method.uplift.toFixed(1)}%
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="bg-white/50 text-base">
                    {method.confidence.toFixed(1)}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
