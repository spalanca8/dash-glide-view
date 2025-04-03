
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Route } from "lucide-react";
import { AttributionComparison } from "@/components/campaign-analytics/AttributionComparison";
import { ConversionPathSankey } from "@/components/campaign-analytics/ConversionPathSankey";
import { TouchpointHeatmap } from "@/components/campaign-analytics/TouchpointHeatmap";

export const CustomerJourneyMapping = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Route className="h-5 w-5 text-primary" />
              Customer Journey Mapping
            </CardTitle>
            <CardDescription>
              Multi-touch attribution model comparison, conversion path visualization, and touchpoint heatmap
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="attribution">
          <TabsList className="mb-4 bg-muted/50">
            <TabsTrigger value="attribution">Multi-touch Attribution</TabsTrigger>
            <TabsTrigger value="conversion">Conversion Path</TabsTrigger>
            <TabsTrigger value="heatmap">Touchpoint Heatmap</TabsTrigger>
          </TabsList>
          
          <TabsContent value="attribution" className="pt-4">
            <AttributionComparison />
          </TabsContent>
          
          <TabsContent value="conversion" className="pt-4">
            <ConversionPathSankey />
          </TabsContent>
          
          <TabsContent value="heatmap" className="pt-4">
            <TouchpointHeatmap />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
