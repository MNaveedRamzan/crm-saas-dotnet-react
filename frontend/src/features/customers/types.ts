export type Customer = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  totalRevenue?: number;
};

export type CustomerCreateRequest = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
};

export type CreateCustomerDto = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
};