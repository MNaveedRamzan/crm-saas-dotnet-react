import React from 'react';
import type { Customer } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  customers: Customer[];
};

export const CustomersTable: React.FC<Props> = ({ customers }) => {
  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr className="border-b bg-slate-50 text-left">
          <th className="px-3 py-2">Name</th>
          <th className="px-3 py-2">Email</th>
          <th className="px-3 py-2">Company</th>
          <th className="px-3 py-2 text-right">Total Revenue</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((c) => (
          <tr key={c.id} className="border-b last:border-b-0">
            <td className="px-3 py-2">
              <Link
                to={`/customers/${c.id}`}
                className="text-blue-600 hover:underline"
              >
                {c.name}
              </Link>
            </td>
            <td className="px-3 py-2">{c.email}</td>
            <td className="px-3 py-2">{c.company}</td>
            <td className="px-3 py-2 text-right">
              {c.totalRevenue?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              }) || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
