import { Place, OpeningHours, DayOpeningHours } from '../types/place';

export interface RawPriceRange {
  min?: number | null;
  max?: number | null;
  raw?: any;
}

export interface RawPlaceJson {
  name: string;
  category?: string[];
  priceRange?: RawPriceRange;
  address?: string;
  realAddress?: string;
  lat: number;
  lng: number;
  openHours?: string;
  note?: string | null;
  isAllWeek?: boolean;
  isBestChoice?: boolean;
  imageUrls?: string[];
}

export function removeVietnameseDiacritics(str?: string | null): string | null {
  if (!str) return null;
  const patterns: [RegExp, string][] = [
    [/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a'],
    [/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A'],
    [/[èéẹẻẽêềếệểễ]/g, 'e'],
    [/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E'],
    [/[ìíịỉĩ]/g, 'i'],
    [/[ÌÍỊỈĨ]/g, 'I'],
    [/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o'],
    [/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O'],
    [/[ùúụủũưừứựửữ]/g, 'u'],
    [/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U'],
    [/[ỳýỵỷỹ]/g, 'y'],
    [/[ỲÝỴỶỸ]/g, 'Y'],
    [/đ/g, 'd'],
    [/Đ/g, 'D'],
  ];

  let result = str;
  for (const [pattern, replacement] of patterns) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

export function toKeyword(str?: string | null): string | null {
  if (!str) return null;
  const clean = removeVietnameseDiacritics(str);
  if (!clean) return null;
  return clean.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function formatPriceVnd(val?: number | null): string {
  const num = val || 0;
  if (num >= 1000000) {
    const millions = num / 1000000;
    const formatted = Number.isInteger(millions)
      ? millions.toString()
      : millions.toFixed(1);
    return `${formatted}tr`;
  }

  if (num >= 1000) {
    const thousands = num / 1000;
    const formatted = Number.isInteger(thousands)
      ? thousands.toString()
      : thousands.toFixed(1);
    return `${formatted}k`;
  }

  return num.toString();
}

export function resolvePriceLevel(
  min?: number | null,
  max?: number | null
): number | undefined {
  const representative = max ?? min;
  if (representative === null || representative === undefined) {
    return undefined;
  }

  if (representative <= 50000) {
    return 1;
  }
  if (representative <= 150000) {
    return 2;
  }
  if (representative <= 400000) {
    return 3;
  }
  return 4;
}

export function resolvePriceRange(
  min?: number | null,
  max?: number | null
): string | undefined {
  if (
    (min === null || min === undefined) &&
    (max === null || max === undefined)
  ) {
    return undefined;
  }

  if (min === null || min === undefined) {
    return `<${formatPriceVnd(max!)}`;
  }

  if (max === null || max === undefined) {
    return `>${formatPriceVnd(min!)}`;
  }

  return `${formatPriceVnd(min)} - ${formatPriceVnd(max)}`;
}

function normalizeTime(time: string): string | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hour = match[1].padStart(2, '0');
  const minute = match[2];
  return `${hour}:${minute}`;
}

export function parseOpeningHours(
  raw?: string | null,
  isAllWeek?: boolean
): OpeningHours | undefined {
  if (!raw || !raw.trim()) return undefined;

  const normalized = raw.replace(/[–—]/g, '-').trim();
  const firstRange = normalized.split(',')[0].trim();

  const parts = firstRange.split('-');
  if (parts.length !== 2) return undefined;

  const open = normalizeTime(parts[0].trim());
  const close = normalizeTime(parts[1].trim());

  if (!open || !close) return undefined;

  const schedule: DayOpeningHours[] = [1, 2, 3, 4, 5, 6, 7].map((day) => ({
    day,
    openTime: open,
    closeTime: close,
  }));

  return {
    schedule,
    isOpen24Hours: isAllWeek === true && open === '00:00' && close === '24:00',
  };
}

export function mapJsonToPlace(
  locationId: string,
  json: RawPlaceJson
): Place {
  const categories: string[] = Array.isArray(json.category)
    ? json.category.map((e) => String(e))
    : [];

  const priceRangeJson = json.priceRange || {};
  const min = typeof priceRangeJson.min === 'number' ? priceRangeJson.min : null;
  const max = typeof priceRangeJson.max === 'number' ? priceRangeJson.max : null;

  const name = json.name || '';
  const isAllWeek = Boolean(json.isAllWeek);
  const isBestChoice = Boolean(json.isBestChoice);
  const imageUrls: string[] = Array.isArray(json.imageUrls)
    ? json.imageUrls.map((e) => String(e))
    : [];

  const keywordId = toKeyword(name);
  const id = keywordId && keywordId.length > 0
    ? keywordId
    : `place_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  return {
    id,
    name,
    locationId,
    categoryId: categories,
    lat: Number(json.lat) || 0,
    lng: Number(json.lng) || 0,
    priceLevel: resolvePriceLevel(min, max),
    priceRange: resolvePriceRange(min, max),
    tags: categories,
    openingHours: parseOpeningHours(json.openHours, isAllWeek),
    address: json.address,
    realAddress: json.realAddress,
    imageUrls,
    isBestChoice,
    rating: 0,
    reviewCount: 0,
  };
}
