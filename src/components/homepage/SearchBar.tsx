'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SEARCH_ENGINES } from '@/config/homepage.config';

export default function SearchBar() {
  const [selectedEngineId, setSelectedEngineId] = useState<string>('google');
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Global keydown handler for '/' to focus search input
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      const isInput = activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        activeEl.isContentEditable
      );
      if (isInput) return;

      if (e.key === '/') {
        e.preventDefault(); // Stop default '/' behavior
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Smart Prefix Switching
    for (const engine of SEARCH_ENGINES) {
      const prefixString = `${engine.prefix} `;
      if (value.toLowerCase().startsWith(prefixString.toLowerCase())) {
        setSelectedEngineId(engine.id);
        setQuery(value.substring(prefixString.length));
        return;
      }
    }
    setQuery(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setQuery('');
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    const engine = SEARCH_ENGINES.find((e) => e.id === selectedEngineId) || SEARCH_ENGINES[0];
    const url = `${engine.url}${encodeURIComponent(query.trim())}`;
    window.open(url, '_self'); // Open search URL in same tab
  };

  const selectedEngine = SEARCH_ENGINES.find((e) => e.id === selectedEngineId) || SEARCH_ENGINES[0];

  return (
    <div className="search-bar-container">
      <div className="search-bar-select-wrapper">
        <span className="search-bar-engine-icon">{selectedEngine.icon}</span>
        <select
          value={selectedEngineId}
          onChange={(e) => setSelectedEngineId(e.target.value)}
          className="search-bar-select"
        >
          {SEARCH_ENGINES.map((engine) => (
            <option key={engine.id} value={engine.id}>
              {engine.name} ({engine.prefix})
            </option>
          ))}
        </select>
        <span className="search-bar-select-arrow" aria-hidden="true">▼</span>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={`Cari dengan ${selectedEngine.name}... (ketik "/" untuk fokus)`}
        className="search-bar-input"
        autoFocus
      />

      <button onClick={handleSearch} className="search-bar-button" aria-label="Lakukan pencarian">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </div>
  );
}
