import type { Deal } from "../types";

const statusCopy = {
  0: { label: "New", tone: "neutral" },
  1: { label: "In progress", tone: "warning" },
  2: { label: "Won", tone: "success" },
  3: { label: "Lost", tone: "muted" },
} as const;

interface Props {
  data: Deal[];
  loading: boolean;
  error: string | null;
}

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function DealList({ data, loading, error }: Props) {
  if (loading) return <p className="muted">Loading deals...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map(deal => (
            <tr key={deal.id}>
              <td>
                <div className="cell-stack">
                  <strong>{deal.title}</strong>
                  <span className="muted">ID #{deal.id}</span>
                </div>
              </td>
              <td>{deal.customerName}</td>
              <td>{currency.format(deal.amount)}</td>
              <td>
                <span className={`pill ${statusCopy[deal.status].tone}`}>
                  {statusCopy[deal.status].label}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
