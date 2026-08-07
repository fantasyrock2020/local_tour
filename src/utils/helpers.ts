import { Location } from '../types/location';

export function sortCommuneLocation(locations: Location[]): Location[] {
  return [...locations].sort((a, b) => {
    const pA = a.priority;
    const pB = b.priority;

    const isAEmpty = pA === undefined || pA === null;
    const isBEmpty = pB === undefined || pB === null;

    if (isAEmpty && isBEmpty) return 0;
    if (isAEmpty) return 1;
    if (isBEmpty) return -1;

    return pA - pB;
  });
}