import React, { useState } from 'react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import toast from 'react-hot-toast';
import type { CustomerCreateRequest } from '../types';

type Props = {
  initialValues?: CustomerCreateRequest;
  onSubmit: (values: CustomerCreateRequest) => Promise<void>;
  submitting: boolean;
};

const emptyValues: CustomerCreateRequest = {
  name: '',
  email: '',
  phone: '',
  company: '',
};

export const CustomerForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  submitting,
}) => {
  const [values, setValues] = useState<CustomerCreateRequest>(
    initialValues ?? emptyValues
  );
  const [errors, setErrors] = useState<{ [K in keyof CustomerCreateRequest]?: string }>(
    {}
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!values.name.trim()) newErrors.name = 'Name is required';
    if (!values.email.trim()) newErrors.email = 'Email is required';

    if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix form errors');
      return;
    }

    try {
      await onSubmit(values);
      if (!initialValues) {
        // Sirf create mode me clear karein
        setValues(emptyValues);
      }
      toast.success('Customer saved successfully');
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        'Failed to save customer';
      toast.error(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        required
        error={errors.name}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        required
        error={errors.email}
      />
      <Input
        label="Phone"
        name="phone"
        value={values.phone ?? ''}
        onChange={handleChange}
      />
      <Input
        label="Company"
        name="company"
        value={values.company ?? ''}
        onChange={handleChange}
      />

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Saving…' : 'Save Customer'}
      </Button>
    </form>
  );
};
