import { cn } from "@/lib/utils";
import { getStatusColorClass } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { bgClass, textClass } = getStatusColorClass(status);

  return (
    <span 
      className={cn(
        "px-2.5 py-0.5 rounded-full text-xs font-medium", 
        bgClass,
        textClass,
        className
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
