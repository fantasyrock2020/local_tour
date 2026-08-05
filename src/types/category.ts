export enum PlaceCategoryEnum {
  FOOD = 'food',
  SNACK = 'snack',
  COFFEE = 'coffee',
  RELAX = 'relax',
  PARK = 'park',
  PLAYGROUND = 'playground',
  FASHION = 'fashion',
  DATE = 'date',
  LUXURY = 'luxury',
}

export interface PlaceCategoryMeta {
  id: PlaceCategoryEnum;
  label: string;
  keywords: string[];
}

export const PLACE_CATEGORIES: Record<PlaceCategoryEnum, PlaceCategoryMeta> = {
  [PlaceCategoryEnum.FOOD]: {
    id: PlaceCategoryEnum.FOOD,
    label: 'Đồ ăn',
    keywords: ['food', 'ceat', 'eat', 'Đồ ăn', 'Cơm', 'Nhà hàng', 'Quán ăn'],
  },
  [PlaceCategoryEnum.SNACK]: {
    id: PlaceCategoryEnum.SNACK,
    label: 'Ăn vặt',
    keywords: ['snack', 'Ăn vặt', 'Bánh', 'Trà sữa'],
  },
  [PlaceCategoryEnum.COFFEE]: {
    id: PlaceCategoryEnum.COFFEE,
    label: 'Coffee',
    keywords: ['coffee', 'Coffee', 'Cà phê', 'Kafe'],
  },
  [PlaceCategoryEnum.RELAX]: {
    id: PlaceCategoryEnum.RELAX,
    label: 'Nghỉ ngơi',
    keywords: ['relax', 'crelax', 'Nghỉ ngơi'],
  },
  [PlaceCategoryEnum.PARK]: {
    id: PlaceCategoryEnum.PARK,
    label: 'Công viên',
    keywords: ['park', 'Công viên', 'Thảm cỏ'],
  },
  [PlaceCategoryEnum.PLAYGROUND]: {
    id: PlaceCategoryEnum.PLAYGROUND,
    label: 'Khu vui chơi',
    keywords: ['playground', 'cplay', 'play', 'Khu vui chơi', 'Giải trí'],
  },
  [PlaceCategoryEnum.FASHION]: {
    id: PlaceCategoryEnum.FASHION,
    label: 'Thời trang',
    keywords: ['fashion', 'Thời trang', 'Quần áo', 'Shop'],
  },
  [PlaceCategoryEnum.DATE]: {
    id: PlaceCategoryEnum.DATE,
    label: 'Date',
    keywords: ['date', 'Date', 'Hẹn hò'],
  },
  [PlaceCategoryEnum.LUXURY]: {
    id: PlaceCategoryEnum.LUXURY,
    label: 'Luxury',
    keywords: ['luxury', 'Luxury', 'Sang trọng'],
  },
};
