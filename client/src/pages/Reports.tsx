import { useState } from "react";
import { 
  procurementTrendData, 
  spendByCategoryData,
  allPurchaseOrders,
  vendorPerformanceMetrics
} from "@/lib/mockData";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Download,
  Home,
  FileText,
  BarChart2,
  PieChart as PieChartIcon,
  Printer,
  Calendar as CalendarIcon
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

// Format data for monthly spend chart
const monthlySpendData = procurementTrendData.map(item => ({
  month: item.month,
  amount: item.spend
}));

// Format data for vendor performance
const vendorPerformanceData = Object.keys(vendorPerformanceMetrics.deliveryTime).map(vendor => ({
  name: vendor,
  deliveryTime: vendorPerformanceMetrics.deliveryTime[vendor],
  qualityScore: vendorPerformanceMetrics.qualityScore[vendor]
}));

// Format data for monthly order status
const getStatusByMonth = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map(month => {
    return {
      month,
      approved: Math.floor(Math.random() * 30) + 10,
      pending: Math.floor(Math.random() * 20) + 5,
      rejected: Math.floor(Math.random() * 10)
    };
  });
};

const statusByMonthData = getStatusByMonth();

export default function Reports() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div>
      {/* Breadcrumbs */}
      <div className="py-4">
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
          <Home className="h-4 w-4 mr-1.5" />
          <span className="mx-1.5">/</span>
          <span className="font-medium text-slate-900 dark:text-slate-200">Reports</span>
        </div>
      </div>
      
      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Financial Reports</h1>
        <div className="mt-3 sm:mt-0 flex space-x-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="text-slate-700 dark:text-slate-200">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>
      
      {/* Report Tabs */}
      <Tabs defaultValue="financial" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 h-10 max-w-md mb-6">
          <TabsTrigger value="financial" className="text-sm">
            <FileText className="h-4 w-4 mr-2" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-sm">
            <BarChart2 className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="category" className="text-sm">
            <PieChartIcon className="h-4 w-4 mr-2" />
            Categories
          </TabsTrigger>
        </TabsList>
        
        {/* Financial Tab Content */}
        <TabsContent value="financial" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <CardDescription>Total Spend YTD</CardDescription>
                <CardTitle className="text-2xl mt-1">
                  {formatCurrency(2458400)}
                </CardTitle>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 flex items-center">
                  <svg 
                    className="h-3 w-3 mr-1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                  8.2% vs last year
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <CardDescription>Avg. Order Value</CardDescription>
                <CardTitle className="text-2xl mt-1">
                  {formatCurrency(18250)}
                </CardTitle>
                <p className="text-xs text-red-600 dark:text-red-400 mt-2 flex items-center">
                  <svg 
                    className="h-3 w-3 mr-1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  >
                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                    <polyline points="16 17 22 17 22 11"></polyline>
                  </svg>
                  2.4% vs last year
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <CardDescription>Orders YTD</CardDescription>
                <CardTitle className="text-2xl mt-1">
                  142
                </CardTitle>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 flex items-center">
                  <svg 
                    className="h-3 w-3 mr-1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                  12.8% vs last year
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <CardDescription>Cost Savings</CardDescription>
                <CardTitle className="text-2xl mt-1">
                  {formatCurrency(348200)}
                </CardTitle>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 flex items-center">
                  <svg 
                    className="h-3 w-3 mr-1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                  15.2% vs last year
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Monthly Spend Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Monthly Procurement Spend</CardTitle>
                  <CardDescription>
                    Visual representation of procurement spend by month
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="6m">
                    <SelectTrigger className="w-[150px] h-8 text-sm">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3m">Last 3 Months</SelectItem>
                      <SelectItem value="6m">Last 6 Months</SelectItem>
                      <SelectItem value="1y">Last 12 Months</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlySpendData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `$${(value/1000)}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${formatCurrency(value as number)}`, 'Spend']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#059669" 
                    fillOpacity={1} 
                    fill="url(#colorSpend)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Order Status Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Order Status by Month</CardTitle>
                  <CardDescription>
                    Distribution of purchase order statuses across months
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={statusByMonthData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="approved" stackId="a" fill="#059669" />
                  <Bar dataKey="pending" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="rejected" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Performance Tab Content */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Vendor Performance Metrics</CardTitle>
                  <CardDescription>
                    Comparison of key performance indicators across vendors
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={vendorPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="deliveryTime" name="Delivery Time Score" fill="#059669" />
                  <Bar dataKey="qualityScore" name="Quality Score" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Average Delivery Time</CardTitle>
                <CardDescription>
                  Measured in days from order to delivery
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={vendorPerformanceData.map((v, i) => ({ 
                      name: v.name,
                      days: Math.round(30 - (v.deliveryTime * 0.25))
                    }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="days" stroke="#8b5cf6" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Average Response Time</CardTitle>
                <CardDescription>
                  Time to respond to inquiries in hours
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={vendorPerformanceData.map((v, i) => ({ 
                      name: v.name,
                      hours: Math.round(48 - (v.qualityScore * 0.4))
                    }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="hours" stroke="#f59e0b" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Category Tab Content */}
        <TabsContent value="category" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Spend by Category</CardTitle>
                <CardDescription>
                  Distribution of procurement spend across categories
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendByCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {spendByCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Category Growth</CardTitle>
                <CardDescription>
                  Year-over-year growth by category
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={spendByCategoryData.map(cat => ({
                      name: cat.category,
                      growth: Math.round((Math.random() * 30) - 5)
                    }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Growth']} />
                    <Bar dataKey="growth" fill="#3b82f6">
                      {spendByCategoryData.map((cat, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={cat.color}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Category Spend Over Time</CardTitle>
              <CardDescription>
                Tracking spending trends across categories
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={procurementTrendData.map(item => {
                    // Create mock data for spend distribution across categories
                    const total = item.spend;
                    const itEquipment = Math.round(total * 0.35);
                    const officeSupplies = Math.round(total * 0.2);
                    const professionalServices = Math.round(total * 0.25);
                    const logistics = Math.round(total * 0.15);
                    const others = total - itEquipment - officeSupplies - professionalServices - logistics;
                    
                    return {
                      month: item.month,
                      "IT Equipment": itEquipment,
                      "Office Supplies": officeSupplies,
                      "Professional Services": professionalServices,
                      "Logistics": logistics,
                      "Others": others
                    };
                  })}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${(value/1000)}k`} />
                  <Tooltip formatter={(value) => [formatCurrency(value as number), 'Spend']} />
                  <Legend />
                  <Area type="monotone" dataKey="IT Equipment" stackId="1" stroke="#059669" fill="#059669" />
                  <Area type="monotone" dataKey="Office Supplies" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                  <Area type="monotone" dataKey="Professional Services" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                  <Area type="monotone" dataKey="Logistics" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
                  <Area type="monotone" dataKey="Others" stackId="1" stroke="#ef4444" fill="#ef4444" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
