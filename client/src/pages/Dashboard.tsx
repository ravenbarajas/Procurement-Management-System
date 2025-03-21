import { useEffect } from "react";
import { 
  kpiData, 
  procurementTrendData, 
  spendByCategoryData, 
  recentPurchaseOrders, 
  topVendors 
} from "@/lib/mockData";
import { KPICard } from "@/components/dashboard/KPICard";
import { ProcurementTrendChart } from "@/components/dashboard/ProcurementTrendChart";
import { SpendByCategoryChart } from "@/components/dashboard/SpendByCategoryChart";
import { RecentOrdersTable } from "@/components/dashboard/RecentOrdersTable";
import { TopVendors } from "@/components/dashboard/TopVendors";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Home, 
  Download, 
  Plus, 
  ChevronRight 
} from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      toast({
        title: "Dashboard Updated",
        description: "Latest procurement data has been loaded",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: "Your export will be ready shortly",
    });
  };

  const handleNewOrder = () => {
    toast({
      title: "New Order",
      description: "Create a new procurement order",
    });
  };

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="py-4">
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
          <Home className="h-4 w-4 mr-1.5" />
          <span className="mx-1.5">/</span>
          <span className="font-medium text-slate-900 dark:text-slate-200">Dashboard</span>
        </div>
      </div>
      
      {/* Dashboard Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Procurement Dashboard</h1>
        <div className="mt-3 sm:mt-0 flex space-x-3">
          <Button 
            variant="outline" 
            onClick={handleExport}
            className="text-slate-700 dark:text-slate-200"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button 
            onClick={handleNewOrder}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} />
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ProcurementTrendChart 
          data={procurementTrendData} 
          className="lg:col-span-2"
        />
        <SpendByCategoryChart data={spendByCategoryData} />
      </div>
      
      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentOrdersTable 
          orders={recentPurchaseOrders} 
          className="lg:col-span-2"
        />
        <TopVendors vendors={topVendors} />
      </div>
    </div>
  );
}
