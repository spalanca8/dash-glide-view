
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ABTest } from "@/hooks/useMockABTestData";
import { Skeleton } from "@/components/ui/skeleton";
import { Globe, MapPin, Shield, ShieldCheck } from "lucide-react";

// Define the structure for geographic distribution data
interface GeoData {
  name: string;
  isTestGroup: boolean;
  visitors: number;
  conversions: number;
}

interface ABTestGeoDistributionProps {
  test: ABTest;
  loading?: boolean;
}

export function ABTestGeoDistribution({ test, loading = false }: ABTestGeoDistributionProps) {
  if (loading) {
    return (
      <Card className="glass-card premium-shadow border-white/30">
        <CardHeader className="pb-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72 mt-1" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // If there's no geo data, display a message
  if (!test.geoDistribution || test.geoDistribution.length === 0) {
    return (
      <Card className="glass-card premium-shadow border-white/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Geographic Distribution
          </CardTitle>
          <CardDescription>
            No geographic data available for this test
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
            <Globe className="h-10 w-10 mb-2 text-muted-foreground/50" />
            <p>This test did not track geographic distribution or was applied globally.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Split the geo data into test and control groups
  const testGroupGeos = test.geoDistribution.filter(geo => geo.isTestGroup);
  const controlGroupGeos = test.geoDistribution.filter(geo => !geo.isTestGroup);

  return (
    <Card className="glass-card premium-shadow border-white/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Geographic Distribution
        </CardTitle>
        <CardDescription>
          Regions included in test and control groups
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Test Group Column */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-5 w-5 text-purple-500" />
              <h3 className="font-medium">Test Group Regions</h3>
            </div>
            <div className="space-y-3">
              {testGroupGeos.length > 0 ? (
                testGroupGeos.map((geo, index) => (
                  <div key={`test-${index}`} className="bg-muted/40 p-3 rounded-md flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <span className="font-medium">{geo.name}</span>
                    </div>
                    <div className="text-sm text-right">
                      <div><span className="font-medium">{geo.visitors.toLocaleString()}</span> visitors</div>
                      <div><span className="font-medium">{geo.conversions.toLocaleString()}</span> conversions</div>
                      <div className="text-purple-500 font-medium">
                        {((geo.conversions / geo.visitors) * 100).toFixed(1)}% conv. rate
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground p-4">
                  No regions in test group
                </div>
              )}
            </div>
          </div>
          
          {/* Control Group Column */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-gray-500" />
              <h3 className="font-medium">Control Group Regions</h3>
            </div>
            <div className="space-y-3">
              {controlGroupGeos.length > 0 ? (
                controlGroupGeos.map((geo, index) => (
                  <div key={`control-${index}`} className="bg-muted/40 p-3 rounded-md flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <span className="font-medium">{geo.name}</span>
                    </div>
                    <div className="text-sm text-right">
                      <div><span className="font-medium">{geo.visitors.toLocaleString()}</span> visitors</div>
                      <div><span className="font-medium">{geo.conversions.toLocaleString()}</span> conversions</div>
                      <div className="text-gray-500 font-medium">
                        {((geo.conversions / geo.visitors) * 100).toFixed(1)}% conv. rate
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground p-4">
                  No regions in control group
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
