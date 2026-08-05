import React from 'react';

export const EmptyPlaceState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fadeIn">
      <div className="w-48 h-48 mb-4 max-w-[70vw] opacity-85">
        <svg
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <circle cx="120" cy="120" r="100" fill="#F3F4F6" />
          <path
            d="M120 70C92.3858 70 70 92.3858 70 120C70 155 120 190 120 190C120 190 170 155 170 120C170 92.3858 147.614 70 120 70Z"
            fill="#E5E7EB"
            stroke="#9CA3AF"
            strokeWidth="4"
          />
          <circle cx="120" cy="115" r="20" fill="#9CA3AF" />
          <path
            d="M85 85L155 155"
            stroke="#EF4444"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-slate-700">
        Không tìm thấy địa điểm
      </h3>
      <p className="text-xs text-slate-400 mt-1 max-w-xs">
        Vui lòng xoá hoặc điều chỉnh lại bộ lọc để xem các địa điểm khác.
      </p>
    </div>
  );
};
