import { cn } from "@/lib/utils";
import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  showValue?: boolean;
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  showValue = true,
  color = "text-amber-500",
  size = "md",
  className
}: StarRatingProps) {
  // Calculate full and half stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };
  
  const iconSize = sizeClasses[size];
  
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star 
            key={`star-${i}`} 
            className={cn("fill-current", iconSize, color)} 
          />
        ))}
        
        {hasHalfStar && (
          <StarHalf 
            className={cn("fill-current", iconSize, color)} 
          />
        )}
        
        {Array.from({ length: maxRating - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
          <Star 
            key={`empty-star-${i}`} 
            className={cn(iconSize, "text-slate-300 dark:text-slate-600")} 
          />
        ))}
      </div>
      
      {showValue && (
        <span className={cn(
          "ml-2 text-slate-500 dark:text-slate-400",
          size === "sm" ? "text-xs" : size === "md" ? "text-xs" : "text-sm"
        )}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
