// Backend enum = int
export type DealStatus = 0 | 1 | 2 | 3;
// 0 = New, 1 = In Progress, 2 = Won, 3 = Lost

export type Deal = {
  id: number;
  title: string;
  amount: number;
  status: DealStatus;
  customerId: number;
  customerName?: string;
  closeDate?: string;
};

export type CreateDealDto = {
  title: string;
  amount: number;
  status: DealStatus;
  customerId: number;
  closeDate?: string;
};

export type DealCreateRequest = {
  customerId: number;
  title: string;
  amount: number;
  status: DealStatus;
};
