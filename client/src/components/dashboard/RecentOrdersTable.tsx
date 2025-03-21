import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { formatCurrency } from "@/lib/utils";
import { PurchaseOrder } from "@/types";
import { ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RecentOrdersTableProps {
  orders: PurchaseOrder[];
  className?: string;
}

export function RecentOrdersTable({ orders, className }: RecentOrdersTableProps) {
  return (
    <Card className={className}>
      <CardHeader className="border-b border-slate-200 dark:border-slate-700 px-5 py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Purchase Orders</CardTitle>
          <Button asChild variant="link" className="px-0 text-emerald-600 dark:text-emerald-400">
            <Link href="/procurement">
              View All
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-800/60">
              <TableRow className="border-slate-200 dark:border-slate-700 hover:bg-transparent">
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  PO Number
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Vendor
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Amount
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow 
                  key={order.id} 
                  className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30"
                >
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200">
                    {order.poNumber}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                    {order.vendor}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                    {formatCurrency(order.amount)}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {order.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-700 dark:text-slate-300">
            Showing <span className="font-medium">4</span> of <span className="font-medium">24</span> results
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-8">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
