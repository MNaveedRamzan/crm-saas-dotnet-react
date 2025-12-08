import type { Customer } from "../types";

interface Props {
  data: Customer[];
  loading: boolean;
  error: string | null;
}

export function CustomerList({ data, loading, error }: Props) {
  if (loading) return <p className="muted">Loading customers...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Deals</th>
          </tr>
        </thead>
        <tbody>
          {data.map(customer => (
            <tr key={customer.id}>
              <td>
                <div className="cell-stack">
                  <strong>{customer.name}</strong>
                  <span className="muted">ID #{customer.id}</span>
                </div>
              </td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.company}</td>
              <td>
                <span className="pill neutral">{customer.dealsCount} deals</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
