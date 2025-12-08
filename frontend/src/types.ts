export type Customer = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  dealsCount: number;
};

export type DealStatus = 0 | 1 | 2 | 3;

export type Deal = {
  id: number;
  title: string;
  amount: number;
  status: DealStatus;
  customerName?: string;
};
