import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart2,
  Settings,
  HelpCircle,
  Rocket
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();

  const routes = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/procurement", label: "Procurement", icon: FileText },
    { path: "/vendors", label: "Vendors", icon: Users },
    { path: "/reports", label: "Reports", icon: BarChart2 }
  ];

  const secondaryRoutes = [
    { path: "/settings", label: "Settings", icon: Settings },
    { path: "/support", label: "Help & Support", icon: HelpCircle }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 z-10 bg-black/50" 
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 pt-16 z-20 transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {/* Navigation Items */}
            {routes.map((route) => {
              const Icon = route.icon;
              const isActive = location === route.path;

              return (
                <Link key={route.path} href={route.path}>
                  <a
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md font-medium group",
                      isActive 
                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" 
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    )}
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        onClose();
                      }
                    }}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span>{route.label}</span>
                  </a>
                </Link>
              );
            })}

            <div className="pt-4 pb-2">
              <Separator className="mx-2" />
            </div>

            {/* Secondary Navigation Items */}
            {secondaryRoutes.map((route) => {
              const Icon = route.icon;
              const isActive = location === route.path;

              return (
                <Link key={route.path} href={route.path}>
                  <a
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md font-medium group",
                      isActive 
                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" 
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    )}
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        onClose();
                      }
                    }}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span>{route.label}</span>
                  </a>
                </Link>
              );
            })}
          </nav>

          {/* Pro Banner */}
          <div className="p-4">
            <div className="bg-slate-100 dark:bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Rocket className="h-5 w-5 text-amber-500 mr-2" />
                <h4 className="font-semibold text-sm">Upgrade to Pro</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Get advanced reports, insights, and more vendor features.
              </p>
              <Button
                className="w-full py-1.5 px-3 h-auto text-xs bg-amber-500 hover:bg-amber-600"
                variant="default"
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
