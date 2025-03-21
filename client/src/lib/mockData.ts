import { 
  KPI, 
  PurchaseOrder, 
  Vendor, 
  SpendByCategory, 
  ProcurementTrend 
} from '@/types';

// KPI Data
export const kpiData: KPI[] = [
  {
    id: '1',
    title: 'Total Procurement Spend',
    value: '$2,458,400',
    change: 8.2,
    changeType: 'increase',
    icon: 'dollar-circle',
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400'
  },
  {
    id: '2',
    title: 'Cost Savings Achieved',
    value: '$348,200',
    change: 12.5,
    changeType: 'increase',
    icon: 'line-chart',
    iconBg: 'bg-amber-50 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400'
  },
  {
    id: '3',
    title: 'Average Vendor Rating',
    value: '4.6/5.0',
    change: 0.3,
    changeType: 'increase',
    icon: 'star',
    iconBg: 'bg-blue-50 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: '4',
    title: 'Pending Approvals',
    value: '24',
    change: 5,
    changeType: 'increase',
    icon: 'time',
    iconBg: 'bg-red-50 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400'
  }
];

// Procurement Trend Data
export const procurementTrendData: ProcurementTrend[] = [
  { month: 'Jan', spend: 320000, savings: 42000 },
  { month: 'Feb', spend: 410000, savings: 55000 },
  { month: 'Mar', spend: 380000, savings: 48000 },
  { month: 'Apr', spend: 450000, savings: 60000 },
  { month: 'May', spend: 410000, savings: 58000 },
  { month: 'Jun', spend: 488400, savings: 85200 }
];

// Spend by Category Data
export const spendByCategoryData: SpendByCategory[] = [
  { category: 'IT Equipment', value: 35, color: '#059669' },
  { category: 'Office Supplies', value: 20, color: '#f59e0b' },
  { category: 'Professional Services', value: 25, color: '#3b82f6' },
  { category: 'Logistics', value: 15, color: '#8b5cf6' },
  { category: 'Others', value: 5, color: '#ef4444' }
];

// Recent Purchase Orders
export const recentPurchaseOrders: PurchaseOrder[] = [
  {
    id: '1',
    poNumber: 'PO-2023-8842',
    vendor: 'Acme Supplies',
    amount: 24500,
    status: 'approved',
    date: 'Jul 12, 2023'
  },
  {
    id: '2',
    poNumber: 'PO-2023-8840',
    vendor: 'TechVision Inc',
    amount: 18750,
    status: 'processing',
    date: 'Jul 10, 2023'
  },
  {
    id: '3',
    poNumber: 'PO-2023-8835',
    vendor: 'Global Logistics',
    amount: 32120,
    status: 'pending',
    date: 'Jul 8, 2023'
  },
  {
    id: '4',
    poNumber: 'PO-2023-8830',
    vendor: 'Maxtech Solutions',
    amount: 9840,
    status: 'rejected',
    date: 'Jul 5, 2023'
  }
];

// All Purchase Orders (for procurement page)
export const allPurchaseOrders: PurchaseOrder[] = [
  ...recentPurchaseOrders,
  {
    id: '5',
    poNumber: 'PO-2023-8825',
    vendor: 'Office Depot',
    amount: 5320,
    status: 'delivered',
    date: 'Jul 2, 2023'
  },
  {
    id: '6',
    poNumber: 'PO-2023-8822',
    vendor: 'Acme Supplies',
    amount: 18250,
    status: 'delivered',
    date: 'Jun 28, 2023'
  },
  {
    id: '7',
    poNumber: 'PO-2023-8815',
    vendor: 'Global Logistics',
    amount: 27800,
    status: 'delivered',
    date: 'Jun 25, 2023'
  },
  {
    id: '8',
    poNumber: 'PO-2023-8812',
    vendor: 'TechVision Inc',
    amount: 34650,
    status: 'delivered',
    date: 'Jun 22, 2023'
  }
];

// Top Vendors
export const topVendors: Vendor[] = [
  {
    id: '1',
    name: 'Acme Supplies',
    code: 'AS',
    rating: 5.0,
    totalSpend: 458200,
    ordersCount: 32
  },
  {
    id: '2',
    name: 'TechVision Inc',
    code: 'TV',
    rating: 4.5,
    totalSpend: 345600,
    ordersCount: 28
  },
  {
    id: '3',
    name: 'Global Logistics',
    code: 'GL',
    rating: 4.0,
    totalSpend: 289450,
    ordersCount: 23
  },
  {
    id: '4',
    name: 'Maxtech Solutions',
    code: 'MS',
    rating: 3.5,
    totalSpend: 198320,
    ordersCount: 18
  }
];

// All Vendors (for vendors page)
export const allVendors: Vendor[] = [
  ...topVendors,
  {
    id: '5',
    name: 'Office Depot',
    code: 'OD',
    rating: 4.2,
    totalSpend: 175650,
    ordersCount: 15,
    category: 'Office Supplies',
    contactName: 'Sarah Johnson',
    email: 'sarah@officedepot.com',
    phone: '(555) 123-4567',
    contractExpiry: '2024-05-15'
  },
  {
    id: '6',
    name: 'Logistics Pro',
    code: 'LP',
    rating: 3.8,
    totalSpend: 142300,
    ordersCount: 12,
    category: 'Logistics',
    contactName: 'Mike Peters',
    email: 'mike@logisticspro.com',
    phone: '(555) 234-5678',
    contractExpiry: '2023-12-31'
  },
  {
    id: '7',
    name: 'Quality IT Services',
    code: 'QI',
    rating: 4.4,
    totalSpend: 134890,
    ordersCount: 10,
    category: 'IT Equipment',
    contactName: 'Jessica Lee',
    email: 'jessica@qualityit.com',
    phone: '(555) 345-6789',
    contractExpiry: '2024-03-22'
  },
  {
    id: '8',
    name: 'Premier Consulting',
    code: 'PC',
    rating: 4.7,
    totalSpend: 128500,
    ordersCount: 8,
    category: 'Professional Services',
    contactName: 'David Wilson',
    email: 'david@premierconsulting.com',
    phone: '(555) 456-7890',
    contractExpiry: '2024-01-15'
  }
];

// Vendor Performance Metrics
export const vendorPerformanceMetrics = {
  deliveryTime: {
    'Acme Supplies': 95,
    'TechVision Inc': 92,
    'Global Logistics': 88,
    'Maxtech Solutions': 82,
    'Office Depot': 90,
    'Logistics Pro': 85,
    'Quality IT Services': 93,
    'Premier Consulting': 96
  },
  qualityScore: {
    'Acme Supplies': 98,
    'TechVision Inc': 94,
    'Global Logistics': 88,
    'Maxtech Solutions': 85,
    'Office Depot': 92,
    'Logistics Pro': 84,
    'Quality IT Services': 95,
    'Premier Consulting': 97
  }
};
