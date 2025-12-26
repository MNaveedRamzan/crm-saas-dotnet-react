import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { Card } from '../../../components/ui/Card';
import { getCustomerById } from '../api/customersApi';
import type { Customer } from '../types';

import { DealsTable } from '../../deals/components/DealsTable';
import { DealForm } from '../../deals/components/DealForm';
import { createDeal, getDealsForCustomer } from '../../deals/api/dealsApi';
import type { Deal, DealCreateRequest } from '../../deals/types';

// ✅ Optional: Notes (agar tumne notesApi.ts banaya hai)
// import {
//   getCustomerNotes,
//   addCustomerNote,
//   deleteCustomerNote,
//   type CustomerNote,
// } from '../api/notesApi';

export const CustomerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const customerId = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [id]);

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // ✅ Optional: Notes state
  // const [notes, setNotes] = useState<CustomerNote[]>([]);
  // const [noteText, setNoteText] = useState('');
  // const [loadingNotes, setLoadingNotes] = useState(false);

  const load = async () => {
    if (!customerId) return;

    setLoading(true);
    setLoadError(null);

    try {
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
            custRes.reason?.response?.data ??
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
            dealsRes.reason?.response?.data ??
            dealsRes.reason?.message ??
            'Failed to load deals') as string;
        setLoadError((prev) => prev ?? msg);
        console.error('getDealsForCustomer failed:', dealsRes.reason);
      }
    } finally {
      setLoading(false);
    }
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

      toast.success('Deal created');

      // ✅ optional refresh
      load().catch(() => {});
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data ??
        err?.message ??
        'Failed to create deal';
      toast.error(String(msg));
      console.error('createDeal failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!customerId) return <div className="p-4">Invalid customer.</div>;

  return (
    <div className="space-y-4">
      {loadError && (
        <Card title="Load Error">
          <div className="text-sm text-red-600">{loadError}</div>
          <div className="text-xs text-slate-500 mt-1">
            Console me check karo: customer API fail hua ya deals API.
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
          <div className="text-sm text-slate-500">
            No deals for this customer.
          </div>
        )}
      </Card>

      {/* ✅ OPTIONAL: Notes & Activities (agar notesApi.ts ready ho to bol do, main yahan enable kara dunga) */}
    </div>
  );
};
