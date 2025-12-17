import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Card } from '../../../components/ui/Card';
import { getDashboardSummary, type DealsByStatus, type TopCustomer } from '../api/dashboardApi';

// 👇 Lazy imports (no require)
const DealsByStatusChartLazy = lazy(() =>
  import('../components/DealsByStatusChart').then((mod) => ({
    default: mod.DealsByStatusChart,
  })),
);

const TopCustomersChartLazy = lazy(() =>
  import('../components/TopCustomersChart').then((mod) => ({
    default: mod.TopCustomersChart,
  })),
);

export const DashboardPage: React.FC = () => {
  const [dealsByStatus, setDealsByStatus] = useState<DealsByStatus[]>([]);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalDeals, setTotalDeals] = useState(0);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const summary = await getDashboardSummary();
        setDealsByStatus(summary.dealsByStatus);
        setTopCustomers(summary.topCustomers);
        setTotalDeals(summary.totalDeals);
        setTotalRevenue(summary.totalRevenue);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-4">
      {/* Top stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Deals">
          <div className="text-2xl font-bold">{totalDeals}</div>
        </Card>
        <Card title="Total Revenue">
          <div className="text-2xl font-bold">
            {totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </div>
        </Card>
        <Card title="Top Customers Count">
          <div className="text-2xl font-bold">{topCustomers.length}</div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Deals by Status">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="h-64 w-full">
              <Suspense fallback={<div>Loading chart...</div>}>
                <DealsByStatusChartLazy data={dealsByStatus} />
              </Suspense>
            </div>
          )}
        </Card>

        <Card title="Top Customers by Revenue">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="h-64 w-full">
              <Suspense fallback={<div>Loading chart...</div>}>
                <TopCustomersChartLazy data={topCustomers} />
              </Suspense>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
