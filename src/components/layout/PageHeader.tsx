
import React from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

export function PageHeader({ 
  title, 
  description, 
  children,
  actions,
  className
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 mb-8", className)}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-balance">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1 text-balance max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
      {actions && <div className="w-full">{actions}</div>}
    </div>
  );
}
