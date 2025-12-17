import React, { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import type { DealCreateRequest, DealStatus } from '../types';
import { dealStatusOptions, DealStatusEnum } from '../utils/dealStatus';

type DealFormCustomer = {
  id: number;
  name: string;
};

type Props = {
  customers: DealFormCustomer[];
  initialValues?: Partial<DealCreateRequest>;
  onSubmit: (values: DealCreateRequest) => Promise<void>;
  submitting: boolean;
  fixedCustomerId?: number; // when used in CustomerDetail page
};

type Errors = Partial<Record<keyof DealCreateRequest, string>>;

export const DealForm: React.FC<Props> = ({
  customers,
  initialValues,
  onSubmit,
  submitting,
  fixedCustomerId,
}) => {
  const defaultCustomerId = useMemo(() => {
    if (typeof fixedCustomerId === 'number') return fixedCustomerId;
    if (typeof initialValues?.customerId === 'number') return initialValues.customerId;
    return customers[0]?.id ?? 0;
  }, [fixedCustomerId, initialValues?.customerId, customers]);

  const [values, setValues] = useState<DealCreateRequest>({
    customerId: defaultCustomerId,
    title: initialValues?.title ?? '',
    amount: typeof initialValues?.amount === 'number' ? initialValues.amount : 0,
    status:
      typeof initialValues?.status === 'number'
        ? (initialValues.status as DealStatus)
        : (DealStatusEnum.New as DealStatus),
  });

  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const e: Errors = {};

    if (!values.customerId || values.customerId <= 0) e.customerId = 'Customer is required';
    if (!values.title.trim()) e.title = 'Title is required';
    if (Number.isNaN(values.amount) || values.amount <= 0) e.amount = 'Amount must be greater than 0';
    if (values.status === undefined || values.status === null) e.status = 'Status is required';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (!validate()) {
      toast.error('Please fix form errors');
      return;
    }

    try {
      await onSubmit({
        ...values,
        amount: Number(values.amount),
        customerId: Number(values.customerId),
        status: Number(values.status) as DealStatus,
      });

      toast.success('Deal saved successfully');

      // ✅ reset after success (keep customer if fixed)
      setValues((prev) => ({
        customerId: fixedCustomerId ?? prev.customerId,
        title: '',
        amount: 0,
        status: DealStatusEnum.New as DealStatus,
      }));
      setErrors({});
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.title ??
        err?.message ??
        'Failed to save deal';
      toast.error(msg);
    }
  };

  const showCustomerSelect = fixedCustomerId === undefined;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {showCustomerSelect && (
        <div className="space-y-1">
          <Select
            label="Customer"
            value={String(values.customerId)}
            onChange={(e) => {
              const cid = Number(e.target.value);
              setValues((prev) => ({ ...prev, customerId: cid }));
              setErrors((prev) => ({ ...prev, customerId: undefined }));
            }}
          >
            <option value="0" disabled>
              Select customer
            </option>
            {customers.map((c) => (
              <option key={c.id} value={String(c.id)}>
                {c.name}
              </option>
            ))}
          </Select>
          {errors.customerId && <p className="text-xs text-red-600 -mt-2">{errors.customerId}</p>}
        </div>
      )}

      <Input
        label="Title"
        name="title"
        value={values.title}
        onChange={(e) => {
          setValues((prev) => ({ ...prev, title: e.target.value }));
          setErrors((prev) => ({ ...prev, title: undefined }));
        }}
        required
        error={errors.title}
      />

      <Input
        label="Amount"
        name="amount"
        type="number"
        value={String(values.amount)}
        onChange={(e) => {
          const amt = Number(e.target.value);
          setValues((prev) => ({ ...prev, amount: amt }));
          setErrors((prev) => ({ ...prev, amount: undefined }));
        }}
        required
        error={errors.amount}
      />

      <div className="space-y-1">
        <Select
          label="Status"
          value={String(values.status)}
          onChange={(e) => {
            const st = Number(e.target.value) as DealStatus;
            setValues((prev) => ({ ...prev, status: st }));
            setErrors((prev) => ({ ...prev, status: undefined }));
          }}
        >
          {dealStatusOptions.map((s) => (
            <option key={s.value} value={String(s.value)}>
              {s.label}
            </option>
          ))}
        </Select>
        {errors.status && <p className="text-xs text-red-600 -mt-2">{errors.status}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Saving…' : 'Save Deal'}
      </Button>
    </form>
  );
};
