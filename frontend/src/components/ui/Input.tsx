import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input: React.FC<Props> = ({ label, error, ...rest }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-xs font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
          error ? 'border-red-500' : 'border-slate-300'
        }`}
        {...rest}
      />
      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};
