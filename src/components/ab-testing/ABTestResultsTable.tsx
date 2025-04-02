
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ABTest } from "@/hooks/useMockABTestData";
import { CheckSquare, ArrowUp, ArrowDown } from "lucide-react";

interface ABTestResultsTableProps {
  test: ABTest;
  loading: boolean;
}

export function ABTestResultsTable({ test, loading }: ABTestResultsTableProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  // Find the control variant
  const controlVariant = test.variants.find(v => v.isControl);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Variant</TableHead>
            <TableHead className="text-right">Visitors</TableHead>
            <TableHead className="text-right">Conversions</TableHead>
            <TableHead className="text-right">Conv. Rate</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">vs. Control</TableHead>
            <TableHead className="text-right">Confidence</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {test.variants.map((variant) => {
            const isWinner = test.winner === variant.id;
            const vsControl = !variant.isControl && controlVariant
              ? ((variant.conversionRate - controlVariant.conversionRate) / controlVariant.conversionRate) * 100
              : null;
            
            return (
              <TableRow key={variant.id} className={isWinner ? "bg-muted/40" : ""}>
                <TableCell className="font-medium flex items-center gap-2">
                  {variant.name}
                  {variant.isControl && (
                    <Badge variant="outline">Control</Badge>
                  )}
                  {isWinner && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Winner</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">{variant.visitors.toLocaleString()}</TableCell>
                <TableCell className="text-right">{variant.conversions.toLocaleString()}</TableCell>
                <TableCell className="text-right">{variant.conversionRate.toFixed(2)}%</TableCell>
                <TableCell className="text-right">${variant.revenue.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  {variant.isControl ? (
                    "—"
                  ) : vsControl !== null ? (
                    <div className="flex items-center justify-end gap-1">
                      {vsControl > 0 ? (
                        <>
                          <ArrowUp className="h-4 w-4 text-green-500" />
                          <span className="text-green-500">{vsControl.toFixed(1)}%</span>
                        </>
                      ) : (
                        <>
                          <ArrowDown className="h-4 w-4 text-red-500" />
                          <span className="text-red-500">{Math.abs(vsControl).toFixed(1)}%</span>
                        </>
                      )}
                    </div>
                  ) : null}
                </TableCell>
                <TableCell className="text-right">
                  {variant.confidenceLevel ? `${variant.confidenceLevel.toFixed(1)}%` : "—"}
                </TableCell>
                <TableCell>
                  {isWinner && <CheckSquare className="h-5 w-5 text-green-500 ml-auto" />}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
