import React from 'react';
import { Place } from '../../types/place';
import { PlaceStatusBadge, TagBadge, BestChoiceBadge } from '../Common/Badge';
import { MapPin, Sparkles } from 'lucide-react';
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
      className={`mb-4 bg-white rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 relative ${
        place.isBestChoice
          ? 'border-2 border-amber-400 shadow-[0_8px_24px_rgba(245,158,11,0.18)] ring-2 ring-amber-400/25 hover:shadow-[0_12px_28px_rgba(245,158,11,0.26)]'
          : 'border border-slate-100 shadow-[0_8px_24px_rgba(13,94,107,0.06)] hover:shadow-md'
      }`}
    >
      {/* Top accent line for Best Choice */}
      {place.isBestChoice && (
        <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 w-full" />
      )}

      {/* Image header with overlay badges */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top-left Best Choice badge */}
        {place.isBestChoice && (
          <div className="absolute top-2 left-2 z-10">
            <BestChoiceBadge />
          </div>
        )}

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
        {/* Recommendation banner for Best Choice */}
        {place.isBestChoice && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-800 text-[11px] font-semibold w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500 shrink-0" />
            <span>Địa điểm nổi bật • Rất đáng trải nghiệm</span>
          </div>
        )}

        <div className="flex items-start justify-between gap-2">
          <h3
            className={`text-base leading-snug line-clamp-2 ${
              place.isBestChoice
                ? 'font-bold text-amber-950'
                : 'font-semibold text-slate-900'
            }`}
          >
            {place.name}
          </h3>
          {place.isBestChoice && (
            <span className="shrink-0 text-amber-800 bg-amber-100 border border-amber-200 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wide">
              Top Pick
            </span>
          )}
        </div>

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
