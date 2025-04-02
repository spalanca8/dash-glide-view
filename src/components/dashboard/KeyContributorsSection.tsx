
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";

interface KeyContributorsSectionProps {
  incrementalData: any[];
  loading: boolean;
}

export function KeyContributorsSection({ incrementalData, loading }: KeyContributorsSectionProps) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Key Contributors</CardTitle>
        <CardDescription>
          Channels with the highest incremental impact
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!loading && incrementalData
            .sort((a, b) => b.incremental - a.incremental)
            .slice(0, 3)
            .map((channel, index) => {
              const incrementalPct = ((channel.incremental / channel.total) * 100).toFixed(1);
              
              return (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: channel.color }}
                      ></div>
                      <span className="font-medium">{channel.name}</span>
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      <ArrowUp className="h-3 w-3 mr-1 text-green-600" />
                      <span>{incrementalPct}% Incremental</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-accent rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${incrementalPct}%`,
                        backgroundColor: channel.color,
                      }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Baseline: ${channel.baseline.toLocaleString()}</span>
                    <span>Incremental: ${channel.incremental.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
}
