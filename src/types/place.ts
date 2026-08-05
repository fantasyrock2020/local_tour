export interface DayOpeningHours {
  day: number; // 1 = Monday, 7 = Sunday
  openTime?: string; // e.g. "07:00"
  closeTime?: string; // e.g. "22:00"
  isClosed?: boolean;
}

export interface OpeningHours {
  schedule: DayOpeningHours[];
  isOpen24Hours?: boolean;
}

export enum PlaceOpenStatusEnum {
  OPEN = 'open',
  OPEN_24H = 'open24Hours',
  CLOSING_SOON = 'closingSoon',
  OPENING_SOON = 'openingSoon',
  CLOSED = 'closed',
  UNKNOWN = 'unknown',
}

export interface Place {
  id: string;
  name: string;
  locationId: string;
  lat: number;
  lng: number;
  categoryId: string[];
  description?: string;
  distance?: number;
  rating: number;
  reviewCount: number;
  priceLevel?: number; // 1 = $, 2 = $$, 3 = $$$, 4 = $$$$
  priceRange?: string;
  tags: string[];
  openingHours?: OpeningHours;
  address?: string;
  realAddress?: string;
  imageUrls: string[];
  isBestChoice?: boolean;
}
