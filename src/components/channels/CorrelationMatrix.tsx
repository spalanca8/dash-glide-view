
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type CorrelationMatrixProps = {
  data: any[];
  loading: boolean;
};

export function CorrelationMatrix({ data, loading }: CorrelationMatrixProps) {
  if (loading) {
    return <Skeleton className="w-full h-[300px]" />;
  }

  // Calculate Pearson correlation coefficient between two arrays
  const calculateCorrelation = (x: number[], y: number[]): number => {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
    const sumX2 = x.reduce((a, b) => a + b * b, 0);
    const sumY2 = y.reduce((a, b) => a + b * b, 0);
    
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    return denominator === 0 ? 0 : numerator / denominator;
  };

  // Extract metric arrays from data
  const revenueArr = data.map(item => item.revenue);
  const costArr = data.map(item => item.cost);
  const roasArr = data.map(item => item.roas);
  const conversionArr = data.map(item => item.conversion);
  const cpaArr = data.map(item => item.cpa);

  // Calculate correlation matrix
  const correlationMatrix = [
    { metric: "Revenue", revenue: 1, cost: 0, roas: 0, conversion: 0, cpa: 0 },
    { metric: "Cost", revenue: 0, cost: 1, roas: 0, conversion: 0, cpa: 0 },
    { metric: "ROAS", revenue: 0, cost: 0, roas: 1, conversion: 0, cpa: 0 },
    { metric: "Conversion", revenue: 0, cost: 0, roas: 0, conversion: 1, cpa: 0 },
    { metric: "CPA", revenue: 0, cost: 0, roas: 0, conversion: 0, cpa: 1 },
  ];

  // Fill in correlation values
  correlationMatrix[0].cost = calculateCorrelation(revenueArr, costArr);
  correlationMatrix[0].roas = calculateCorrelation(revenueArr, roasArr);
  correlationMatrix[0].conversion = calculateCorrelation(revenueArr, conversionArr);
  correlationMatrix[0].cpa = calculateCorrelation(revenueArr, cpaArr);

  correlationMatrix[1].revenue = correlationMatrix[0].cost;
  correlationMatrix[1].roas = calculateCorrelation(costArr, roasArr);
  correlationMatrix[1].conversion = calculateCorrelation(costArr, conversionArr);
  correlationMatrix[1].cpa = calculateCorrelation(costArr, cpaArr);

  correlationMatrix[2].revenue = correlationMatrix[0].roas;
  correlationMatrix[2].cost = correlationMatrix[1].roas;
  correlationMatrix[2].conversion = calculateCorrelation(roasArr, conversionArr);
  correlationMatrix[2].cpa = calculateCorrelation(roasArr, cpaArr);

  correlationMatrix[3].revenue = correlationMatrix[0].conversion;
  correlationMatrix[3].cost = correlationMatrix[1].conversion;
  correlationMatrix[3].roas = correlationMatrix[2].conversion;
  correlationMatrix[3].cpa = calculateCorrelation(conversionArr, cpaArr);

  correlationMatrix[4].revenue = correlationMatrix[0].cpa;
  correlationMatrix[4].cost = correlationMatrix[1].cpa;
  correlationMatrix[4].roas = correlationMatrix[2].cpa;
  correlationMatrix[4].conversion = correlationMatrix[3].cpa;

  // Function to determine cell color based on correlation value
  const getCellColor = (value: number) => {
    const absValue = Math.abs(value);
    if (absValue > 0.7) return value > 0 ? "bg-green-100" : "bg-red-100";
    if (absValue > 0.3) return value > 0 ? "bg-green-50" : "bg-red-50";
    return "";
  };
  
  // Function to format correlation values
  const formatCorrelation = (value: number) => {
    if (value === 1) return "—";
    return value.toFixed(2);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md">Correlation Matrix</CardTitle>
        <CardDescription>
          Relationship between different metrics (-1 to 1)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-auto">
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Metric</th>
                <th className="p-2 text-center">Revenue</th>
                <th className="p-2 text-center">Cost</th>
                <th className="p-2 text-center">ROAS</th>
                <th className="p-2 text-center">Conversion</th>
                <th className="p-2 text-center">CPA</th>
              </tr>
            </thead>
            <tbody>
              {correlationMatrix.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 font-medium">{row.metric}</td>
                  <td className={`p-2 text-center ${getCellColor(row.revenue)}`}>
                    {formatCorrelation(row.revenue)}
                  </td>
                  <td className={`p-2 text-center ${getCellColor(row.cost)}`}>
                    {formatCorrelation(row.cost)}
                  </td>
                  <td className={`p-2 text-center ${getCellColor(row.roas)}`}>
                    {formatCorrelation(row.roas)}
                  </td>
                  <td className={`p-2 text-center ${getCellColor(row.conversion)}`}>
                    {formatCorrelation(row.conversion)}
                  </td>
                  <td className={`p-2 text-center ${getCellColor(row.cpa)}`}>
                    {formatCorrelation(row.cpa)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          <p>
            <span className="inline-block w-3 h-3 bg-green-100 mr-1"></span> 
            <span className="mr-4">Strong positive correlation</span>
            <span className="inline-block w-3 h-3 bg-red-100 mr-1"></span> 
            <span>Strong negative correlation</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
