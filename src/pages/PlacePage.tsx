import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/useApp';
import { Header } from '../components/Common/Header';
import { PlaceItemCard } from '../components/Place/PlaceItemCard';
import { FilterDrawer } from '../components/Place/FilterDrawer';
import { EmptyPlaceState } from '../components/Place/EmptyPlaceState';
import { isFilterEmpty } from '../types/filter';

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
