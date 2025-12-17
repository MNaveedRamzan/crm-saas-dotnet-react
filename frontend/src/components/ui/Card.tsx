import React from 'react';

type CardProps = {
  title?: string;
  children: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-4">
      {title && (
        <h2 className="text-lg font-semibold text-slate-800 mb-3">{title}</h2>
      )}
      {children}
    </div>
  );
};
