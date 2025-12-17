import React from 'react';
import { NavLink } from 'react-router-dom';

const navLinkClass =
  'block px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-700/40';
const activeClass = 'bg-slate-800 text-white';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col">
      <div className="p-4 text-lg font-bold border-b border-slate-700">
        CRM SaaS
      </div>
      <nav className="flex-1 p-3 space-y-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${navLinkClass} ${isActive ? activeClass : ''}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/customers"
          className={({ isActive }) =>
            `${navLinkClass} ${isActive ? activeClass : ''}`
          }
        >
          Customers
        </NavLink>
        <NavLink
          to="/deals"
          className={({ isActive }) =>
            `${navLinkClass} ${isActive ? activeClass : ''}`
          }
        >
          Deals
        </NavLink>
      </nav>
    </aside>
  );
};
