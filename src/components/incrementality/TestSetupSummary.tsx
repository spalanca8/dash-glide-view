
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ABTest } from "@/hooks/useMockABTestData";
import { Badge } from "@/components/ui/badge";
import { Map, Calendar, Users, Radio } from "lucide-react";

interface TestSetupSummaryProps {
  test: ABTest;
}

export function TestSetupSummary({ test }: TestSetupSummaryProps) {
  // Generate test setup details based on the test data
  const channels = test.channel || "Multiple Channels";
  
  // Extract geographic information
  const geographies = test.geoDistribution 
    ? [...new Set(test.geoDistribution.map(geo => geo.name))]
    : ["Global"];
  
  // Format test and control allocation
  const testControlAllocation = test.geoDistribution 
    ? `${test.geoDistribution.filter(geo => geo.isTestGroup).length} regions in test group, ${test.geoDistribution.filter(geo => !geo.isTestGroup).length} regions in control group` 
    : "50% Test / 50% Control split";
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const testDuration = test.endDate 
    ? `${Math.round((new Date(test.endDate).getTime() - new Date(test.startDate).getTime()) / (1000 * 60 * 60 * 24))} days` 
    : "Ongoing";
  
  return (
    <Card className="glass-card premium-shadow border-white/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Test Setup Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Test Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Start Date: {formatDate(test.startDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Duration: {testDuration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Target Audience: {test.audience}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Test Configuration</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Radio className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <span className="text-sm">Channels: </span>
                  <Badge variant="outline" className="ml-1 bg-white/50">{channels}</Badge>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Map className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <span className="text-sm">Geographies: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {geographies.map(geo => (
                      <Badge key={geo} variant="outline" className="bg-white/50">{geo}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 text-muted-foreground mt-1" />
                <span className="text-sm">Test/Control Allocation: {testControlAllocation}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-muted/70 backdrop-blur-sm p-4 rounded-md border border-white/20">
          <h3 className="font-medium mb-2">Test Hypothesis</h3>
          <p className="text-sm text-muted-foreground">{test.hypothesis}</p>
        </div>
      </CardContent>
    </Card>
  );
}
