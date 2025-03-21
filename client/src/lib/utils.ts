import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

// Format percentage
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

// Format large numbers with commas
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

// Get color class by status
export function getStatusColorClass(status: string): { bgClass: string; textClass: string } {
  switch (status.toLowerCase()) {
    case 'approved':
      return { 
        bgClass: 'bg-emerald-100 dark:bg-emerald-800/30', 
        textClass: 'text-emerald-800 dark:text-emerald-400' 
      };
    case 'processing':
      return { 
        bgClass: 'bg-blue-100 dark:bg-blue-800/30', 
        textClass: 'text-blue-800 dark:text-blue-400' 
      };
    case 'pending':
      return { 
        bgClass: 'bg-amber-100 dark:bg-amber-800/30', 
        textClass: 'text-amber-800 dark:text-amber-400' 
      };
    case 'rejected':
      return { 
        bgClass: 'bg-red-100 dark:bg-red-800/30', 
        textClass: 'text-red-800 dark:text-red-400' 
      };
    case 'delivered':
      return { 
        bgClass: 'bg-purple-100 dark:bg-purple-800/30', 
        textClass: 'text-purple-800 dark:text-purple-400' 
      };
    default:
      return { 
        bgClass: 'bg-slate-100 dark:bg-slate-800/30', 
        textClass: 'text-slate-800 dark:text-slate-400' 
      };
  }
}

// Get color class by vendor code (for avatar backgrounds)
export function getVendorColorClass(code: string): string {
  const colorOptions = [
    'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
    'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
    'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400'
  ];
  
  // Simple hash function to pick a color based on the vendor code
  const hash = code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = hash % colorOptions.length;
  
  return colorOptions[colorIndex];
}
