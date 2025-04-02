
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Info, Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ScenarioSelectorProps = {
  activeScenario: string;
  onScenarioChange: (scenario: string) => void;
};

export function ScenarioSelector({ activeScenario, onScenarioChange }: ScenarioSelectorProps) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium">Budget Scenarios</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Info className="h-4 w-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p>Compare different budget allocation strategies based on your business goals.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Tabs
        defaultValue="bau"
        value={activeScenario}
        onValueChange={onScenarioChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bau">
            Business As Usual
          </TabsTrigger>
          <TabsTrigger value="cost-savings">
            Cost Savings
          </TabsTrigger>
          <TabsTrigger value="revenue-uplift">
            Revenue Uplift
          </TabsTrigger>
          <TabsTrigger value="custom-optimizer" className="flex items-center gap-1">
            <Sparkles className="h-4 w-4" />
            Custom Optimizer
          </TabsTrigger>
        </TabsList>
        
        {/* Add empty TabsContent elements for each tab to maintain correct structure */}
        <TabsContent value="bau" className="hidden" />
        <TabsContent value="cost-savings" className="hidden" />
        <TabsContent value="revenue-uplift" className="hidden" />
        <TabsContent value="custom-optimizer" className="hidden" />
      </Tabs>
    </div>
  );
}
