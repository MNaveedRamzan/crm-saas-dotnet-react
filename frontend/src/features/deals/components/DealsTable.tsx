import React from 'react';
import type { Deal } from '../types';
import { dealStatusOptions } from '../utils/dealStatus';


type Props = {
  deals: Deal[];
  onStatusChange: (dealId: number, newStatus: number, oldStatus: number) => void;
};

export const DealsTable: React.FC<Props> = ({ deals, onStatusChange }) => {
  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr className="border-b bg-slate-50 text-left">
          <th className="px-3 py-2">Title</th>
          <th className="px-3 py-2">Customer</th>
          <th className="px-3 py-2 text-right">Amount</th>
          <th className="px-3 py-2">Status</th>
          <th className="px-3 py-2">Close Date</th>
        </tr>
      </thead>
      <tbody>
        {deals.map((d) => (
          <tr key={d.id} className="border-b last:border-b-0">
            <td className="px-3 py-2">{d.title}</td>
            <td className="px-3 py-2">{d.customerName ?? '-'}</td>
            <td className="px-3 py-2 text-right">
              {d.amount.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </td>

            {/* ✅ Inline status dropdown */}
            <td className="px-3 py-2">
              <select
                className="border rounded px-2 py-1 text-sm"
                value={String(d.status)}
                onChange={(e) => {
                  const newStatus = Number(e.target.value);
                  if (newStatus !== d.status) {
                    onStatusChange(d.id, newStatus, d.status);
                  }
                }}
              >
                {dealStatusOptions.map((s) => (
                  <option key={s.value} value={String(s.value)}>
                    {s.label}
                  </option>
                ))}
              </select>
            </td>

            <td className="px-3 py-2">
              {d.closeDate ? new Date(d.closeDate).toLocaleDateString() : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
