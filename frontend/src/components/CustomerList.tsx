import { useEffect, useState } from "react";
import api from "../api";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  dealsCount: number;
};

export function CustomerList() {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Customer[]>("/customers")
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading customers...</p>;

  return (
    <div>
      <h2>Customers</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Company</th><th>Deals</th>
          </tr>
        </thead>
        <tbody>
          {data.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.company}</td>
              <td>{c.dealsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
