import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/useApp';
import { Header } from '../components/Common/Header';
import { PlaceItemCard } from '../components/Place/PlaceItemCard';
import { FilterDrawer } from '../components/Place/FilterDrawer';
import { EmptyPlaceState } from '../components/Place/EmptyPlaceState';
import { isFilterEmpty } from '../types/filter';
import { Sparkles } from 'lucide-react';

export const PlacePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const locationId = searchParams.get('locationId') || undefined;
  const name = searchParams.get('name') || 'Vị trí hiện tại';

  const { getPlacesForLocation, activeFilter, setActiveFilter, resetFilter } = useApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const places = getPlacesForLocation(locationId);
  const isFilterActive = !isFilterEmpty(activeFilter);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-6">
      {/* Header */}
      <Header
        title={name}
        showBack={true}
        onFilterClick={() => setIsFilterOpen(true)}
        isFilterActive={isFilterActive}
      />

      {/* Main List */}
      <main className="flex-1 p-4 max-w-lg mx-auto w-full">
        {/* Quick filter & counter header */}
        <div className="flex items-center justify-between mb-3 px-0.5">
          <div className="text-xs text-slate-500">
            Hiển thị <strong className="text-slate-800">{places.length}</strong> địa điểm
          </div>
          <button
            type="button"
            onClick={() =>
              setActiveFilter({
                ...activeFilter,
                onlyBestChoice: !activeFilter.onlyBestChoice,
              })
            }
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-colors border ${
              activeFilter.onlyBestChoice
                ? 'bg-amber-50 text-amber-800 border-amber-300 font-semibold shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 font-normal'
            }`}
          >
            <Sparkles
              className={`w-3.5 h-3.5 ${
                activeFilter.onlyBestChoice
                  ? 'text-amber-600 fill-amber-500'
                  : 'text-slate-400'
              }`}
            />
            <span>Nên đi</span>
          </button>
        </div>

        {places.length === 0 ? (
          <EmptyPlaceState />
        ) : (
          <div className="space-y-4">
            {places.map((place) => (
              <PlaceItemCard key={place.id + place.lat + place.lng} place={place} />
            ))}
          </div>
        )}
      </main>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        initialFilter={activeFilter}
        onClose={() => setIsFilterOpen(false)}
        onApply={(newFilter) => setActiveFilter(newFilter)}
        onClear={resetFilter}
        showCategoryFilter={true}
      />
    </div>
  );
};
