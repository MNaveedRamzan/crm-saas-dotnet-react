import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from 'recharts';
import type { TopCustomer } from '../api/dashboardApi';

type Props = {
  data: TopCustomer[];
};

export const TopCustomersChart: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-sm text-slate-500">No top customers yet.</div>;
  }

  // Top 5 customers only
  const chartData = [...data]
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 5)
    .map((item) => ({
      name: item.customerName,
      amount: item.totalAmount,
    }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
      >
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" width={100} />
        <Tooltip
          formatter={(value: any) =>
            [
              (value as number).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              }),
              'Revenue',
            ]
          }
        />
        <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
          <LabelList
            dataKey="amount"
            position="right"
            formatter={(value: any) =>
              (value as number).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })
            }
            className="text-xs"
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
