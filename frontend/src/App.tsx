import { useEffect, useMemo, useState } from "react";
import api from "./api";
import { CustomerList } from "./components/CustomerList";
import { DealList } from "./components/DealList";
import type { Deal, Customer } from "./types";
import "./App.css";

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([api.get<Customer[]>("/customers"), api.get<Deal[]>("/deals")])
      .then(([customersRes, dealsRes]) => {
        setCustomers(customersRes.data);
        setDeals(dealsRes.data);
      })
      .catch(() => setError("We couldn't load the latest CRM data."))
      .finally(() => setLoading(false));
  }, []);

  const metrics = useMemo(() => {
    const totalPipeline = deals.reduce((sum, deal) => sum + deal.amount, 0);
    const wonValue = deals
      .filter(d => d.status === 2)
      .reduce((sum, deal) => sum + deal.amount, 0);
    const openDeals = deals.filter(d => d.status === 0 || d.status === 1);
    const avgDeal = deals.length ? totalPipeline / deals.length : 0;
    const topCustomer = customers.reduce<{ name: string; deals: number } | null>(
      (current, next) => {
        if (!current || next.dealsCount > current.deals) {
          return { name: next.name, deals: next.dealsCount };
        }
        return current;
      },
      null
    );

    return {
      totalPipeline,
      wonValue,
      openDeals: openDeals.length,
      avgDeal,
      topCustomer,
    };
  }, [customers, deals]);

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">CRM SaaS demo</p>
          <h1>Sales cockpit with pipeline health</h1>
          <p className="lede">
            Track customers, deals, and revenue momentum in one place. These realtime
            cards make it easy to tell the product story in a demo.
          </p>
        </div>
        <div className="hero-badge">
          <span className="dot" /> Live snapshot
        </div>
      </header>

      <section className="metrics">
        <div className="metric-card">
          <p>Pipeline value</p>
          <h3>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(metrics.totalPipeline)}</h3>
          <small>All deals combined</small>
        </div>
        <div className="metric-card">
          <p>Won this cycle</p>
          <h3>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(metrics.wonValue)}</h3>
          <small>Closed revenue</small>
        </div>
        <div className="metric-card">
          <p>Open deals</p>
          <h3>{metrics.openDeals}</h3>
          <small>New + In progress</small>
        </div>
        <div className="metric-card">
          <p>Avg. deal size</p>
          <h3>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(metrics.avgDeal)}</h3>
          <small>Across the full pipeline</small>
        </div>
      </section>

      <section className="grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Team focus</p>
              <h2>Customers</h2>
            </div>
            {metrics.topCustomer && (
              <div className="tag">Top: {metrics.topCustomer.name}</div>
            )}
          </div>
          <CustomerList data={customers} loading={loading} error={error} />
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Momentum</p>
              <h2>Deals</h2>
            </div>
            <div className="tag">Live pipeline</div>
          </div>
          <DealList data={deals} loading={loading} error={error} />
        </div>
      </section>
    </div>
  );
}

export default App;
