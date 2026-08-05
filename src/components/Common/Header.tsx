import React from 'react';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onFilterClick?: () => void;
  isFilterActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = true,
  onFilterClick,
  isFilterActive = false,
}) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-3 border-b border-slate-100 shadow-sm">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-lg font-bold text-slate-900 tracking-tight line-clamp-1">
          {title}
        </h1>
      </div>

      {onFilterClick && (
        <button
          onClick={onFilterClick}
          className="relative p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
          aria-label="Filter"
        >
          <SlidersHorizontal className="w-5 h-5 text-slate-700" />
          {isFilterActive && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
          )}
        </button>
      )}
    </header>
  );
};
