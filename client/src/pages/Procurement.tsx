import { useState } from "react";
import { allPurchaseOrders } from "@/lib/mockData";
import { PurchaseOrder, PurchaseOrderStatus } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Home, 
  Plus, 
  Filter, 
  MoreVertical, 
  FileText, 
  ChevronRight,
  Eye, 
  Download, 
  Copy, 
  Trash 
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export default function Procurement() {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Filter orders based on active tab
  const filteredOrders = activeTab === "all" 
    ? allPurchaseOrders 
    : allPurchaseOrders.filter((order) => order.status === activeTab);

  // Define table columns
  const columns: ColumnDef<PurchaseOrder>[] = [
    {
      accessorKey: "poNumber",
      header: "PO Number",
      cell: ({ row }) => (
        <div className="font-medium text-slate-900 dark:text-slate-200">
          {row.getValue("poNumber")}
        </div>
      ),
    },
    {
      accessorKey: "vendor",
      header: "Vendor",
      cell: ({ row }) => (
        <div>{row.getValue("vendor")}</div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <div>{formatCurrency(row.getValue("amount"))}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge status={row.getValue("status")} />
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="text-slate-500 dark:text-slate-400">{row.getValue("date")}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original;
        
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                <span>View Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                <span>Download</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                <span>Duplicate</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="py-4">
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
          <Home className="h-4 w-4 mr-1.5" />
          <span className="mx-1.5">/</span>
          <span className="font-medium text-slate-900 dark:text-slate-200">Procurement</span>
        </div>
      </div>
      
      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Purchase Orders</h1>
        <div className="mt-3 sm:mt-0 flex space-x-3">
          <Button 
            variant="outline" 
            className="text-slate-700 dark:text-slate-200"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Order
          </Button>
        </div>
      </div>
      
      {/* Tabs and Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-4 pt-4">
            <TabsList className="grid grid-cols-5 h-10">
              <TabsTrigger value="all" className="text-sm">All Orders</TabsTrigger>
              <TabsTrigger value="pending" className="text-sm">Pending</TabsTrigger>
              <TabsTrigger value="approved" className="text-sm">Approved</TabsTrigger>
              <TabsTrigger value="processing" className="text-sm">Processing</TabsTrigger>
              <TabsTrigger value="delivered" className="text-sm">Delivered</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value={activeTab} className="p-0 pt-4">
            <DataTable 
              columns={columns} 
              data={filteredOrders} 
              pageSize={5}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Recent Approvals */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Recent Approval Requests</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allPurchaseOrders.filter(order => order.status === 'pending').slice(0, 3).map((order) => (
            <div 
              key={order.id} 
              className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-slate-200">{order.poNumber}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{order.vendor}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              <div className="mb-3">
                <p className="text-sm text-slate-500 dark:text-slate-400">Amount:</p>
                <p className="font-medium text-slate-900 dark:text-slate-200">{formatCurrency(order.amount)}</p>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">{order.date}</span>
                <Button variant="link" className="text-emerald-600 dark:text-emerald-400 h-auto p-0 text-sm">
                  View Details
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
