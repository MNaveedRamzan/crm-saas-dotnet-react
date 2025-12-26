import { apiClient } from '../../../lib/apiClient';

export type CustomerNote = {
  id: number;
  customerId: number;
  note: string;
  createdAtUtc: string;
};

export async function getCustomerNotes(customerId: number) {
  const res = await apiClient.get<CustomerNote[]>(`/customers/${customerId}/notes`);
  return res.data;
}

export async function addCustomerNote(customerId: number, note: string) {
  const res = await apiClient.post<CustomerNote>(`/customers/${customerId}/notes`, { note });
  return res.data;
}

export async function deleteCustomerNote(customerId: number, noteId: number) {
  await apiClient.delete(`/customers/${customerId}/notes/${noteId}`);
}
