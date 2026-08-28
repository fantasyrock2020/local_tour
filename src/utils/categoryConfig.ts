import React from 'react';
import {
  Utensils,
  Cookie,
  Coffee,
  Sparkles,
  Trees,
  Gamepad2,
  ShoppingBag,
  Heart,
  Crown,
} from 'lucide-react';
import { PlaceCategoryEnum } from '../types/category';

export interface CategoryDisplayInfo {
  id: PlaceCategoryEnum;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  badgeBg: string;
  textColor: string;
}

export const CATEGORY_CONFIG: Record<PlaceCategoryEnum, CategoryDisplayInfo> = {
  [PlaceCategoryEnum.FOOD]: {
    id: PlaceCategoryEnum.FOOD,
    label: 'Đồ ăn',
    description: 'Cơm, bún, phở, nhà hàng, quán ăn ngon',
    icon: Utensils,
    gradient: 'from-amber-500 to-orange-500',
    badgeBg: 'bg-amber-100 text-amber-800',
    textColor: 'text-amber-600',
  },
  [PlaceCategoryEnum.SNACK]: {
    id: PlaceCategoryEnum.SNACK,
    label: 'Ăn vặt',
    description: 'Trà sữa, xiên bẩn, bánh tráng, chè',
    icon: Cookie,
    gradient: 'from-orange-400 to-amber-500',
    badgeBg: 'bg-orange-100 text-orange-800',
    textColor: 'text-orange-600',
  },
  [PlaceCategoryEnum.COFFEE]: {
    id: PlaceCategoryEnum.COFFEE,
    label: 'Coffee & Tea',
    description: 'Cà phê view đẹp, chạy deadline, chill',
    icon: Coffee,
    gradient: 'from-amber-700 to-yellow-800',
    badgeBg: 'bg-yellow-100 text-yellow-900',
    textColor: 'text-amber-800',
  },
  [PlaceCategoryEnum.RELAX]: {
    id: PlaceCategoryEnum.RELAX,
    label: 'Nghỉ ngơi',
    description: 'Massage, thư giãn, homestay, resort',
    icon: Sparkles,
    gradient: 'from-teal-500 to-cyan-600',
    badgeBg: 'bg-teal-100 text-teal-800',
    textColor: 'text-teal-600',
  },
  [PlaceCategoryEnum.PARK]: {
    id: PlaceCategoryEnum.PARK,
    label: 'Công viên',
    description: 'Thảm cỏ, đi dạo, picnic, không khí lành',
    icon: Trees,
    gradient: 'from-emerald-500 to-green-600',
    badgeBg: 'bg-emerald-100 text-emerald-800',
    textColor: 'text-emerald-600',
  },
  [PlaceCategoryEnum.PLAYGROUND]: {
    id: PlaceCategoryEnum.PLAYGROUND,
    label: 'Khu vui chơi',
    description: 'Billiards, bowling, gắp thú, game center',
    icon: Gamepad2,
    gradient: 'from-purple-500 to-indigo-600',
    badgeBg: 'bg-purple-100 text-purple-800',
    textColor: 'text-purple-600',
  },
  [PlaceCategoryEnum.FASHION]: {
    id: PlaceCategoryEnum.FASHION,
    label: 'Thời trang',
    description: 'Quần áo, phụ kiện, shopping, cửa hàng',
    icon: ShoppingBag,
    gradient: 'from-pink-500 to-rose-500',
    badgeBg: 'bg-pink-100 text-pink-800',
    textColor: 'text-pink-600',
  },
  [PlaceCategoryEnum.DATE]: {
    id: PlaceCategoryEnum.DATE,
    label: 'Hẹn hò',
    description: 'Lãng mạn, ấm cúng, riêng tư cho 2 người',
    icon: Heart,
    gradient: 'from-rose-500 to-red-600',
    badgeBg: 'bg-rose-100 text-rose-800',
    textColor: 'text-rose-600',
  },
  [PlaceCategoryEnum.LUXURY]: {
    id: PlaceCategoryEnum.LUXURY,
    label: 'Sang trọng',
    description: 'Fine dining, 5 sao, trải nghiệm đẳng cấp',
    icon: Crown,
    gradient: 'from-violet-600 to-purple-800',
    badgeBg: 'bg-violet-100 text-violet-800',
    textColor: 'text-violet-600',
  },
};
