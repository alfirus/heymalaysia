'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MapPin, Calendar, Megaphone, Users, History, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { clsx } from 'clsx';

const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Places', href: '/places', icon: MapPin },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Ads', href: '/ads', icon: Megaphone },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'History', href: '/history', icon: History },
  ];

  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-gray-900 border-r border-gray-800">
      <div className="flex items-center justify-center mb-10">
        <h1 className="text-2xl font-bold text-white">Hey Malaysia</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center px-4 py-3 text-sm font-medium transition-colors rounded-lg',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-red-900/50 hover:text-red-400"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
