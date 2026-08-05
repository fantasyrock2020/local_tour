import { Place } from '../types/place';
import { mapJsonToPlace, RawPlaceJson } from './placeMapper';

const PLACE_API_URL = 'https://fantasyrock2020.github.io/Place-Json/output.json';

export async function fetchPlacesApi(): Promise<Place[]> {
  const response = await fetch(PLACE_API_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch places: ${response.status} ${response.statusText}`);
  }

  const data: Record<string, RawPlaceJson[]> = await response.json();
  const allPlaces: Place[] = [];

  Object.entries(data).forEach(([locationId, items]) => {
    if (Array.isArray(items)) {
      items.forEach((item) => {
        allPlaces.push(mapJsonToPlace(locationId, item));
      });
    }
  });

  return allPlaces;
}
