'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SEARCH_ENGINES } from '@/config/homepage.config';

export default function SearchBar() {
  const [selectedEngineId, setSelectedEngineId] = useState<string>('google');
  const [query, setQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      <div ref={dropdownRef} className="search-bar-dropdown-container">
        <div
          className="search-bar-dropdown-trigger"
          onClick={() => setIsOpen(!isOpen)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            } else if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
        >
          <span className="search-bar-engine-icon">{selectedEngine.icon}</span>
          <span className="search-bar-selected-name">{selectedEngine.name}</span>
          <span className={`search-bar-select-arrow ${isOpen ? 'open' : ''}`} aria-hidden="true">▼</span>
        </div>

        {isOpen && (
          <div className="search-bar-dropdown-menu" role="listbox">
            {SEARCH_ENGINES.map((engine) => (
              <div
                key={engine.id}
                onClick={() => {
                  setSelectedEngineId(engine.id);
                  setIsOpen(false);
                  inputRef.current?.focus();
                }}
                className={`search-bar-dropdown-item ${engine.id === selectedEngineId ? 'active' : ''}`}
                role="option"
                aria-selected={engine.id === selectedEngineId}
              >
                <span className="search-bar-dropdown-icon">{engine.icon}</span>
                <span className="search-bar-dropdown-label">{engine.name}</span>
                <span className="search-bar-dropdown-prefix">{engine.prefix}</span>
              </div>
            ))}
          </div>
        )}
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
