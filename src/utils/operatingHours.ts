import { useState, useEffect } from 'react';

export interface RestaurantStatus {
  isOpen: boolean;
  statusText: string;
  shortBadgeText: string;
  subText: string;
  hoursText: string;
  currentTimeStr: string;
  opensAtText: string;
}

export function computeRestaurantStatus(manualOverride?: 'open' | 'closed' | null): RestaurantStatus {
  const now = new Date();
  
  // Format current time in South Africa Standard Time (UTC+2)
  let hour = now.getUTCHours() + 2;
  let minute = now.getUTCMinutes();
  
  try {
    const saFormatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Johannesburg',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    });
    const parts = saFormatter.formatToParts(now);
    const h = parts.find((p) => p.type === 'hour')?.value;
    const m = parts.find((p) => p.type === 'minute')?.value;
    if (h) hour = parseInt(h, 10);
    if (m) minute = parseInt(m, 10);
  } catch {
    // Fallback if Intl timeZone is unsupported
    if (hour >= 24) hour -= 24;
  }

  const currentMinutes = hour * 60 + minute;
  const openMinutes = 6 * 60;       // 06:00 AM
  const closeMinutes = 19 * 60;     // 19:00 (07:00 PM)

  let isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  if (manualOverride === 'open') isOpen = true;
  if (manualOverride === 'closed') isOpen = false;

  const timeFormatted = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} SAST`;

  if (isOpen) {
    const minutesLeft = closeMinutes - currentMinutes;
    const hoursLeft = Math.floor(minutesLeft / 60);
    const minsLeft = minutesLeft % 60;
    const isClosingSoon = minutesLeft <= 60 && !manualOverride;

    return {
      isOpen: true,
      statusText: isClosingSoon ? 'Closing Soon' : 'Kitchen Open & Serving',
      shortBadgeText: isClosingSoon ? 'Closing Soon' : 'Open Now',
      subText: isClosingSoon
        ? `Closing in ${hoursLeft > 0 ? `${hoursLeft}h ` : ''}${minsLeft}m (at 19:00)`
        : 'Currently serving warm, homestyle meals & hot takeaways',
      hoursText: '06:00 – 19:00 Daily',
      currentTimeStr: timeFormatted,
      opensAtText: 'Closes at 19:00',
    };
  } else {
    return {
      isOpen: false,
      statusText: 'Kitchen Currently Closed',
      shortBadgeText: 'Closed Now',
      subText: 'We open every morning at 06:00 AM with piping hot Amagwinya & stews',
      hoursText: '06:00 – 19:00 Daily',
      currentTimeStr: timeFormatted,
      opensAtText: 'Opens 06:00 AM',
    };
  }
}

export function useRestaurantStatus() {
  const [status, setStatus] = useState<RestaurantStatus>(() => computeRestaurantStatus());

  useEffect(() => {
    // Refresh status every 30 seconds
    const interval = setInterval(() => {
      setStatus(computeRestaurantStatus());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return status;
}
