import React, { createContext, useState, useEffect, useMemo } from 'react';
import { Location } from '../types/location';
import { Place, PlaceOpenStatusEnum } from '../types/place';
import { PlaceFilter, createEmptyFilter, PlaceStatusFilterEnum } from '../types/filter';
import { sampleLocations } from '../data/sampleLocations';
import { fetchPlacesApi } from '../data/placeApi';
import { PLACE_CATEGORIES } from '../types/category';
import {
  Coordinates,
  calculateDistanceKm,
} from '../utils/distance';
import { getOpeningStatusAt } from '../utils/openingHours';

interface AppContextType {
  locations: Location[];
  places: Place[];
  userCoordinates: Coordinates | null;
  activeFilter: PlaceFilter;
  setActiveFilter: (filter: PlaceFilter) => void;
  resetFilter: () => void;
  getPlacesForLocation: (locationId?: string) => Place[];
  getDistanceToPlace: (place: Place) => number | null;
  isLoadingPlaces: boolean;
  placesError: string | null;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locations] = useState<Location[]>(sampleLocations);
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState<boolean>(true);
  const [placesError, setPlacesError] = useState<string | null>(null);
  const [userCoordinates, setUserCoordinates] = useState<Coordinates | null>(null);
  const [activeFilter, setActiveFilter] = useState<PlaceFilter>(createEmptyFilter());

  useEffect(() => {
    let isMounted = true;
    setIsLoadingPlaces(true);
    fetchPlacesApi()
      .then((fetchedPlaces) => {
        if (isMounted) {
          setPlaces(fetchedPlaces);
          setIsLoadingPlaces(false);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch places API, using samplePlaces as fallback:', err);
        if (isMounted) {
          setPlacesError(err.message || 'Failed to fetch places API');
          setIsLoadingPlaces(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoordinates({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          // Permission denied or unavailable: userCoordinates stays null.
          console.warn('Geolocation error or permission denied. userCoordinates will remain null.', err);
        },
        { enableHighAccuracy: false, timeout: 5000 }
      );
    }
  }, []);

  const DEFAULT_COORDINATES: Coordinates = { lat: 10.7769, lng: 106.7009 };

  const getDistanceToPlace = (place: Place): number | null => {
    if (place.distance !== undefined && place.distance > 0) {
      return place.distance;
    }
    const origin = userCoordinates || DEFAULT_COORDINATES;
    if (!place.lat || !place.lng) return null;
    return calculateDistanceKm(origin, { lat: place.lat, lng: place.lng });
  };

  const resetFilter = () => {
    setActiveFilter(createEmptyFilter());
  };

  const getPlacesForLocation = (locationId?: string): Place[] => {
    let result = places;

    // Filter by locationId if provided
    if (locationId && locationId.trim() !== '') {
      result = result.filter((p) => p.locationId === locationId);
    } else if (userCoordinates) {
      // Default max distance filter when locationId is null (current position)
      // Only applies once we actually know the user's location.
      result = result.filter((p) => {
        const dist = getDistanceToPlace(p);
        return dist !== null && dist <= 50;
      });
    }
    // If userCoordinates is null (no location permission / not resolved yet),
    // skip the radius filter entirely rather than dropping every place.

    // Sort by distance — places with unknown distance (null) sort to the end
    // instead of collapsing to 0 and corrupting the order.
    result = [...result]
      .map((p) => ({
        ...p,
        distance: getDistanceToPlace(p) ?? undefined,
      }))
      .sort((a, b) => {
        if (a.distance == null && b.distance == null) return 0;
        if (a.distance == null) return 1;
        if (b.distance == null) return -1;
        return a.distance - b.distance;
      });

    // Apply Filter Drawer rules if filter is set
    if (activeFilter) {
      result = result.filter((place) => {
        // 1. Categories
        if (activeFilter.categories.length > 0) {
          const matchesCategory = activeFilter.categories.some((catEnum) => {
            const keywords = PLACE_CATEGORIES[catEnum]?.keywords || [];
            return (
              place.categoryId.some((c) =>
                keywords.some((k) => k.toLowerCase() === c.toLowerCase())
              ) ||
              place.tags.some((t) =>
                keywords.some((k) => k.toLowerCase() === t.toLowerCase())
              )
            );
          });
          if (!matchesCategory) return false;
        }

        // 2. Statuses
        if (activeFilter.statuses.length > 0) {
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

        // 3. Distance Range
        // Only enforce distance-range filters when we actually know the
        // place's distance; otherwise we'd wrongly exclude everything
        // while the user's location is unknown/unavailable.
        const dist = place.distance ?? getDistanceToPlace(place);
        if (dist !== null) {
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
        } else if (
          activeFilter.minDistanceKm !== undefined ||
          activeFilter.maxDistanceKm !== undefined
        ) {
          // A distance filter is active but we can't evaluate it for this
          // place — exclude it rather than silently letting it through.
          return false;
        }

        // 4. Max Price Level
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
  };

  const value = useMemo(
    () => ({
      locations,
      places,
      userCoordinates,
      activeFilter,
      setActiveFilter,
      resetFilter,
      getPlacesForLocation,
      getDistanceToPlace,
      isLoadingPlaces,
      placesError,
    }),
    [locations, places, userCoordinates, activeFilter, isLoadingPlaces, placesError]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};