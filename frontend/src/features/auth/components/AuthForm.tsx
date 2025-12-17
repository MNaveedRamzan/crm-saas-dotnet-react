import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

type Props = {
  mode: 'login' | 'register';
  onSubmit: (values: { fullName?: string; email: string; password: string }) => Promise<void>;
  loading: boolean;
};

export const AuthForm: React.FC<Props> = ({ mode, onSubmit, loading }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isRegister = mode === 'register';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await onSubmit({ fullName: isRegister ? fullName : undefined, email, password });

      // optional: on success, clear password (and fullName on register)
      setPassword('');
      if (isRegister) setFullName('');
    } catch (err: any) {
      // keep email, clear password ✅
      setPassword('');

      // show toast if parent didn't show it
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.title ??
        err?.message ??
        (isRegister ? 'Registration failed' : 'Invalid email or password');
      toast.error(msg);

      // focus behavior ✅
      setTimeout(() => {
        const emailEl = document.getElementById('auth-email') as HTMLInputElement | null;
        const passEl = document.getElementById('auth-password') as HTMLInputElement | null;

        if (!email?.trim()) {
          emailEl?.focus();
          emailEl?.select?.();
        } else {
          passEl?.focus();
        }
      }, 0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {isRegister && (
        <Input
          label="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      )}

      <Input
        id="auth-email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        id="auth-password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Please wait…' : isRegister ? 'Register' : 'Login'}
      </Button>
    </form>
  );
};
