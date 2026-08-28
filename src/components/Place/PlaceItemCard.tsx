import React from 'react';
import { Place } from '../../types/place';
import { PlaceStatusBadge, TagBadge } from '../Common/Badge';
import { MapPin } from 'lucide-react';
import { formatDistance } from '../../utils/distance';
import { getOpeningStatusAt } from '../../utils/openingHours';

interface PlaceItemCardProps {
  place: Place;
}

export const PlaceItemCard: React.FC<PlaceItemCardProps> = ({ place }) => {
  const status = getOpeningStatusAt(place.openingHours);
  const imageUrl = place.imageUrls[0] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop';
  const hasDescription = place.description && place.description.trim().length > 0;

  const handleCardClick = () => {
    if (place.address) {
      window.open(place.address, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="mb-4 bg-white rounded-xl overflow-hidden border border-slate-100 shadow-[0_8px_24px_rgba(13,94,107,0.06)] hover:shadow-md transition-shadow cursor-pointer group"
    >
      {/* Image header with overlay badges */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top-right distance badge */}
        {place.distance !== undefined && place.distance !== null && place.distance > 0 && (
          <div className="absolute top-2 right-2">
            <TagBadge>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-700" />
                <span>{formatDistance(place.distance)}</span>
              </div>
            </TagBadge>
          </div>
        )}

        {/* Bottom-right status badge */}
        <div className="absolute bottom-2 right-2">
          <PlaceStatusBadge status={status} />
        </div>

        {/* Bottom-left tags badge */}
        {place.tags && place.tags.length > 0 && (
          <div className="absolute bottom-2 left-2 max-w-[65%] truncate">
            <TagBadge>{place.tags.join(' • ')}</TagBadge>
          </div>
        )}
      </div>

      {/* Place Content */}
      <div className="p-3 space-y-2.5">
        <h3 className="font-semibold text-slate-900 text-base leading-snug line-clamp-2">
          {place.name}
        </h3>

        {/* Note */}
        {hasDescription && (
          <div className="flex items-center gap-1 text-slate-500 text-xs line-clamp-1">
            <span>{place.description}</span>
          </div>
        )}

        {/* Address */}
        <div className="flex items-center gap-1 text-slate-500 text-xs line-clamp-1">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          <span>{place.realAddress || 'Chưa cập nhật địa chỉ'}</span>
        </div>

        <hr className="border-slate-100" />

        {/* Price range */}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-purple-700 text-sm">
            {place.priceRange || ''}
          </span>
          {place.rating > 0 && (
            <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
              ★ {place.rating} ({place.reviewCount})
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
