
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ABTest } from "@/hooks/useMockABTestData";
import { BarChart3 } from "lucide-react";

interface ABTestScenarioSelectorProps {
  tests: ABTest[];
  selectedTestId: string;
  onSelectTest: (testId: string) => void;
  loading: boolean;
}
export function ABTestScenarioSelector({
  tests,
  selectedTestId,
  onSelectTest,
  loading
}: ABTestScenarioSelectorProps) {
  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-gray-50 to-slate-50 border-slate-100">
        <CardContent className="p-4">
          <Skeleton className="h-10 w-[300px]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card premium-shadow border-white/30 bg-gradient-to-r from-purple-50/80 via-violet-50/80 to-fuchsia-50/80 backdrop-blur-md">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-purple-100">
            <BarChart3 className="h-5 w-5 text-purple-700" />
          </div>
          <div className="text-base font-medium text-purple-900">Select A/B Test Scenario:</div>
          <Select value={selectedTestId} onValueChange={onSelectTest}>
            <SelectTrigger className="w-[300px] bg-white/80 backdrop-blur-sm border-purple-200">
              <SelectValue placeholder="Select a test" />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm border-purple-200">
              {tests.map((test) => (
                <SelectItem key={test.id} value={test.id}>
                  {test.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
