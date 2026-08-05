import React from 'react';
import { Location } from '../../types/location';
import { defaultImageCurrentLocation } from '../../data/sampleLocations';

interface LocationCardProps {
  location?: Location | null;
  onClick: (location?: Location | null) => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location, onClick }) => {
  const imageUrl = location?.image || defaultImageCurrentLocation;
  const name = location?.name || 'Vị trí hiện tại';

  return (
    <button
      onClick={() => onClick(location)}
      className="relative w-full h-[140px] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all transform active:scale-98 group text-left border border-slate-100 focus:outline-none"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {/* Gradient overlay matching Flutter linear gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 p-2.5 text-center">
        <h3 className="text-white font-semibold text-base leading-tight drop-shadow-sm">
          {name}
        </h3>
      </div>
    </button>
  );
};
