
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { WaterfallChart } from "@/components/dashboard/WaterfallChart";

interface WaterfallSectionProps {
  data: any[];
  loading: boolean;
}

export function WaterfallSection({ data, loading }: WaterfallSectionProps) {
  return (
    <Card className="mb-8 glass-card premium-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-primary font-semibold">Revenue Breakdown</CardTitle>
        <CardDescription>
          Contribution to revenue by media type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <WaterfallChart
          data={data}
          loading={loading}
          height={350}
          className="animate-fade-in"
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" /> 
            The waterfall chart shows how each media type contributes to total revenue, starting with the baseline performance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
