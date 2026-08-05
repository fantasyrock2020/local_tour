import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { PlaceFilter, PlaceStatusFilterEnum, PLACE_STATUS_LABELS } from '../../types/filter';
import { PLACE_CATEGORIES, PlaceCategoryEnum } from '../../types/category';

interface FilterDrawerProps {
  isOpen: boolean;
  initialFilter: PlaceFilter;
  onClose: () => void;
  onApply: (filter: PlaceFilter) => void;
  onClear: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  initialFilter,
  onClose,
  onApply,
  onClear,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<PlaceCategoryEnum[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<PlaceStatusFilterEnum[]>([]);
  const [minDistance, setMinDistance] = useState<number>(0);
  const [maxDistance, setMaxDistance] = useState<number>(50);
  const [maxPriceLevel, setMaxPriceLevel] = useState<number | undefined>(undefined);

  useEffect(() => {
    setSelectedCategories(initialFilter.categories || []);
    setSelectedStatuses(initialFilter.statuses || []);
    setMinDistance(initialFilter.minDistanceKm || 0);
    setMaxDistance(initialFilter.maxDistanceKm || 50);
    setMaxPriceLevel(initialFilter.maxPriceLevel);
  }, [initialFilter, isOpen]);

  if (!isOpen) return null;

  const toggleCategory = (cat: PlaceCategoryEnum) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleStatus = (status: PlaceStatusFilterEnum) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const handleApply = () => {
    onApply({
      categories: selectedCategories,
      categoryIds: [],
      statuses: selectedStatuses,
      minDistanceKm: minDistance > 0 ? minDistance : undefined,
      maxDistanceKm: maxDistance < 50 ? maxDistance : undefined,
      maxPriceLevel: maxPriceLevel,
      tags: [],
    });
    onClose();
  };

  const handleClear = () => {
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setMinDistance(0);
    setMaxDistance(50);
    setMaxPriceLevel(undefined);
    onClear();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Drawer Body (Width ~85% mobile / 380px desktop) */}
      <div className="relative w-[85%] max-w-sm h-full bg-white shadow-2xl flex flex-col z-10 animate-slideLeft">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Bộ lọc</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filter Form */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Section 1: Categories */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-2">
              Danh mục địa điểm
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.values(PlaceCategoryEnum).map((cat) => {
                const isSelected = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {PLACE_CATEGORIES[cat]?.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Operating Status */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-2">
              Trạng thái hoạt động
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.values(PlaceStatusFilterEnum).map((status) => {
                const isSelected = selectedStatuses.includes(status);
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => toggleStatus(status)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {PLACE_STATUS_LABELS[status]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Distance Range */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-500 font-medium">
                Bán kính tìm kiếm
              </span>
              <span className="text-xs font-semibold text-purple-600">
                {maxDistance >= 50
                  ? `${minDistance} km - 50+ km`
                  : `${minDistance} km - ${maxDistance} km`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Section 4: Price Level */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Mức giá</h3>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((level) => {
                const label = '$'.repeat(level);
                const isSelected = maxPriceLevel === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() =>
                      setMaxPriceLevel(isSelected ? undefined : level)
                    }
                    className={`py-2 rounded-lg text-xs font-semibold border transition-colors text-center ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 grid grid-cols-2 gap-3 bg-white">
          <button
            onClick={handleClear}
            className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Xoá bộ lọc
          </button>
          <button
            onClick={handleApply}
            className="w-full py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold shadow-md hover:bg-purple-700 transition-colors"
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};
