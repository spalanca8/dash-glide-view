
import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  description?: string;
  loading?: boolean;
  className?: string;
  onMetricClick?: () => void;
  action?: React.ReactNode;
};

export function MetricCard({
  title,
  value,
  change,
  icon,
  description,
  loading = false,
  className,
  onMetricClick,
  action,
}: MetricCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  const changeText = change ? `${change > 0 ? "+" : ""}${change}%` : null;
  
  return (
    <div 
      className={cn("stats-card animate-fade-in", className, onMetricClick && "cursor-pointer")}
      onClick={onMetricClick}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && <div className="text-muted-foreground">{icon}</div>}
        {action}
      </div>
      
      <div className="mt-1">
        {loading ? (
          <div className="h-8 w-24 bg-muted rounded animate-pulse"></div>
        ) : (
          <h3 className="text-2xl font-bold">{value}</h3>
        )}
      </div>
      
      {change !== undefined && (
        <div className="flex items-center mt-1">
          <span
            className={cn(
              "text-xs font-medium flex items-center",
              isPositive && "text-green-600",
              isNegative && "text-red-600",
              !isPositive && !isNegative && "text-muted-foreground"
            )}
          >
            {isPositive && <ArrowUp className="mr-1 h-3 w-3" />}
            {isNegative && <ArrowDown className="mr-1 h-3 w-3" />}
            {changeText}
          </span>
          {description && (
            <span className="text-xs text-muted-foreground ml-1">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
