
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SidebarNav } from "./SidebarNav";
import { SidebarHeader } from "./SidebarHeader";
import { HeaderBanner } from "./HeaderBanner";
import { GlobalFilters } from "./GlobalFilters";
import { ProductFilterProvider } from "@/contexts/ProductFilterContext";
import { GeoFilterProvider } from "@/contexts/GeoFilterContext";
import { DateRangeProvider } from "@/contexts/DateRangeContext";
import { cn } from "@/lib/utils";

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const sidebarWidth = collapsed ? "w-16" : "w-64";
  const sidebarTransition = "transition-all duration-300 ease-smooth";

  return (
    <ProductFilterProvider>
      <GeoFilterProvider>
        <DateRangeProvider>
          <div className={cn("flex min-h-screen bg-gray-50", mounted ? "animate-fade-in" : "opacity-0")}>
            {/* Sidebar */}
            <div className={cn(
              "fixed inset-y-0 left-0 z-50 flex flex-col bg-white shadow-md",
              sidebarWidth,
              sidebarTransition
            )}>
              <div className="border-b border-border/30">
                <SidebarHeader collapsed={collapsed} setCollapsed={setCollapsed} />
              </div>
              
              <div className={cn("px-2 overflow-y-auto flex-1 py-2", collapsed ? "items-center" : "")}>
                <SidebarNav />
              </div>
              
              <div className="p-4 border-t border-border/30">
                <div className={cn(
                  "text-xs text-muted-foreground flex items-center justify-center",
                  !collapsed && "justify-start"
                )}>
                  {!collapsed ? "© 2023 Artefact" : "©"}
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className={cn(
              "flex-1 transition-all duration-300 ease-smooth bg-gray-50",
              collapsed ? "ml-16" : "ml-64"
            )}>
              <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-border/20 shadow-sm">
                <div className="max-w-7xl w-full mx-auto px-6 py-4 flex items-center justify-between">
                  <HeaderBanner />
                  <GlobalFilters />
                </div>
              </div>
              <div className="max-w-7xl w-full mx-auto p-6">
                <Outlet />
              </div>
            </div>
          </div>
        </DateRangeProvider>
      </GeoFilterProvider>
    </ProductFilterProvider>
  );
}
