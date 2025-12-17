export type Customer = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
};

export type CustomerCreateRequest = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
};
