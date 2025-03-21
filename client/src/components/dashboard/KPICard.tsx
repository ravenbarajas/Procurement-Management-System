import { cn } from "@/lib/utils";
import { KPI } from "@/types";
import { ArrowUp, ArrowDown } from "lucide-react";

interface KPICardProps {
  kpi: KPI;
  className?: string;
}

export function KPICard({ kpi, className }: KPICardProps) {
  const {
    title,
    value,
    change,
    changeType,
    icon,
    iconBg,
    iconColor
  } = kpi;

  const getIcon = () => {
    switch (icon) {
      case 'dollar-circle':
        return (
          <svg 
            className="h-6 w-6" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="6" x2="12" y2="18" />
            <path d="M9 9.3c0-1 1.2-1.3 3-1.3s3 .3 3 1.3c0 1.8-6 1.8-6 3.7 0 1 1.2 1.3 3 1.3s3-.3 3-1.3" />
          </svg>
        );
      case 'line-chart':
        return (
          <svg 
            className="h-6 w-6" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          >
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
        );
      case 'star':
        return (
          <svg 
            className="h-6 w-6" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      case 'time':
        return (
          <svg 
            className="h-6 w-6" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={cn(
        "bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm p-5",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
          <div className="flex items-center mt-2 text-sm">
            <span className={cn(
              "flex items-center",
              changeType === 'increase' 
                ? "text-emerald-600 dark:text-emerald-400" 
                : "text-red-600 dark:text-red-400"
            )}>
              {changeType === 'increase' ? (
                <ArrowUp className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDown className="mr-1 h-3 w-3" />
              )}
              {change}%
            </span>
            <span className="text-slate-500 dark:text-slate-400 ml-2">vs last month</span>
          </div>
        </div>
        <div className={cn("p-2 rounded-lg", iconBg)}>
          <div className={iconColor}>
            {getIcon()}
          </div>
        </div>
      </div>
    </div>
  );
}
