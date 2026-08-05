import { OpeningHours, PlaceOpenStatusEnum, DayOpeningHours } from '../types/place';

export function getOpeningStatusAt(
  openingHours?: OpeningHours,
  soonThresholdMinutes = 30,
  now: Date = new Date()
): PlaceOpenStatusEnum {
  if (!openingHours) {
    return PlaceOpenStatusEnum.UNKNOWN;
  }

  if (openingHours.isOpen24Hours) {
    return PlaceOpenStatusEnum.OPEN_24H;
  }

  if (!openingHours.schedule || openingHours.schedule.length === 0) {
    return PlaceOpenStatusEnum.UNKNOWN;
  }

  // JS getDay(): Sunday is 0, Monday is 1, Saturday is 6
  // Convert to 1 = Monday ... 7 = Sunday
  const jsDay = now.getDay();
  const currentDay = jsDay === 0 ? 7 : jsDay;

  const todayHours = openingHours.schedule.find((d) => d.day === currentDay);

  if (
    todayHours &&
    !todayHours.isClosed &&
    todayHours.openTime &&
    todayHours.closeTime
  ) {
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const openMin = toMinutes(todayHours.openTime);
    const closeMin = toMinutes(todayHours.closeTime);

    if (nowMin >= openMin && nowMin <= closeMin) {
      const minutesLeft = closeMin - nowMin;
      return minutesLeft <= soonThresholdMinutes
        ? PlaceOpenStatusEnum.CLOSING_SOON
        : PlaceOpenStatusEnum.OPEN;
    }
  }

  const minutesUntilOpen = minutesUntilNextOpen(openingHours.schedule, now);
  if (minutesUntilOpen !== null && minutesUntilOpen <= soonThresholdMinutes) {
    return PlaceOpenStatusEnum.OPENING_SOON;
  }

  return PlaceOpenStatusEnum.CLOSED;
}

function minutesUntilNextOpen(schedule: DayOpeningHours[], now: Date): number | null {
  const jsDay = now.getDay();
  const currentDay = jsDay === 0 ? 7 : jsDay;

  for (let offset = 0; offset < 7; offset++) {
    const checkDay = ((currentDay - 1 + offset) % 7) + 1;
    const hours = schedule.find((d) => d.day === checkDay);

    if (!hours || hours.isClosed || !hours.openTime) {
      continue;
    }

    const openMin = toMinutes(hours.openTime);

    if (offset === 0) {
      const nowMin = now.getHours() * 60 + now.getMinutes();
      if (openMin > nowMin) {
        return openMin - nowMin;
      }
      continue;
    } else {
      const minutesToday = 24 * 60 - (now.getHours() * 60 + now.getMinutes());
      const fullDaysBetween = (offset - 1) * 24 * 60;
      return minutesToday + fullDaysBetween + openMin;
    }
  }
  return null;
}

function toMinutes(hhmm: string): number {
  const [hours, minutes] = hhmm.split(':').map(Number);
  return hours * 60 + minutes;
}
