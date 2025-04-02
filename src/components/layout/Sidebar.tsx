
import React from "react";
import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  Calendar,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SidebarNavItemProps = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
};

const SidebarNavItem = ({ icon: Icon, label, active }: SidebarNavItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 pl-3 font-normal",
        active ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <Icon size={18} />
      <span>{label}</span>
    </Button>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "bg-sidebar h-screen transition-all overflow-hidden border-r",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="font-semibold text-lg">Dashboard</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="space-y-1 p-2">
        {!collapsed ? (
          <>
            <SidebarNavItem icon={LayoutDashboard} label="Dashboard" active />
            <SidebarNavItem icon={BarChart3} label="Analytics" />
            <SidebarNavItem icon={Users} label="Users" />
            <SidebarNavItem icon={Calendar} label="Calendar" />
            <SidebarNavItem icon={MessageSquare} label="Messages" />
            <SidebarNavItem icon={Settings} label="Settings" />
          </>
        ) : (
          <>
            <Button variant="ghost" size="icon" className={cn("w-full mb-1", "bg-accent text-accent-foreground")}>
              <LayoutDashboard size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="w-full mb-1">
              <BarChart3 size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="w-full mb-1">
              <Users size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="w-full mb-1">
              <Calendar size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="w-full mb-1">
              <MessageSquare size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="w-full mb-1">
              <Settings size={18} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
