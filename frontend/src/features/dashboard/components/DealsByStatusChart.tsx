import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import type { DealsByStatus } from '../api/dashboardApi';

type Props = {
  data: DealsByStatus[];
};

const statusLabels: Record<string, string> = {
  New: "New",
  "In Progress": "In Progress",
  Won: "Won",
  Lost: "Lost",
};

const STATUS_COLORS: Record<string, string> = {
  New: "#3b82f6",
  "In Progress": "#f59e0b",
  Won: "#22c55e",
  Lost: "#ef4444",
};

export const DealsByStatusChart: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-sm text-slate-500">No deals data yet.</div>;
  }

  const chartData = data.map((item) => ({
    status: item.status,
    label: statusLabels[item.status] ?? `Status ${item.status}`,
    count: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
        <XAxis dataKey="label" />
        <YAxis allowDecimals={false} />
        <Tooltip
          formatter={(value: any) => [`${value} deals`, 'Count']}
          labelFormatter={(label) => `Status: ${label}`}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {chartData.map((entry) => (
            <Cell
              key={entry.status}
              fill={STATUS_COLORS[entry.status] ?? '#64748b'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
