// Procurement Types
export type PurchaseOrderStatus = 'pending' | 'approved' | 'processing' | 'rejected' | 'delivered';

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendor: string;
  amount: number;
  status: PurchaseOrderStatus;
  date: string;
  items?: PurchaseOrderItem[];
  deliveryDate?: string;
  approver?: string;
}

export interface PurchaseOrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
}

// Vendor Types
export interface Vendor {
  id: string;
  name: string;
  code: string;
  rating: number;
  totalSpend: number;
  ordersCount: number;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  category?: string;
  contractExpiry?: string;
  performanceMetrics?: VendorPerformanceMetrics;
}

export interface VendorPerformanceMetrics {
  deliveryTime: number;
  qualityScore: number;
  responseTime: number;
  contractCompliance: number;
}

// Financial Data Types
export interface FinancialMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
}

export interface SpendByCategory {
  category: string;
  value: number;
  color: string;
}

export interface ProcurementTrend {
  month: string;
  spend: number;
  savings: number;
}

// Dashboard Types
export interface KPI {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  iconBg: string;
  iconColor: string;
}
