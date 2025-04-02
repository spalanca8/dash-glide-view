
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SidebarHeaderProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

export function SidebarHeader({ collapsed, setCollapsed }: SidebarHeaderProps) {
  return (
    <div className={cn(
      "flex items-center transition-all duration-300",
      collapsed ? "justify-center py-6 px-3" : "justify-between py-7 px-5"
    )}>
      <div className={cn(
        "flex items-center justify-center w-full",
        !collapsed && "px-3"
      )}>
        <img 
          src="/lovable-uploads/c91593ad-aa3a-4f49-b9f4-86d049161286.png" 
          alt="Logo" 
          className={cn(
            "h-16 w-full", // Changed to w-full for wider logo
            collapsed && "hidden"
          )}
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-10 w-10 rounded-full hover:bg-gray-100",
          collapsed && "absolute -right-5 top-8 bg-white shadow-md border z-30"
        )}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </Button>
    </div>
  );
}
