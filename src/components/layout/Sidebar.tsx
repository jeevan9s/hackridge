// src/components/layout/Sidebar.jsx
import { cn } from '@/lib/utils';
import { LayoutDashboard, BarChart3, User, BellIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom'; // Import NavLink

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Analytics', path: '/' },
  { icon: BarChart3, label: 'Goals', path: '/analytics' },
  { icon: User, label: 'Info', path: '/info' },
  {icon: BellIcon, label: 'Alert', path: '/alert' }
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/30 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={cn(
          'fixed z-50 flex h-full w-64 flex-col border-r bg-zinc-300 backdrop-blur supports-[backdrop-filter]:bg-background/30 transition-transform duration-200 ease-in-out md:static md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <h2 className="text-lg font-semibold">AllHealth</h2>
        </div>

        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'text-black font-medium flex items-center justify-start gap-3 px-3 py-2 rounded hover:bg-blue-50 ',
                    isActive ? 'bg-gray-200 font-semibold' : ''
                  )
                }
                onClick={onClose} // Close sidebar on link click (useful for mobile)
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
