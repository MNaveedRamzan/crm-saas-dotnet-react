import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { useAuth } from '../../../hooks/useAuth';

export const RegisterPage: React.FC = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: {
    fullName?: string;
    email: string;
    password: string;
  }) => {
    await register(values);
    // if register returns token we are logged in now
    navigate('/dashboard');
  };

  return (
    <>
      <AuthForm mode="register" onSubmit={handleSubmit} loading={loading} />
      <p className="mt-4 text-xs text-center text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </>
  );
};
