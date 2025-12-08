import { useEffect, useState } from "react";
import api from "../api";

type Deal = {
  id: number;
  title: string;
  amount: number;
  status: number;
  customerName?: string;
};

export function DealList() {
  const [data, setData] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Deal[]>("/deals")
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading deals...</p>;

  return (
    <div>
      <h2>Deals</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th><th>Customer</th><th>Amount</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.id}>
              <td>{d.title}</td>
              <td>{d.customerName}</td>
              <td>{d.amount}</td>
              <td>{d.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
