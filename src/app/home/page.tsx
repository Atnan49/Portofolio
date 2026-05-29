'use client';

import React from 'react';
import Image from 'next/image';
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

      <div className="homepage-dashboard-grid">
        {/* Left Console: Clock, Greeting & Weather */}
        <aside className="homepage-left-console">
          <div className="homepage-console-card">
            <div className="homepage-brand-logo-wrapper">
              <Image src="/icon.svg" alt="Brand Logo" width={38} height={38} className="homepage-brand-logo" priority />
            </div>
            
            <div className="homepage-greeting-wrapper">
              <span className="homepage-greeting">{greeting}, <em className="homepage-greeting-name">Atnan</em></span>
            </div>
            
            <div className="homepage-time-display" aria-live="polite">
              <div className="homepage-time-main">
                <span>{hours}</span>
                <span className="homepage-time-separator">:</span>
                <span>{minutes}</span>
              </div>
              <div className="homepage-time-sub">
                <span className="homepage-time-seconds-colon">:</span>
                <span className="homepage-time-seconds">{seconds}</span>
              </div>
            </div>

            <div className="homepage-date-badge">{dateString}</div>
            
            {/* Weather Widget */}
            <div className="homepage-weather-widget">
              <div className="homepage-weather-header">
                <span className="homepage-location">Malang, ID</span>
                <span className="homepage-weather-icon" role="img" aria-label={weather.condition}>
                  {weather.icon}
                </span>
              </div>
              <div className="homepage-weather-body">
                <span className="homepage-weather-temp">
                  {weather.loading ? '...' : weather.temp !== null ? `${weather.temp}°C` : '—'}
                </span>
                <span className="homepage-weather-desc">
                  {weather.loading ? 'Memuat...' : weather.condition}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Area: Search & Shortcuts */}
        <main className="homepage-main-content">
          {/* Search Console */}
          <section className="homepage-search-section">
            <SearchBar />
          </section>

          {/* Shortcuts Grid */}
          <section className="homepage-shortcuts-section">
            <ShortcutGrid />
          </section>
        </main>
      </div>
    </div>
  );
}
