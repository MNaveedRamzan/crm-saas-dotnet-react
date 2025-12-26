import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { CustomersTable } from '../components/CustomersTable';
import { CustomerForm } from '../components/CustomerForm';
import { getCustomers, createCustomer } from '../api/customersApi';
import type { Customer, CreateCustomerDto } from '../types';

export const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (data: CreateCustomerDto) => {
  setSubmitting(true);
  try {
    await createCustomer(data);
    // reload list etc...
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="space-y-4">
      <Card title="Add Customer">
       <CustomerForm onSubmit={handleCreate} submitting={submitting} />

      </Card>
      <Card title="Customers">
        {loading ? (
          <div>Loading...</div>
        ) : customers.length ? (
          <CustomersTable customers={customers} />
        ) : (
          <div className="text-sm text-slate-500">No customers yet.</div>
        )}
      </Card>
    </div>
  );
};
