'use client';

import React from 'react';
import { useClock } from '@/hooks/useClock';
import { useWeather } from '@/hooks/useWeather';
import SearchBar from '@/components/homepage/SearchBar';
import ShortcutGrid from '@/components/homepage/ShortcutGrid';

export default function HomePage() {
  const { hours, minutes, seconds, dateString, greeting } = useClock();
  const weather = useWeather();

  return (
    <div className="homepage-container">
      {/* Top Nav to Portfolio */}
      <div className="homepage-top-nav">
        <a href="/" className="homepage-back-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Portfolio
        </a>
      </div>

      {/* Top Header: Clock, Greetings, Weather */}
      <header className="homepage-header">
        <div className="homepage-clock-wrapper">
          <span className="homepage-greeting">{greeting}, <em className="homepage-greeting-name">Atnan</em></span>
          <div className="homepage-time" aria-live="polite">
            <span>{hours}</span>
            <span className="homepage-time-separator">:</span>
            <span>{minutes}</span>
            <span className="homepage-time-separator" style={{ fontSize: '0.8em', verticalAlign: 'middle' }}>:</span>
            <span style={{ fontSize: '0.65em', opacity: 0.85, fontWeight: 400, marginLeft: '0.1rem' }}>{seconds}</span>
          </div>
          <span className="homepage-date">{dateString}</span>
        </div>

        {/* Weather Info */}
        <div className="homepage-weather-card">
          <span className="homepage-weather-icon" role="img" aria-label={weather.condition}>
            {weather.icon}
          </span>
          <div className="homepage-weather-info">
            <span className="homepage-weather-temp">
              {weather.loading ? '...' : weather.temp !== null ? `${weather.temp}°C` : '—'}
            </span>
            <span className="homepage-weather-desc">
              {weather.loading ? 'Memuat...' : weather.condition}
            </span>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <main className="homepage-search-section">
        <SearchBar />
      </main>

      {/* Shortcuts Section */}
      <ShortcutGrid />
    </div>
  );
}
