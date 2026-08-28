import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, LayoutGrid } from 'lucide-react';

import { useApp } from '../../context/useApp';

export interface NavItem {
  key: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    key: 'home',
    label: 'Khu vực',
    path: '/home',
    icon: MapPin,
  },
  {
    key: 'categories',
    label: 'Danh mục',
    path: '/categories',
    icon: LayoutGrid,
  }
];

export const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetFilter } = useApp();

  // Hide bottom nav on:
  // 1. Splash screen ('/')
  // 2. Place list screen ('/place')
  // 3. Category product list screen ('/categories?cat=...')
  const searchParams = new URLSearchParams(location.search);
  const isCategoryListScreen = location.pathname.startsWith('/categories') && searchParams.has('cat');
  const isPlaceListScreen = location.pathname.startsWith('/place');
  const isSplashScreen = location.pathname === '/';

  if (isSplashScreen || isPlaceListScreen || isCategoryListScreen) {
    return null;
  }

  const handleNavClick = (path: string) => {
    resetFilter();
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-3 py-1.5 flex justify-around items-center">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          location.pathname === item.path ||
          (item.path !== '/' && location.pathname.startsWith(item.path));

        return (
          <button
            key={item.key}
            onClick={() => handleNavClick(item.path)}
            className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-200 relative ${
              isActive
                ? 'text-purple-600 font-semibold scale-105'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {/* Active pill background effect */}
            {isActive && (
              <span className="absolute inset-0 bg-purple-50 rounded-xl -z-10 animate-fadeIn" />
            )}
            
            <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
            <span className="text-[11px] mt-0.5 tracking-tight leading-none">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
