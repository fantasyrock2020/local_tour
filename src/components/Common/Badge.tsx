import React from 'react';
import { PlaceOpenStatusEnum } from '../../types/place';

interface PlaceStatusBadgeProps {
  status: PlaceOpenStatusEnum;
}

export const PlaceStatusBadge: React.FC<PlaceStatusBadgeProps> = ({ status }) => {
  if (status === PlaceOpenStatusEnum.UNKNOWN) return null;

  const getStyle = () => {
    switch (status) {
      case PlaceOpenStatusEnum.OPEN:
      case PlaceOpenStatusEnum.OPEN_24H:
        return {
          label: 'Open',
          bg: 'bg-[#e6f4ea]',
          text: 'text-[#1e8e3e]',
          dot: 'bg-[#1e8e3e]',
        };
      case PlaceOpenStatusEnum.CLOSING_SOON:
        return {
          label: 'Closing soon',
          bg: 'bg-[#ffccbc]',
          text: 'text-[#ea6d2c]',
          dot: 'bg-[#ea6d2c]',
        };
      case PlaceOpenStatusEnum.OPENING_SOON:
        return {
          label: 'Opening soon',
          bg: 'bg-[#e1f5fe]',
          text: 'text-[#0d47a1]',
          dot: 'bg-[#0d47a1]',
        };
      case PlaceOpenStatusEnum.CLOSED:
        return {
          label: 'Closed',
          bg: 'bg-[#ffdad6]',
          text: 'text-[#ba1a1a]',
          dot: 'bg-[#ba1a1a]',
        };
      default:
        return null;
    }
  };

  const style = getStyle();
  if (!style) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-semibold ${style.bg} ${style.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      <span>{style.label}</span>
    </div>
  );
};

export const TagBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="inline-flex items-center px-2 py-1 bg-[#f9f9fc] text-[#1a1c1e] text-xs rounded-md shadow-xs font-normal">
      {children}
    </div>
  );
};
