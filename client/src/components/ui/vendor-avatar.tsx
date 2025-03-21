import { getInitials, getVendorColorClass } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface VendorAvatarProps {
  name: string;
  code: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function VendorAvatar({ name, code, size = "md", className }: VendorAvatarProps) {
  const initials = code || getInitials(name);
  const colorClass = getVendorColorClass(code);
  
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base"
  };
  
  return (
    <div 
      className={cn(
        "rounded-full flex items-center justify-center font-semibold",
        colorClass,
        sizeClasses[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
