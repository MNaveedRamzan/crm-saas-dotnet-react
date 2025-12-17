import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { useAuth } from '../../../hooks/useAuth';

export const LoginPage: React.FC = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const from = location.state?.from?.pathname || '/dashboard';

const handleSubmit = async (values: { email: string; password: string }) => {
  const ok = await login(values.email, values.password);
  if (ok) {
    navigate(from, { replace: true });
  }
};
  return (
    <>
      <AuthForm mode="login" onSubmit={handleSubmit} loading={loading} />
      <p className="mt-4 text-xs text-center text-slate-600">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </>
  );
};
