'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { SHORTCUTS, Shortcut } from '@/config/homepage.config';

export default function ShortcutGrid() {
  const generalShortcuts = SHORTCUTS.filter((s) => s.group === 'General');
  const devShortcuts = SHORTCUTS.filter((s) => s.group === 'Dev & Freelance');

  // Parse hostname for Google favicon service
  const getFaviconUrl = (url: string) => {
    try {
      const { hostname } = new URL(url);
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
    } catch {
      return '';
    }
  };

  // Keyboard shortcut Ctrl+1 through Ctrl+8
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      const isInput = activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        activeEl.isContentEditable
      );
      if (isInput) return;

      const isCtrl = e.ctrlKey || e.metaKey;
      if (isCtrl && !e.shiftKey && !e.altKey) {
        const digitMatch = e.key.match(/^[1-8]$/);
        if (digitMatch) {
          const index = parseInt(digitMatch[0], 10) - 1;
          const target = generalShortcuts[index];
          if (target) {
            e.preventDefault();
            window.open(target.url, '_self');
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generalShortcuts]);

  const renderGroup = (shortcuts: Shortcut[], isGeneral = false) => {
    return (
      <div className="shortcuts-grid">
        {shortcuts.map((shortcut, index) => {
          const favicon = getFaviconUrl(shortcut.url);
          return (
            <a
              key={shortcut.label}
              href={shortcut.url}
              className="shortcut-card"
              title={shortcut.label}
            >
              <div className="shortcut-icon-wrapper">
                {favicon ? (
                  <Image
                    src={favicon}
                    alt={`${shortcut.label} icon`}
                    width={32}
                    height={32}
                    unoptimized
                    className="shortcut-icon"
                  />
                ) : (
                  <div className="shortcut-icon-placeholder">🌐</div>
                )}
                {isGeneral && index < 8 && (
                  <span className="shortcut-hotkey-badge">^{index + 1}</span>
                )}
              </div>
              <span className="shortcut-label">{shortcut.label}</span>
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <div className="shortcuts-container">
      <section className="shortcuts-group-section">
        <h2 className="shortcuts-group-title">General</h2>
        {renderGroup(generalShortcuts, true)}
      </section>

      <section className="shortcuts-group-section">
        <h2 className="shortcuts-group-title">Dev & Freelance</h2>
        {renderGroup(devShortcuts, false)}
      </section>
    </div>
  );
}
