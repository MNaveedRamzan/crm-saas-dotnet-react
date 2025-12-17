import { apiClient } from '../../../lib/apiClient';

export type DealsByStatus = {
  status: string;
  count: number;
};

export type TopCustomer = {
  customerName: string;
  totalAmount: number;
};

export type DashboardSummary = {
  totalDeals: number;
  totalRevenue: number;
  dealsByStatus: DealsByStatus[];
  topCustomers: TopCustomer[];
};

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const res = await apiClient.get('/dashboard/summary');
  return res.data;
}
