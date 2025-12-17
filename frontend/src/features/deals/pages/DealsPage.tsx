import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { getApiErrorMessage } from '../../../lib/apiError';

import { Card } from '../../../components/ui/Card';
import { DealsTable } from '../components/DealsTable';
import { DealForm } from '../components/DealForm';

import { createDeal, getDealsPaged, updateDealStatus } from '../api/dealsApi';
import { getCustomers } from '../../customers/api/customersApi';

import type { CreateDealDto, Deal, DealStatus } from '../types';
import type { Customer } from '../../customers/types';

import { dealStatusOptions } from '../utils/dealStatus';
import { useDebounce } from '../../../hooks/useDebounce';

export const DealsPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ paging
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  // ✅ filters
  const [q, setQ] = useState('');
  const debouncedQ = useDebounce(q, 500);

  const [customerId, setCustomerId] = useState<number | ''>('');
  const [status, setStatus] = useState<number | ''>('');

  const customerOptions = useMemo(
    () => customers.map((c) => ({ id: c.id, name: c.name })),
    [customers],
  );

  const load = async (pageToLoad = page) => {
    setLoading(true);
    try {
      const [paged, c] = await Promise.all([
        getDealsPaged({
          page: pageToLoad,
          pageSize,
          q: debouncedQ.trim() ? debouncedQ.trim() : undefined,
          customerId: customerId === '' ? undefined : customerId,
          status: status === '' ? undefined : status,
        }),
        getCustomers(),
      ]);

      setDeals(paged.items);
      setTotalCount(paged.totalCount);
      setCustomers(c);

      const newTotalPages = Math.max(1, Math.ceil(paged.totalCount / pageSize));
      if (pageToLoad > newTotalPages) setPage(newTotalPages);
    } finally {
      setLoading(false);
    }
  };

  // paging changes
  useEffect(() => {
    load(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // filters/pageSize change → reset to page 1 and reload
  useEffect(() => {
    setPage(1);
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ, customerId, status, pageSize]);

  // ✅ Optimistic create (no full reload)
  const handleCreate = async (data: CreateDealDto) => {
    const created = await createDeal(data);

    const queryTerm = debouncedQ.trim().toLowerCase();

    const matchesCustomer = customerId === '' || created.customerId === customerId;
    const matchesStatus = status === '' || Number(created.status) === status;

    const matchesQuery =
      !queryTerm ||
      created.title.toLowerCase().includes(queryTerm) ||
      (created.customerName ?? '').toLowerCase().includes(queryTerm);

    const matchesCurrentView = matchesCustomer && matchesStatus && matchesQuery;

    if (matchesCurrentView) {
      setPage(1);
      setDeals((prev) => [created, ...prev].slice(0, pageSize));
      setTotalCount((prev) => prev + 1);
    }
  };

  // ✅ Optimistic status update + rollback
  const handleStatusChange = async (dealId: number, newStatus: number, oldStatus: number) => {
    // optimistic update
    setDeals((prev) =>
      prev.map((d) =>
        d.id === dealId ? { ...d, status: newStatus as DealStatus } : d,
      ),
    );

    try {
      await updateDealStatus(dealId, newStatus);
      toast.success('Status updated');
    } catch (err) {
  setDeals((prev) =>
    prev.map((d) =>
      d.id === dealId ? { ...d, status: oldStatus as DealStatus } : d,
    ),
  );
  toast.error(getApiErrorMessage(err));
}

  };

  const resetFilters = () => {
    setQ('');
    setCustomerId('');
    setStatus('');
  };

  return (
    <div className="space-y-4">
      <Card title="Add Deal">
        <DealForm customers={customerOptions} onSubmit={handleCreate} submitting={loading} />
      </Card>

      <Card title="Deals">
        {/* Filters */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-4">
          <div className="flex flex-col md:flex-row gap-3 w-full">
            {/* Search */}
            <div className="w-full md:w-72">
              <label className="block text-xs mb-1 text-slate-600">Search</label>
              <input
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Search by title or customer..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            {/* Customer filter */}
            <div className="w-full md:w-64">
              <label className="block text-xs mb-1 text-slate-600">Customer</label>
              <select
                className="w-full border rounded px-3 py-2 text-sm"
                value={customerId === '' ? '' : String(customerId)}
                onChange={(e) => {
                  const v = e.target.value;
                  setCustomerId(v === '' ? '' : Number(v));
                }}
              >
                <option value="">All customers</option>
                {customerOptions.map((c) => (
                  <option key={c.id} value={String(c.id)}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status filter */}
            <div className="w-full md:w-56">
              <label className="block text-xs mb-1 text-slate-600">Status</label>
              <select
                className="w-full border rounded px-3 py-2 text-sm"
                value={status === '' ? '' : String(status)}
                onChange={(e) => {
                  const v = e.target.value;
                  setStatus(v === '' ? '' : Number(v));
                }}
              >
                <option value="">All statuses</option>
                {dealStatusOptions.map((s) => (
                  <option key={s.value} value={String(s.value)}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="px-3 py-2 border rounded text-sm" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div>Loading...</div>
        ) : deals.length ? (
          <div className="space-y-3">
            <DealsTable deals={deals} onStatusChange={handleStatusChange} />

            {/* Pagination */}
            <div className="flex items-center justify-between text-sm">
              <div className="text-slate-600">
                Page {page} of {totalPages} • {totalCount} deals
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-600">Rows per page</span>
                <select
                  className="border rounded px-2 py-1 text-sm"
                  value={String(pageSize)}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  className="px-3 py-1 border rounded disabled:opacity-50"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Prev
                </button>
                <button
                  className="px-3 py-1 border rounded disabled:opacity-50"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-500">No deals found.</div>
        )}
      </Card>
    </div>
  );
};
