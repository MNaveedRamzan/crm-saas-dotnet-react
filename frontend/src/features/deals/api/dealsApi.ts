import { apiClient } from '../../../lib/apiClient';
import type { CreateDealDto, Deal } from '../types';

export type PagedResult<T> = {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export async function getDealsPaged(params: {
  page: number;
  pageSize: number;
  customerId?: number;
  status?: number;
  q?: string;
}): Promise<PagedResult<Deal>> {
  const res = await apiClient.get('/deals', { params });
  return res.data;
}

// Keep for customer detail (server-side filter)
export async function getDealsForCustomer(customerId: number) {
  const res = await apiClient.get('/deals', {
    params: { page: 1, pageSize: 100, customerId },
  });
  return res.data?.items ?? res.data;
}

// ✅ Now backend returns DealDto in response body
export async function createDeal(data: CreateDealDto): Promise<Deal> {
  const res = await apiClient.post('/deals', data);
  return res.data;
}

export async function updateDealStatus(
  dealId: number,
  status: number,
): Promise<void> {
  await apiClient.patch(`/deals/${dealId}/status`, { status });
}
