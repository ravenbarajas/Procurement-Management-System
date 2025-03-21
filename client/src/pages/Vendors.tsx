import { useState } from "react";
import { allVendors, vendorPerformanceMetrics } from "@/lib/mockData";
import { Vendor } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { StarRating } from "@/components/ui/star-rating";
import { VendorAvatar } from "@/components/ui/vendor-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/utils";
import { 
  Home, 
  Plus, 
  Search, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash, 
  CheckCircle, 
  AlertCircle 
} from "lucide-react";

export default function Vendors() {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  
  // Prepare performance data for selected vendor
  const performanceData = [
    {
      metric: "Delivery Time",
      score: selectedVendor ? 
        vendorPerformanceMetrics.deliveryTime[selectedVendor.name] : 0,
      average: 90
    },
    {
      metric: "Quality Score",
      score: selectedVendor ? 
        vendorPerformanceMetrics.qualityScore[selectedVendor.name] : 0,
      average: 88
    }
  ];

  // Define table columns
  const columns: ColumnDef<Vendor>[] = [
    {
      accessorKey: "name",
      header: "Vendor",
      cell: ({ row }) => {
        const vendor = row.original;
        return (
          <div className="flex items-center">
            <VendorAvatar name={vendor.name} code={vendor.code} size="sm" />
            <div className="ml-2">
              <div className="font-medium text-slate-900 dark:text-slate-200">{vendor.name}</div>
              {vendor.category && (
                <div className="text-xs text-slate-500 dark:text-slate-400">{vendor.category}</div>
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => (
        <StarRating rating={row.getValue("rating")} />
      ),
    },
    {
      accessorKey: "totalSpend",
      header: "Total Spend",
      cell: ({ row }) => (
        <div>{formatCurrency(row.getValue("totalSpend"))}</div>
      ),
    },
    {
      accessorKey: "ordersCount",
      header: "Orders",
      cell: ({ row }) => (
        <div>{row.getValue("ordersCount")}</div>
      ),
    },
    {
      accessorKey: "contractExpiry",
      header: "Contract Expiry",
      cell: ({ row }) => {
        const expiryDate = row.getValue("contractExpiry") as string | undefined;
        if (!expiryDate) return <div>-</div>;
        
        const date = new Date(expiryDate);
        const now = new Date();
        const diffTime = date.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return (
          <div className="flex items-center">
            <span className="mr-2">{new Date(expiryDate).toLocaleDateString()}</span>
            {diffDays < 30 && (
              <div className="text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                {diffDays} days
              </div>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const vendor = row.original;
        
        return (
          <div className="flex items-center justify-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mr-1"
                  onClick={() => setSelectedVendor(vendor)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent position="right" size="xl">
                <SheetHeader>
                  <SheetTitle>Vendor Details</SheetTitle>
                  <SheetDescription>
                    View detailed information about this vendor
                  </SheetDescription>
                </SheetHeader>
                {selectedVendor && (
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center">
                      <VendorAvatar name={selectedVendor.name} code={selectedVendor.code} size="lg" />
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{selectedVendor.name}</h3>
                        <div className="mt-1 flex items-center">
                          <StarRating rating={selectedVendor.rating} size="md" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Spend</h4>
                        <p className="text-2xl font-semibold mt-1 text-slate-900 dark:text-slate-100">
                          {formatCurrency(selectedVendor.totalSpend)}
                        </p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Orders</h4>
                        <p className="text-2xl font-semibold mt-1 text-slate-900 dark:text-slate-100">
                          {selectedVendor.ordersCount}
                        </p>
                      </div>
                    </div>
                    
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                      <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
                      <div className="space-y-3">
                        {selectedVendor.contactName && (
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Contact Person</p>
                            <p className="text-slate-900 dark:text-slate-200">{selectedVendor.contactName}</p>
                          </div>
                        )}
                        {selectedVendor.email && (
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                            <p className="text-slate-900 dark:text-slate-200">{selectedVendor.email}</p>
                          </div>
                        )}
                        {selectedVendor.phone && (
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Phone</p>
                            <p className="text-slate-900 dark:text-slate-200">{selectedVendor.phone}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                      <h4 className="text-lg font-semibold mb-4">Performance Metrics</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={performanceData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                            <XAxis dataKey="metric" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Bar name="Vendor Score" dataKey="score" fill="#059669" />
                            <Bar name="Industry Average" dataKey="average" fill="#94a3b8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>View Orders</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 dark:text-red-400">
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
          <span className="font-medium text-slate-900 dark:text-slate-200">Vendors</span>
        </div>
      </div>
      
      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Vendor Management</h1>
        <div className="mt-3 sm:mt-0 flex space-x-3">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Vendor
          </Button>
        </div>
      </div>
      
      {/* Vendor Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <CardDescription>Active Vendors</CardDescription>
                <CardTitle className="text-2xl mt-1">
                  {allVendors.length}
                </CardTitle>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <CardDescription>Expiring Contracts</CardDescription>
                <CardTitle className="text-2xl mt-1">
                  {allVendors.filter(v => v.contractExpiry && new Date(v.contractExpiry).getTime() - new Date().getTime() < 30 * 24 * 60 * 60 * 1000).length}
                </CardTitle>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <StarRating rating={4.6} size="sm" showValue={false} className="p-1" />
              </div>
              <div>
                <CardDescription>Average Rating</CardDescription>
                <CardTitle className="text-2xl mt-1">
                  4.6/5.0
                </CardTitle>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                <svg 
                  className="h-6 w-6 text-purple-600 dark:text-purple-400" 
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
                  <line x1="6" y1="12" x2="18" y2="12" />
                </svg>
              </div>
              <div>
                <CardDescription>Categories</CardDescription>
                <CardTitle className="text-2xl mt-1">
                  4
                </CardTitle>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Vendors Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <Tabs defaultValue="all">
          <div className="px-4 pt-4">
            <TabsList className="grid grid-cols-3 h-10">
              <TabsTrigger value="all" className="text-sm">All Vendors</TabsTrigger>
              <TabsTrigger value="active" className="text-sm">Active</TabsTrigger>
              <TabsTrigger value="expiring" className="text-sm">Expiring Soon</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="p-0 pt-4">
            <DataTable 
              columns={columns} 
              data={allVendors} 
              pageSize={5}
            />
          </TabsContent>
          
          <TabsContent value="active" className="p-0 pt-4">
            <DataTable 
              columns={columns} 
              data={allVendors.filter(v => v.rating >= 4)} 
              pageSize={5}
            />
          </TabsContent>
          
          <TabsContent value="expiring" className="p-0 pt-4">
            <DataTable 
              columns={columns} 
              data={allVendors.filter(v => v.contractExpiry && new Date(v.contractExpiry).getTime() - new Date().getTime() < 30 * 24 * 60 * 60 * 1000)} 
              pageSize={5}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
