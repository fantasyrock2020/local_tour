export enum LocationType {
  PROVINCE = 'province',
  COMMUNE = 'commune',
  TOUR = 'tour',
}

export interface Location {
  id: string;
  name: string;
  type: LocationType;
  parentId?: string;
  communes?: Location[];
  lat?: number;
  lng?: number;
  slug?: string;
  image?: string;
  previousDistricts?: string[];
}
