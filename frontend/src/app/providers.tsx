import React from 'react';
import { AuthProvider } from '../hooks/useAuth';

type Props = {
  children: React.ReactNode;
};

export const AppProviders: React.FC<Props> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
