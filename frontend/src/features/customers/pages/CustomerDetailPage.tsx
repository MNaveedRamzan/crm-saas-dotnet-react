import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { getCustomerById } from '../api/customersApi';
import type { Customer } from '../types';
import { DealsTable } from '../../deals/components/DealsTable';
import { DealForm } from '../../deals/components/DealForm';
import { createDeal, getDealsForCustomer } from '../../deals/api/dealsApi';
import type { Deal, DealCreateRequest } from '../../deals/types';

export const CustomerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const customerId = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? n : 0;
  }, [id]);

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const load = async () => {
    if (!customerId) return;

    setLoading(true);
    setLoadError(null);

    const [custRes, dealsRes] = await Promise.allSettled([
      getCustomerById(customerId),
      getDealsForCustomer(customerId),
    ]);

    if (custRes.status === 'fulfilled') {
      setCustomer(custRes.value);
    } else {
      setCustomer(null);
      const msg =
        (custRes.reason?.response?.data?.message ??
          custRes.reason?.message ??
          'Failed to load customer') as string;
      setLoadError((prev) => prev ?? msg);
      console.error('getCustomerById failed:', custRes.reason);
    }

    if (dealsRes.status === 'fulfilled') {
      setDeals(dealsRes.value);
    } else {
      setDeals([]);
      const msg =
        (dealsRes.reason?.response?.data?.message ??
          dealsRes.reason?.message ??
          'Failed to load deals') as string;
      setLoadError((prev) => prev ?? msg);
      console.error('getDealsForCustomer failed:', dealsRes.reason);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

 const handleAddDeal = async (data: DealCreateRequest) => {
  if (!customerId) return;

  setSubmitting(true);
  try {
    const created = await createDeal({ ...data, customerId });

    // ✅ optimistic add
    setDeals((prev) => [created, ...prev]);

    // optional: background refresh (silently)
    load().catch(() => {});
  } finally {
    setSubmitting(false);
  }
};

  if (!customerId) return <div>Invalid customer.</div>;

  return (
    <div className="space-y-4">
      {loadError && (
        <Card title="Load Error">
          <div className="text-sm text-red-600">{loadError}</div>
          <div className="text-xs text-slate-500 mt-1">
            Check console to see which API failed (customer or deals).
          </div>
        </Card>
      )}

      <Card title="Customer Details">
        {loading && !customer ? (
          <div>Loading...</div>
        ) : customer ? (
          <div className="text-sm space-y-1">
            <div className="text-lg font-semibold">{customer.name}</div>
            {customer.company && <div>Company: {customer.company}</div>}
            {customer.email && <div>Email: {customer.email}</div>}
            {customer.phone && <div>Phone: {customer.phone}</div>}
          </div>
        ) : (
          <div>Customer not found.</div>
        )}
      </Card>

      <Card title="Add Deal for this Customer">
        <DealForm
          customers={customer ? [customer] : []}
          fixedCustomerId={customerId}
          onSubmit={handleAddDeal}
          submitting={submitting}
        />
      </Card>

      <Card title="Deals">
        {loading ? (
          <div>Loading...</div>
        ) : deals.length ? (
          <DealsTable deals={deals} />
        ) : (
          <div className="text-sm text-slate-500">No deals for this customer.</div>
        )}
      </Card>
    </div>
  );
};
