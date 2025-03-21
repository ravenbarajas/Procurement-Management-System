import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "@/components/ui/star-rating";
import { VendorAvatar } from "@/components/ui/vendor-avatar";
import { Vendor } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface TopVendorsProps {
  vendors: Vendor[];
  className?: string;
}

export function TopVendors({ vendors, className }: TopVendorsProps) {
  return (
    <Card className={className}>
      <CardHeader className="border-b border-slate-200 dark:border-slate-700 px-5 py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Top Vendors</CardTitle>
          <Button asChild variant="link" className="px-0 text-emerald-600 dark:text-emerald-400">
            <Link href="/vendors">
              View All
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-5 divide-y divide-slate-200 dark:divide-slate-700">
        {vendors.map((vendor, index) => (
          <div 
            key={vendor.id} 
            className={`flex items-center py-3 ${index === 0 ? 'pt-0' : ''} ${index === vendors.length - 1 ? 'pb-0' : ''}`}
          >
            <VendorAvatar 
              name={vendor.name} 
              code={vendor.code} 
              size="md"
            />
            <div className="ml-3">
              <h4 className="text-sm font-medium text-slate-900 dark:text-slate-200">
                {vendor.name}
              </h4>
              <div className="flex items-center mt-1">
                <StarRating rating={vendor.rating} size="sm" />
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-sm font-medium text-slate-900 dark:text-slate-200">
                {formatCurrency(vendor.totalSpend)}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {vendor.ordersCount} orders
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
