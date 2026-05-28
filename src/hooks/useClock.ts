'use client';

import { useState, useEffect } from 'react';

interface ClockState {
  hours: string;
  minutes: string;
  seconds: string;
  dateString: string;
  greeting: string;
}

export function useClock(): ClockState {
  // Use placeholder state on server-side to avoid SSR hydration mismatches
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set time immediately on mount
    setTime(new Date());
    
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return {
      hours: '--',
      minutes: '--',
      seconds: '--',
      dateString: 'Loading...',
      greeting: 'Selamat datang',
    };
  }

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  // Indonesian format: e.g. "Kamis, 28 Mei 2026"
  const dateString = time.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const hourNum = time.getHours();
  let greeting = 'Selamat pagi';

  if (hourNum >= 0 && hourNum <= 10) {
    greeting = 'Selamat pagi';
  } else if (hourNum >= 11 && hourNum <= 14) {
    greeting = 'Selamat siang';
  } else if (hourNum >= 15 && hourNum <= 17) {
    greeting = 'Selamat sore';
  } else {
    greeting = 'Selamat malam';
  }

  return { hours, minutes, seconds, dateString, greeting };
}
