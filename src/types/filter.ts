import { PlaceCategoryEnum } from './category';

export enum PlaceStatusFilterEnum {
  OPEN = 'open',
  OPENING_SOON = 'openingSoon',
  CLOSED = 'closed',
}

export const PLACE_STATUS_LABELS: Record<PlaceStatusFilterEnum, string> = {
  [PlaceStatusFilterEnum.OPEN]: 'Đang mở cửa',
  [PlaceStatusFilterEnum.OPENING_SOON]: 'Sắp mở cửa',
  [PlaceStatusFilterEnum.CLOSED]: 'Đã đóng cửa',
};

export interface PlaceFilter {
  categories: PlaceCategoryEnum[];
  categoryIds: string[];
  statuses: PlaceStatusFilterEnum[];
  minDistanceKm?: number;
  maxDistanceKm?: number;
  maxPriceLevel?: number;
  minRating?: number;
  tags: string[];
}

export const createEmptyFilter = (): PlaceFilter => ({
  categories: [],
  categoryIds: [],
  statuses: [],
  tags: [],
});

export const isFilterEmpty = (filter: PlaceFilter): boolean => {
  return (
    filter.categories.length === 0 &&
    filter.categoryIds.length === 0 &&
    filter.statuses.length === 0 &&
    filter.minDistanceKm === undefined &&
    filter.maxDistanceKm === undefined &&
    filter.maxPriceLevel === undefined &&
    filter.minRating === undefined &&
    filter.tags.length === 0
  );
};
