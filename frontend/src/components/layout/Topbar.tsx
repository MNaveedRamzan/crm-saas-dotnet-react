import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export const Topbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-14 bg-slate-900 text-slate-100 flex items-center justify-between px-4 border-b border-slate-800">
      {/* Left side – App name */}
      <div className="font-semibold tracking-tight">
        CRM SaaS <span className="text-xs text-slate-400 ml-1">(.NET + React)</span>
      </div>

      {/* Right side – User info + Logout */}
      <div className="flex items-center gap-4">
        {user && (
          <div className="text-right text-xs leading-tight">
            <div className="font-medium text-sm">
              {user.fullName ?? user.email}
            </div>
            {user.role && (
              <div className="text-slate-400 capitalize">
                {user.role.toLowerCase()}
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={logout}
          className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-md border border-slate-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
