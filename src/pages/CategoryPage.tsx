import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/useApp';
import { Header } from '../components/Common/Header';
import { PlaceItemCard } from '../components/Place/PlaceItemCard';
import { FilterDrawer } from '../components/Place/FilterDrawer';
import { EmptyPlaceState } from '../components/Place/EmptyPlaceState';
import { PlaceCategoryEnum, PLACE_CATEGORIES } from '../types/category';
import { CATEGORY_CONFIG } from '../utils/categoryConfig';
import { Place, PlaceOpenStatusEnum } from '../types/place';
import { isFilterEmpty, PlaceStatusFilterEnum } from '../types/filter';
import { getOpeningStatusAt } from '../utils/openingHours';
import { ChevronRight, Layers, Search } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { places, getDistanceToPlace, activeFilter, setActiveFilter, resetFilter } = useApp();

  const selectedCategoryParam = searchParams.get('cat') as PlaceCategoryEnum | null;
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategoryEnum | null>(
    selectedCategoryParam && Object.values(PlaceCategoryEnum).includes(selectedCategoryParam)
      ? selectedCategoryParam
      : null
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sync state with query param if it changes
  React.useEffect(() => {
    const cat = searchParams.get('cat') as PlaceCategoryEnum | null;
    if (cat && Object.values(PlaceCategoryEnum).includes(cat)) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory(null);
    }
  }, [searchParams]);

  // Helper to check if place matches a category enum
  const isPlaceInCategory = (place: Place, catEnum: PlaceCategoryEnum): boolean => {
    const keywords = PLACE_CATEGORIES[catEnum]?.keywords || [];
    return (
      place.categoryId.some((c) =>
        keywords.some((k) => k.toLowerCase() === c.toLowerCase())
      ) ||
      place.tags.some((t) =>
        keywords.some((k) => k.toLowerCase() === t.toLowerCase())
      )
    );
  };

  // Calculate count of places per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.values(PlaceCategoryEnum).forEach((cat) => {
      counts[cat] = places.filter((p) => isPlaceInCategory(p, cat)).length;
    });
    return counts;
  }, [places]);

  // Filtered places for selected category with distance, search, and activeFilter rules
  const filteredPlaces = useMemo(() => {
    if (!selectedCategory) return [];

    let result = places
      .filter((p) => isPlaceInCategory(p, selectedCategory))
      .map((p) => ({
        ...p,
        distance: p.distance ?? (getDistanceToPlace(p) ?? undefined),
      }))
      .sort((a, b) => {
        if (a.distance == null && b.distance == null) return 0;
        if (a.distance == null) return 1;
        if (b.distance == null) return -1;
        return a.distance - b.distance;
      });

    // 1. Search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          (p.address && p.address.toLowerCase().includes(term)) ||
          (p.realAddress && p.realAddress.toLowerCase().includes(term)) ||
          p.tags.some((t) => t.toLowerCase().includes(term))
      );
    }

    // 2. Active filter rules (Status, Distance range, Price level)
    if (activeFilter) {
      result = result.filter((place) => {
        // Status filter
        if (activeFilter.statuses && activeFilter.statuses.length > 0) {
          const status = getOpeningStatusAt(place.openingHours);
          const matchesStatus = activeFilter.statuses.some((sf) => {
            switch (sf) {
              case PlaceStatusFilterEnum.OPEN:
                return (
                  status === PlaceOpenStatusEnum.OPEN ||
                  status === PlaceOpenStatusEnum.OPEN_24H ||
                  status === PlaceOpenStatusEnum.CLOSING_SOON
                );
              case PlaceStatusFilterEnum.OPENING_SOON:
                return status === PlaceOpenStatusEnum.OPENING_SOON;
              case PlaceStatusFilterEnum.CLOSED:
                return status === PlaceOpenStatusEnum.CLOSED;
              default:
                return false;
            }
          });
          if (!matchesStatus) return false;
        }

        // Distance range filter
        const dist = place.distance;
        if (dist !== undefined && dist !== null) {
          if (
            activeFilter.minDistanceKm !== undefined &&
            dist < activeFilter.minDistanceKm
          ) {
            return false;
          }
          if (
            activeFilter.maxDistanceKm !== undefined &&
            dist > activeFilter.maxDistanceKm
          ) {
            return false;
          }
        }

        // Price level filter
        if (
          activeFilter.maxPriceLevel !== undefined &&
          place.priceLevel !== undefined &&
          place.priceLevel > activeFilter.maxPriceLevel
        ) {
          return false;
        }

        return true;
      });
    }

    return result;
  }, [places, selectedCategory, searchTerm, getDistanceToPlace, activeFilter]);

  const handleSelectCategory = (cat: PlaceCategoryEnum | null) => {
    resetFilter();
    setSearchTerm('');
    if (cat) {
      setSearchParams({ cat });
      setSelectedCategory(cat);
    } else {
      setSearchParams({});
      setSelectedCategory(null);
    }
  };

  const isFilterActive = !isFilterEmpty(activeFilter);

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col ${selectedCategory ? 'pb-6' : 'pb-20'}`}>
      {/* Header */}
      <Header
        title={
          selectedCategory
            ? CATEGORY_CONFIG[selectedCategory]?.label || 'Danh mục'
            : 'Chọn danh mục'
        }
        showBack={!!selectedCategory}
        onBackClick={() => handleSelectCategory(null)}
        onFilterClick={selectedCategory ? () => setIsFilterOpen(true) : undefined}
        isFilterActive={selectedCategory ? isFilterActive : false}
      />

      {/* Main Content */}
      <main className="flex-1 p-4 max-w-lg mx-auto w-full">
        {!selectedCategory ? (
          /* Grid of Categories */
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-medium text-white mb-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Khám phá theo nhu cầu</span>
                </div>
                <h2 className="text-xl font-extrabold tracking-tight">
                  Danh Mục Dịch Vụ
                </h2>
                <p className="text-xs text-purple-100 mt-1 max-w-[90%] leading-relaxed">
                  Chọn danh mục bạn mong muốn để xem danh sách địa điểm phù hợp nhất xung quanh bạn.
                </p>
              </div>
              <div className="absolute -right-4 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 gap-3">
              {Object.values(PlaceCategoryEnum).map((catKey) => {
                const info = CATEGORY_CONFIG[catKey];
                const Icon = info.icon;
                const count = categoryCounts[catKey] || 0;

                return (
                  <button
                    key={catKey}
                    onClick={() => handleSelectCategory(catKey)}
                    className="group bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-between text-left active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-800 text-base group-hover:text-purple-600 transition-colors">
                            {info.label}
                          </h3>
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${info.badgeBg}`}
                          >
                            {count} địa điểm
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                          {info.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-1.5 rounded-full bg-slate-50 text-slate-400 group-hover:text-purple-600 group-hover:bg-purple-50 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* List Products / Places for Selected Category */
          <div className="space-y-4">
            {/* Search within Category */}
            <div className="relative">
              <input
                type="text"
                placeholder={`Tìm trong danh mục ${CATEGORY_CONFIG[selectedCategory]?.label}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 shadow-xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Selected Category Header Banner */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>
                Hiển thị <strong className="text-slate-800">{filteredPlaces.length}</strong> địa điểm
              </span>
              <span className="font-medium text-purple-600">
                {CATEGORY_CONFIG[selectedCategory]?.label}
              </span>
            </div>

            {/* Places List */}
            {filteredPlaces.length === 0 ? (
              <EmptyPlaceState />
            ) : (
              <div className="space-y-4">
                {filteredPlaces.map((place) => (
                  <PlaceItemCard
                    key={place.id + place.lat + place.lng}
                    place={place}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Filter Drawer - Only active for selected category view */}
      {selectedCategory && (
        <FilterDrawer
          isOpen={isFilterOpen}
          initialFilter={activeFilter}
          onClose={() => setIsFilterOpen(false)}
          onApply={(newFilter) => setActiveFilter(newFilter)}
          onClear={resetFilter}
        />
      )}
    </div>
  );
};
