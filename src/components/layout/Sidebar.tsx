import React, { useState } from 'react';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNav } from './SidebarNav';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-black/40 backdrop-blur-lg border-r border-white/10 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <SidebarHeader collapsed={isCollapsed} setCollapsed={() => setIsCollapsed(!isCollapsed)} />
      {!isCollapsed && <SidebarNav />}
    </div>
  );
}