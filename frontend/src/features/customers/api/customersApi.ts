import { apiClient } from '../../../lib/apiClient';
import type { Customer, CustomerCreateRequest } from '../types';

// 🔧 Adjust routes & DTOs to your ASP.NET controllers
export async function getCustomers(): Promise<Customer[]> {
  const res = await apiClient.get('/customers');
  return res.data;
}

export async function getCustomerById(id: number): Promise<Customer> {
  const res = await apiClient.get(`/customers/${id}`);
  return res.data;
}

export async function createCustomer(data: CustomerCreateRequest): Promise<Customer> {
  const res = await apiClient.post('/customers', data);
  return res.data;
}
