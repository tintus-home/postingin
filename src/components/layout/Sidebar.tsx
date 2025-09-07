import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  PenTool, 
  Calendar, 
  MessageSquare, 
  Settings, 
  BarChart3,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard
  },
  {
    title: "Composer",
    href: "/composer",
    icon: PenTool
  },
  {
    title: "Queue",
    href: "/queue",
    icon: Calendar
  },
  {
    title: "Auto-Reply",
    href: "/auto-reply",
    icon: MessageSquare
  },
  {
    title: "Analytics", 
    href: "/analytics",
    icon: BarChart3
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings
  }
];

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const location = useLocation();

  return (
    <div className={cn(
      "relative bg-gradient-secondary border-r border-border transition-all duration-300 ease-smooth",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
              Postingin
            </span>
          </div>
        )}
        <Button
          variant="ghost" 
          size="icon"
          onClick={onToggleCollapse}
          className="hover:bg-muted"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200",
                "hover:bg-muted group",
                isActive && "bg-primary text-primary-foreground shadow-md"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-colors",
                isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
              )} />
              {!collapsed && (
                <span className={cn(
                  "font-medium transition-colors",
                  isActive ? "text-primary-foreground" : "text-foreground"
                )}>
                  {item.title}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-card border border-border rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-medium text-sm">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  User Demo
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  user@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}