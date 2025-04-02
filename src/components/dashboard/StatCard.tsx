
import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  change?: {
    value: number;
    trend: "up" | "down";
  };
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground">
            <span
              className={cn(
                "inline-flex items-center",
                change.trend === "up" ? "text-emerald-500" : "text-rose-500"
              )}
            >
              {change.trend === "up" ? (
                <ArrowUp className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDown className="mr-1 h-3 w-3" />
              )}
              {Math.abs(change.value)}%
            </span>{" "}
            from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
