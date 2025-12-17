import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
};

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  children,
  ...rest
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-xs font-medium text-slate-700">
          {label}
        </label>
      )}

      <select
        className={`w-full rounded-md border px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-500' : 'border-slate-300'
        }`}
        {...rest}
      >
        {children}
      </select>

      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};
