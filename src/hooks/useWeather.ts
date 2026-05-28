'use client';

import { useState, useEffect } from 'react';
import { WEATHER_CONFIG } from '@/config/homepage.config';

interface WeatherState {
  temp: number | null;
  condition: string;
  icon: string;
  loading: boolean;
  error: boolean;
}

export function useWeather(): WeatherState {
  const [weather, setWeather] = useState<WeatherState>({
    temp: null,
    condition: '—',
    icon: '🌡️',
    loading: true,
    error: false,
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchWeather() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_CONFIG.lat}&longitude=${WEATHER_CONFIG.lon}&current=temperature_2m,weather_code&timezone=Asia/Jakarta`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Weather forecast fetch failed');
        }

        const data = await res.json();
        if (!isMounted) return;

        const temp = Math.round(data.current.temperature_2m);
        const code = data.current.weather_code;

        let condition = '—';
        let icon = '🌡️';

        switch (code) {
          case 0:
            condition = 'Cerah';
            icon = '☀️';
            break;
          case 1:
          case 2:
          case 3:
            condition = 'Berawan';
            icon = '⛅';
            break;
          case 45:
          case 48:
            condition = 'Berkabut';
            icon = '🌫️';
            break;
          case 51:
          case 53:
          case 55:
            condition = 'Gerimis';
            icon = '🌦️';
            break;
          case 61:
          case 63:
          case 65:
            condition = 'Hujan';
            icon = '🌧️';
            break;
          case 80:
          case 81:
          case 82:
            condition = 'Hujan Lebat';
            icon = '⛈️';
            break;
          case 95:
            condition = 'Badai';
            icon = '🌩️';
            break;
          default:
            condition = '—';
            icon = '🌡️';
            break;
        }

        setWeather({
          temp,
          condition,
          icon,
          loading: false,
          error: false,
        });
      } catch (err) {
        if (!isMounted) return;
        setWeather({
          temp: null,
          condition: '—',
          icon: '🌡️',
          loading: false,
          error: true,
        });
      }
    }

    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, []);

  return weather;
}
