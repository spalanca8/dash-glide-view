
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ABTest } from "@/hooks/useMockABTestData";
import { Skeleton } from "@/components/ui/skeleton";
import { Globe, ArrowUp, PieChart, Calculator } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface OverviewTabProps {
  test: ABTest;
  loading: boolean;
}

export function OverviewTab({ test, loading }: OverviewTabProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  // Find control and winning variant
  const controlVariant = test.variants.find(v => v.isControl);
  const testVariant = test.variants.find(v => !v.isControl);
  
  if (!controlVariant || !testVariant) {
    return <div>No valid test/control data available.</div>;
  }

  // Calculate uplift metrics
  const conversionRateUplift = ((testVariant.conversionRate - controlVariant.conversionRate) / controlVariant.conversionRate) * 100;
  const revenuePerVisitor = (variant: typeof controlVariant) => variant.revenue / variant.visitors;
  const controlRoas = revenuePerVisitor(controlVariant);
  const testRoas = revenuePerVisitor(testVariant);
  const roasUplift = ((testRoas - controlRoas) / controlRoas) * 100;

  // Prepare methodology comparison data
  const methodologies = test.methodologiesComparison || [
    {
      name: "Synthetic Control",
      uplift: conversionRateUplift * 0.95,
      confidence: 98.2,
      description: "Uses data from control group to create a synthetic version of what would have happened without intervention"
    },
    {
      name: "Bayesian Causal Inference",
      uplift: conversionRateUplift * 0.97,
      confidence: 97.5, 
      description: "Probabilistic approach that quantifies uncertainty in the causal effect"
    },
    {
      name: "Potential Outcomes Framework",
      uplift: conversionRateUplift,
      confidence: 99.1,
      description: "Based on the Rubin Causal Model, comparing potential outcomes under different conditions"
    }
  ];

  // Prepare chart data for methodologies comparison
  const chartData = methodologies.map(method => ({
    name: method.name,
    uplift: parseFloat(method.uplift.toFixed(1)),
  }));

  return (
    <div className="space-y-6">
      {/* Test Setup Summary */}
      <Card className="glass-card premium-shadow border-white/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Test Setup Summary
          </CardTitle>
          <CardDescription>
            Details about channels, geographies, and test allocation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">Channels</h3>
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-sm">{test.channel}</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Test Groups</h3>
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-sm">Control: {test.variants.find(v => v.isControl)?.visitors.toLocaleString()} visitors</p>
                <p className="text-sm">Test: {test.variants.find(v => !v.isControl)?.visitors.toLocaleString()} visitors</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Geographies</h3>
              <div className="bg-muted/50 p-3 rounded-md">
                {test.geoDistribution ? (
                  <ul className="text-sm space-y-1">
                    {test.geoDistribution.map((geo, index) => (
                      <li key={index}>
                        {geo.name}: {geo.isTestGroup ? "Test Group" : "Control Group"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm">Global test distribution</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uplift and ROAS Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card premium-shadow border-white/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <ArrowUp className="h-5 w-5 text-primary" />
              Uplift from Test vs Control
            </CardTitle>
            <CardDescription>
              Quantified impact between test and control groups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-center items-center py-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary">
                    {conversionRateUplift > 0 ? "+" : ""}{conversionRateUplift.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Conversion Rate Uplift
                  </div>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead className="text-right">Control</TableHead>
                    <TableHead className="text-right">Test</TableHead>
                    <TableHead className="text-right">Difference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Conversion Rate</TableCell>
                    <TableCell className="text-right">{controlVariant.conversionRate.toFixed(2)}%</TableCell>
                    <TableCell className="text-right">{testVariant.conversionRate.toFixed(2)}%</TableCell>
                    <TableCell className="text-right font-medium text-primary">
                      {conversionRateUplift > 0 ? "+" : ""}{conversionRateUplift.toFixed(1)}%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Total Conversions</TableCell>
                    <TableCell className="text-right">{controlVariant.conversions.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{testVariant.conversions.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-medium text-primary">
                      {testVariant.conversions - controlVariant.conversions > 0 ? "+" : ""}
                      {(testVariant.conversions - controlVariant.conversions).toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card premium-shadow border-white/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              ROAS Comparison
            </CardTitle>
            <CardDescription>
              Return on Ad Spend comparison between test and control
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-center items-center py-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary">
                    {roasUplift > 0 ? "+" : ""}{roasUplift.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    ROAS Uplift
                  </div>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Group</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Visitors</TableHead>
                    <TableHead className="text-right">ROAS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Control</TableCell>
                    <TableCell className="text-right">${controlVariant.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{controlVariant.visitors.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${controlRoas.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Test</TableCell>
                    <TableCell className="text-right">${testVariant.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{testVariant.visitors.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${testRoas.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Methodology Comparison */}
      <Card className="glass-card premium-shadow border-white/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Methodology Comparison
          </CardTitle>
          <CardDescription>
            Comparison of uplift results across different analytical methodologies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
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
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Uplift']}
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
                <TableRow key={index} className={index === 2 ? "bg-muted/10" : ""}>
                  <TableCell className="font-medium">
                    {method.name}
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
    </div>
  );
}
